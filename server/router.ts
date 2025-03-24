import SpotifyController from "@s/router/controllers/spotify-controller"
import testController from "@s/router/controllers/test-controller"
import SpotifyMiddlewares from "@s/router/middlewares/spotify-middlewares"
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
router.put('/updateTrack/:playlist/:track', SpotifyController.updateTrack)
router.get('/test', testController.test)
router.get('/second', testController.second)
// router.get('/getVkData/:params', vkController.getVkData)
// router.get('/getSpotifyTracks', SpotifyMiddlewares.setUserAccessTokenMiddleware, SpotifyController.getSpotifyTracks)

export default router