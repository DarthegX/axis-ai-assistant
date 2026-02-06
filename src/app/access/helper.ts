export const confirmDiscogsAuth = async (accessToken: string, verifier: string) => {
    try {
        const discogsOauthResponse = await fetch('/api/discogs/access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oauthAccessToken: accessToken, oauthVerifier: verifier})
        });

        const bodyResponse = await discogsOauthResponse.json();
        console.log(bodyResponse)

        return;
    } catch (err) {
        console.log(err)
    }
}