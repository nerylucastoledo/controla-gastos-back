import { Router } from "express"
import { UserController } from "../controllers/UserController"

const router = Router()
const userController = UserController.builder()

router.put("/users/:username", (request, response) => {
  return userController.update(request, response)
})

router.delete("/users/:username", (request, response) => {
  return userController.delete(request, response)
})


export { router as userRoutes };