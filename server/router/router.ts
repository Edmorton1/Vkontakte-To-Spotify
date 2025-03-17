import SpotifyController from "@s/router/controllers/spotify-controller"
import SpotifyMiddlewares from "@s/router/spotify-middlewares"
import express from "express"
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

// router.get('/getSpotifyToken', spotifyController.getSpotifyToken)
// router.get('/getSpotifyData/:params', SpotifyController.getSpotifyData)
router.get('/callback', SpotifyController.getCallback)
router.get('/checkRefreshToken', SpotifyMiddlewares.checkRefreshToken)
router.get('/createAllPlaylists', SpotifyMiddlewares.setUserAccessTokenMiddleware, SpotifyController.createAllPlaylists)
router.post('/take', SpotifyMiddlewares.setUserAccessTokenMiddleware, upload.any(), SpotifyController.take)
router.get('/test', SpotifyController.test)
// router.get('/getVkData/:params', vkController.getVkData)
// router.get('/getSpotifyTracks', SpotifyMiddlewares.setUserAccessTokenMiddleware, SpotifyController.getSpotifyTracks)

export default router