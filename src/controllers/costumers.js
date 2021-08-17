import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { nanoid } from "nanoid";

const readData = async () => {
  const data = await readFile(resolve(__dirname, "../data.json"), {
    encoding: "utf-8",
  });

  return JSON.parse(data);
};

const writeData = async (data) => {
  await writeFile(resolve(__dirname, "../data.json"), JSON.stringify(data, null, 2));
};

export const getCostumers = async (req, res) => {
  const { costumers } = await readData();

  res.json({ data: costumers });
};

export const addCostumer = async (req, res) => {
  const costumer = req.body;
  const { name, nacionality, gender, age } = costumer;

  if (!name || !nacionality || !gender || !age || Object.keys(costumer).length > 4)
    return res.status(400).json({
      message: "Invalid values",
    });

  costumer.id = nanoid();

  const data = await readData();

  data.costumers.push(costumer);

  await writeData(data);

  res.json({ data: costumer });
};

export const updateCostumer = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const data = await readData();

  const costumer = data.costumers.find((cost) => cost.id == id);

  if (!costumer) return res.json({ message: "Costumer not found" });

  let err = 0;

  for (const prop in update) {
    if (!costumer[prop]) err++;
    else costumer[prop] = update[prop];
  }

  if (!Object.keys(update).length) err++;

  if (err > 0) return res.status(400).json({ message: "Invalid values" });

  data.costumers = data.costumers.map((cost) => (cost.id == id ? costumer : cost));

  await writeData(data);

  res.json({ data: costumer });
};

export const deleteCostumer = async (req, res) => {
  const { id } = req.params;
  const data = await readData();

  if (data.costumers.findIndex((costumer) => costumer.id == id) < 0)
    return res.json({ message: "Costumer not found" });

  data.costumers = data.costumers.filter((costumer) => costumer.id != id);

  await writeData(data);

  res.json({
    data: data.costumers,
  });
};
