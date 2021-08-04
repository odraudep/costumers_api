import express from "express";

import {
  getCostumers,
  addCostumer,
  updateCostumer,
} from "../controllers/costumers";

const router = express.Router();

router.get("/", getCostumers);
router.post("/", addCostumer);
router.put("/:id", updateCostumer);

export default router;
