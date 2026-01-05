import { Router } from "express";
import { createOrder, listOrders, listExpiredOrders } from "../controllers/orders.controller.js";

const router = Router();

router.post("/:id", createOrder);

router.get("/expired", listExpiredOrders);

router.get("/:id", listOrders);

export default router;
