import { Router } from "express"

// Import controllers
import AuthController from "../controllers/AuthController"

// initiate express router
const router = Router()

// auth routes
router.post('/oauth/login', AuthController.login)
// router.post('/oauth/register', AuthController.create)
// router.post('/oauth/forgot', AuthController.sendPasswordResetEmail)
// router.put('/oauth/reset', Token.verifyPasswordReset, AuthController.passwordReset)
// router.post('/oauth/verify', Token.verify, (request, response) => response.sendStatus(200))

//  Check out routes

export default router