import express from "express";

import {
  getCostumers,
  addCostumer,
  updateCostumer,
} from "../controllers/costumers";

const router = express.Router();

router.route("/").get(getCostumers).post(addCostumer);
router.route("/:id").put(updateCostumer);

export default router;
