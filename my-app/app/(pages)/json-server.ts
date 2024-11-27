/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Product } from "../models/productsModel";

type Language = {
  id: string;
  lang: string;
};

type SelectedLanguage = {
  id: string;
  selectedLanguage: string;
};

type Data = {
  language: Language[];
  selected: SelectedLanguage[];
  addtocart: Product[];
  products: Product[];
};

const filePath = path.resolve("./app/mockData/db.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  try {
    const jsonData: Data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    switch (req.method) {
      case "GET": {
        res.status(200).json(jsonData);
        break;
      }

      case "POST": {
        const { section, data } = req.body;

        // Explicitly check if the section is a valid key of Data
        if (!section || !data || !(section in jsonData)) {
          res
            .status(400)
            .json({ error: "Invalid request body or section not found" });
          return;
        }

        // Use keyof Data to ensure type safety
        const sectionKey = section as keyof Data;

        if (!Array.isArray(jsonData[sectionKey])) {
          res.status(400).json({ error: "Section is not an array" });
          return;
        }

        (jsonData[sectionKey] as any[]).push(data);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        res.status(201).json(data);
        break;
      }

      case "DELETE": {
        const { section, id } = req.query;

        // Ensure section and id are strings
        if (!section || !id || Array.isArray(section) || Array.isArray(id)) {
          res.status(400).json({ error: "Invalid section or ID" });
          return;
        }

        // Check if section exists in the data
        if (!(section in jsonData)) {
          res.status(400).json({ error: "Section not found in database" });
          return;
        }

        const sectionKey = section as keyof Data;

        if (!Array.isArray(jsonData[sectionKey])) {
          res.status(400).json({ error: "Section is not an array" });
          return;
        }

        const sectionData = jsonData[sectionKey] as any[];
        const itemIndex = sectionData.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          res.status(404).json({ error: "Item not found" });
          return;
        }

        const [removedItem] = sectionData.splice(itemIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        res.status(200).json(removedItem);
        break;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
