import express from "express";

import { getCostumers } from "../controllers/costumers";

const router = express.Router();

router.get("/", getCostumers);

export default router;
