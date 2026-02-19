import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server.js";

const DISCOGS_OAUTH_BASE_URL = 'https://api.discogs.com/oauth';

export async function GET(request: NextRequest) {
    const timestamp = Date.now();
    const randomString = 'asdfgñlkjhqw2rty';

    try {
        const tokenResponse = await (await fetch(`${DISCOGS_OAUTH_BASE_URL}/request_token`, {
            method: 'GET',
            headers: {
                'Authorization': `OAuth oauth_consumer_key="${process.env.DISCOGS_KEY}",` +
                    `oauth_nonce="${randomString}",` +
                    `oauth_signature="${process.env.DISCOGS_SECRET}&",` +
                    'oauth_signature_method="PLAINTEXT",' +
                    `oauth_timestamp="${timestamp}",` +
                    'oauth_callback="http://127.0.0.1:3000/access"',
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'

            }
        })).text();

        const parsedTokens = new URLSearchParams(tokenResponse);
        const token = parsedTokens.get('oauth_token');
        const oauthTokenSecret = parsedTokens.get('oauth_token_secret');

        (await cookies()).set('discogs_token_secret', oauthTokenSecret ?? '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 6000000000000000000000000000000000000,
            path: '/',
        });

        console.log(oauthTokenSecret)

        const redirectUrl = `https://www.discogs.com/oauth/authorize?oauth_token=${token}`;

        return NextResponse.json({ redirectUrl, status: null, error: null })
    } catch (err) {
        console.log('ERROR on GET /discogs/auth: ' + err)
        return NextResponse.json({ error: 'Cannot get Discogs request token', status: 500, redirectUrl: null })
    }
}