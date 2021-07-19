import express from "express";

import costumers from "./routes/costumers";

const app = express();

const PORT = 5000;

app.use("/api/v1/costumers", costumers);

app.all("*", (req, res) => {
  res.status(404).json({
    message: `Cannot ${req.method} ${req.url}`,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
