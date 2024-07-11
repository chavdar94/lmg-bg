import fs from "fs/promises";
import path from "path";
import xml2js from "xml2js";

export async function parseXmlFile() {
  try {
    // Resolve the path to your XML file
    const xmlFilePath = path.resolve(process.cwd(), "src/data/products.xml");

    // Read XML file asynchronously
    const xml = await fs.readFile(xmlFilePath, "utf-8");

    // Parse XML to JSON using xml2js
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
      } else {
        console.log("JSON result:", JSON.stringify(result, null, 2));
        // Optionally, return the parsed JSON or use it as needed
        const products = result.data.productlist.product;
        console.log("Products:", products);
      }
    });
  } catch (error) {
    console.error("Error reading XML file:", error);
  }
}
