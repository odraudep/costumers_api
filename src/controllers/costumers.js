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
