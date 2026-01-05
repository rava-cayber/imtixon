import { Router } from "express";
import { createPayment, listPayments } from "../controllers/payments.controller.js";


const router = Router();

router.post("/", createPayment);

router.get("/", listPayments);

router.get("/:id", listPayments);

export default router;
