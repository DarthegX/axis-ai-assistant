export const getDiscogsAuthHeader = (token: string, secret: string) => {
    return [
        `OAuth oauth_consumer_key="${process.env.DISCOGS_KEY}"`,
        `oauth_nonce="${Date.now()}"`,
        `oauth_token="${token}"`,
        `oauth_signature="${process.env.DISCOGS_SECRET}&${secret}"`,
        `oauth_signature_method="PLAINTEXT"`,
        `oauth_timestamp="${Math.floor(Date.now() / 1000)}"`
    ].join(', ');
};

