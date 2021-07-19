import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    method: req.method,
    message: "Everything worked fine",
  });
});

export default router;
