import { Router } from "express";
import { createCustomer, listCustomers } from "../controllers/customers.controller.js";

const router = Router();

router.post("/", createCustomer);
router.post("/:id", createCustomer);

router.get("/", listCustomers);
router.get("/:id", listCustomers);

export default router;
