import axios from 'axios'

async function getSpotifyToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
    });
    const data = await response.json();
    return data.access_token;
}

const $spotify = axios.create({
    withCredentials: true,
    headers: {
        'Authorization': `Bearer `,
    }
})

$spotify.interceptors.request.use(
    async (config) => {
        // console.log($spotify.defaults.headers['Authorization'])
        try {
            await axios.get('https://api.spotify.com/v1/artists/7dGJo4pcD2V6oG8kP0tJRR', {
                headers: {"Authorization": $spotify.defaults.headers['Authorization']}
            })
        } catch {
            // console.log(await getSpotifyToken())
            config.headers.Authorization = `Bearer ${await getSpotifyToken()}`;
        }
        return config;
    }
);

export default $spotify