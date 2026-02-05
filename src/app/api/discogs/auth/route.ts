import { NextRequest, NextResponse } from "next/server.js";

export async function GET(request: NextRequest) {
    const timestamp = Date.now();

    try {
        const tokenResponse = await (await fetch('https://api.discogs.com/oauth/request_token', {
            headers: {
                'Authorization': 'OAuth oauth_consumer_key="PJxMLhRVRTLtpBxqWkiU",' +
                    'oauth_nonce="hewqu999996g6g6g6h",' +
                    'oauth_signature="rcPpgmOGubUCDFWHWZFmIkYuSnfZOTTh&",' +
                    'oauth_signature_method="PLAINTEXT",' +
                    `oauth_timestamp="${timestamp}",` +
                    'oauth_callback=""',
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
            }
        })).text();

        const parsedTokens = new URLSearchParams(tokenResponse);
        const oauthToken = parsedTokens.get('oauth_token')
        const oauthTokenSecret = parsedTokens.get('oauth_token_secret')

    } catch (err) {
        console.log('ESTOY EN EL CATCH:  ???? ' + err)
    }


    return NextResponse.json({ token: '' })
}