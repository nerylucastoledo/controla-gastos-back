import { Router } from "express"
import { PeopleController } from "../controllers/PeopleController"

const router = Router()
const peopleController = PeopleController.builder()

router.post("/peoples", (request, response) => {
  return peopleController.create(request, response)
})

router.get("/peoples/:username", (request, response) => {
  return peopleController.listAll(request, response)
})

router.delete("/peoples/:id", (request, response) => {
  return peopleController.delete(request, response)
})

router.put("/peoples", (request, response) => {
  return peopleController.update(request, response)
})

export { router as peopleRoutes };