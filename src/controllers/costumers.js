import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { nanoid } from "nanoid";

export const getCostumers = async (req, res) => {
  let data = await readFile(resolve(__dirname, "../data.json"), {
    encoding: "utf-8",
  });

  data = JSON.parse(data).costumers;

  res.json({ data });
};

export const addCostumer = async (req, res) => {
  const costumer = req.body;
  const { name, nacionality, gender, age } = costumer;

  if (
    !name ||
    !nacionality ||
    !gender ||
    !age ||
    Object.keys(costumer).length > 4
  )
    return res.status(400).json({
      message: "Invalid values",
    });

  costumer.id = nanoid();

  let data = await readFile(resolve(__dirname, "../data.json"), {
    encoding: "utf-8",
  });

  data = JSON.parse(data);

  data.costumers.push(costumer);

  await writeFile(
    resolve(__dirname, "../data.json"),
    JSON.stringify(data, null, 2)
  );

  res.json({ data: costumer });
};

export const updateCostumer = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  let data = await readFile(resolve(__dirname, "../data.json"), {
    encoding: "utf-8",
  });

  data = JSON.parse(data);

  const costumer = data.costumers.find((cost) => cost.id == id);

  if (!costumer) return res.json({ message: "Costumer not found" });

  let err = 0;

  for (const prop in update) {
    if (!costumer[prop]) err++;
    else costumer[prop] = update[prop];
  }

  if (!Object.keys(update).length) err++;

  if (err > 0) return res.status(400).json({ message: "Invalid values" });

  data.costumers = data.costumers.map((cost) =>
    cost.id == id ? costumer : cost
  );

  await writeFile(
    resolve(__dirname, "../data.json"),
    JSON.stringify(data, null, 2)
  );

  res.json({ data: costumer });
};
