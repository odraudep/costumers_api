import express from "express";
import { readFile } from "fs/promises";
import { resolve } from "path";

const router = express.Router();

router.get("/", async (req, res) => {
  let data = await readFile(resolve(__dirname, "../data.json"), {
    encoding: "utf-8",
  });

  data = JSON.parse(data).costumers;

  res.json({ data });
});

export default router;
