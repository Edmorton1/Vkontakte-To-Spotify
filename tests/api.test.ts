const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

test('Проверка api эндпойнтов', async () => {
  const arr = ['/checkRefreshToken', '/createPlaylist', '/getSpotifyTracks']
  const token = `spotify_refresh_token=${process.env.MY_REFRESH_TOKEN}`
  async function api() {
    for (let param of arr) {
      try {
        console.log(param)
        await axios.get(`${process.env.URL_SERVER}${param}`, {
          withCredentials: true,
          headers: {
            Cookie: token
          },
        })
      } catch(err) {
        console.log(`Ошибка на ${param}`)
        throw new Error(err)
      }
      // await new Promise(res => setTimeout(res, 500))
        // return res
    }
    return 'res'
}

expect(await api()).toBeTruthy()
})