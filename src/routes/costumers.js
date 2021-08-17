import express from "express";

import {
  getCostumers,
  addCostumer,
  updateCostumer,
  deleteCostumer,
} from "../controllers/costumers";

const router = express.Router();

router.route("/").get(getCostumers).post(addCostumer);
router.route("/:id").put(updateCostumer).delete(deleteCostumer);

export default router;
