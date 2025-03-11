import { Router } from "express"
import { AuthController } from "../controllers/AuthController"

const router = Router()
const authController = AuthController.builder()

router.post("/register", (request, response) => {
  return authController.authRegister(request, response)
})

router.post("/login", (request, response) => {
  return authController.authLogin(request, response)
})

router.post("/logout", (request, response) => {
  return authController.authLogout(request, response)
})

router.get("/token", (request, response) => {
  return authController.authToken(request, response)
})

export { router as authRoutes };