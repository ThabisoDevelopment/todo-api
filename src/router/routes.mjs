import { Router } from "express"

// Import controllers
import AuthController from "../controllers/AuthController.mjs"
import TodoController from "../controllers/TodoController.mjs"
import Token from "../middleware/Token.mjs"

// initiate express router
const router = Router()

// auth routes
router.post('/oauth/login', AuthController.login)
router.post('/oauth/register', AuthController.create)
router.post('/oauth/forgot', AuthController.sendPasswordResetEmail)
// email reset and email verify
router.put('/oauth/reset', Token.verifyPasswordReset, AuthController.passwordReset)
router.put('/oauth/verify/email', Token.verifyEmailToken, AuthController.verifyEmail)
// update $$ verify user authentication
router.put('/oauth/update', Token.verify, AuthController.update)
router.post('/oauth/verify', Token.verify, (request, response) => response.sendStatus(200))

//  todo routes
router.get("/todos", Token.verify, TodoController.index)
router.get("/todos/:id", Token.verify, TodoController.findById)
router.post("/todos", Token.verify, TodoController.create)

router.put("/todos/:id", Token.verify, TodoController.update)
router.put("/todos/done/:id", Token.verify, TodoController.done)
router.put("/todos/list/:id", Token.verify, TodoController.addListItem) /** not in use */
router.delete("/todos/list/:id", Token.verify, TodoController.removeListItem) /** not in use */
router.delete("/todos/:id", Token.verify, TodoController.destroy)

export default router