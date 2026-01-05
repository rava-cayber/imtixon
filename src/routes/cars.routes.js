import { Router } from "express";
import { createCar, listCars } from "../controllers/cars.controller.js";

const router = Router();

router.post("/", createCar);

router.get("/", listCars);

router.get("/:id", listCars);

export default router;
