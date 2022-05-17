import { Router } from "express"

// Import controllers
import AuthController from "../controllers/AuthController"
import TodoController from "../controllers/TodoController"
import Token from "../middleware/Token"

// initiate express router
const router = Router()

// auth routes
router.post('/oauth/login', AuthController.login)
router.post('/oauth/register', AuthController.create)
router.post('/oauth/forgot', AuthController.sendPasswordResetEmail)
router.put('/oauth/reset', Token.verifyPasswordReset, AuthController.passwordReset)
router.post('/oauth/verify', Token.verify, (request, response) => response.sendStatus(200))

//  todo routes
router.get("/todos", Token.verify, TodoController.index)
router.post("/todos", Token.verify, TodoController.create)

router.put("/todos/:id", Token.verify, TodoController.update)
router.put("/todos/done/:id", Token.verify, TodoController.done)
router.put("/todos/list/:id", Token.verify, TodoController.addListItem)

router.delete("/todos/list/:id", Token.verify, TodoController.removeListItem)
router.delete("/todos/:id", Token.verify, TodoController.destroy)

export default router