import { NextRequest, NextResponse } from "next/server";
const crypto = require('crypto')

const generateRandomString = (length: number) => {
    return crypto
        .randomBytes(60)
        .toString('hex')
        .slice(0, length);
}

export async function POST(request: NextRequest) {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email playlist-read-private';

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: 'Hackelarre',
        scope: scope,
        redirect_uri: 'http://127.0.0.1:3000',
        state: state
    });

    fetch('https://accounts.spotify.com/authorize?' + params.toString())
        .then((args) => { console.log(args) })
        .catch((err) => console.log('ERROR: ' + err))
        .finally(() => { console.log('final') });
    //console.log(response.text())

    return NextResponse.json({ text: "Continue" });
}