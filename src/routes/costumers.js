import express from "express";

import { getCostumers, addCostumer } from "../controllers/costumers";

const router = express.Router();

router.get("/", getCostumers);
router.post("/", addCostumer);

export default router;
