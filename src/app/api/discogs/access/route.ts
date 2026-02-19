import { cookies } from 'next/headers';
import { getDiscogsAuthHeader } from '../utils';

export async function POST(request: Request) {
    const body = await request.json();
    const { oauthVerifier, oauthAccessToken } = body;

    const cookieStore = await cookies();
    const savedSecret = cookieStore.get('discogs_request_secret')?.value;

    if (!savedSecret) {
        return Response.json({ error: "Session expired" }, { status: 400 });
    }

    if (!oauthVerifier) {
        return Response.json({ error: "Verifier not found" }, { status: 400 });
    }

    const signature = `${encodeURIComponent(process.env.DISCOGS_SECRET ?? '')}&${encodeURIComponent(savedSecret)}`;
    const authHeaders = [
        `OAuth oauth_consumer_key="${process.env.DISCOGS_KEY}"`,
        `oauth_nonce="${Date.now()}"`,
        `oauth_token="${oauthAccessToken}"`,
        `oauth_signature="${process.env.DISCOGS_SECRET}&"`,
        `oauth_signature_method="PLAINTEXT"`,
        `oauth_timestamp="${Math.floor(Date.now() / 1000)}"`,
        `oauth_verifier="${oauthVerifier}"`
      ].join(', ');

    const response = await fetch('https://api.discogs.com/oauth/access_token', {
        method: 'POST',
        headers: {
            'Authorization': authHeaders,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
        }
    });

    const text = await response.text();
    const finalParams = new URLSearchParams(text);

    // TODO: Guardar tokens de discogs del usuario en BD.
    const accessToken = finalParams.get('oauth_token');
    const accessTokenSecret = finalParams.get('oauth_token_secret');

    if (accessToken && accessTokenSecret) {
        (await cookies()).set('final_discogs_token', accessToken, { httpOnly: true, path: '/' });
        (await cookies()).set('final_discogs_secret', accessTokenSecret, { httpOnly: true, path: '/' });

        const authHeader = [
            `OAuth oauth_consumer_key="${process.env.DISCOGS_KEY}"`,
            `oauth_nonce="${Date.now()}"`,
            `oauth_token="${accessToken}"`, 
            `oauth_signature="${process.env.DISCOGS_SECRET}&${accessTokenSecret}"`, // Firma combinada
            `oauth_signature_method="PLAINTEXT"`,
            `oauth_timestamp="${Math.floor(Date.now() / 1000)}"`
          ].join(', ');

        const response = await fetch('https://api.discogs.com/oauth/identity?', {
            headers: {
                'Authorization': authHeader,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
            }
        });

        const data = await response.json();

        // Delete temporary request secret
        (await cookies()).delete('discogs_request_secret');

        return Response.redirect(new URL('/', request.url));
    }

    // Delete temporary request secret
    cookieStore.delete('discogs_request_secret');
    return Response.json({ error: "Error final en el intercambio" });
}