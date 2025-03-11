import { Router } from 'express';
import { BillController } from '../controllers/BillController';

const router = Router()
const billController = BillController.builder()

router.get("/expenses/year/:username/:year", (request, response) => {
  return billController.findByusernameAndYear(request, response)
})

router.get("/expenses/:username/:date", (request, response) => {
  return billController.findDatabyUsernameAndDate(request, response)
})

router.get("/expenses/:username/:date/:card", (request, response) => {
  return billController.findDataByUsernameDateAndCard(request, response)
})

router.post("/expenses", (request, response) => {
  return billController.create(request, response)
})

router.put("/expenses", (request, response) => {
  return billController.update(request, response)
})

router.delete("/expenses/:id", (request, response) => {
  return billController.delete(request, response)
})

export { router as billRoutes };