import SpotifyController from "@s/router/controllers/spotify-controller"
import SpotifyMiddlewares from "@s/router/middlewares/spotify-middlewares"
import express from "express"
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

router.get('/callback', SpotifyController.getCallback)
router.get('/checkRefreshToken', SpotifyMiddlewares.checkRefreshToken)
router.post('/createAllPlaylists', SpotifyMiddlewares.setUserAccessTokenMiddleware, SpotifyController.createAllPlaylists)
router.delete('/removePlaylist/:id', SpotifyMiddlewares.setUserAccessTokenMiddleware, SpotifyController.removePlaylist)
router.post('/take', SpotifyMiddlewares.setUserAccessTokenMiddleware, upload.any(), SpotifyController.take)
router.put('/updateTrack/:playlist/:track', SpotifyController.updateTrack)

export default router