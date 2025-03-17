import { Router } from "express"
import { CardController } from "../controllers/CardController"

const router = Router()
const cardController = CardController.builder()

router.post("/cards", (request, response) => {
  return cardController.create(request, response)
})

router.get("/cards/:username", (request, response) => {
  return cardController.listAll(request, response)
})

router.delete("/cards/:id", (request, response) => {
  return cardController.delete(request, response)
})

router.put("/cards", (request, response) => {
  return cardController.update(request, response)
})

export { router as cardRoutes };