import Papa from "papaparse";
import { readdir, readFile, writeFile } from "node:fs/promises";

try {
  const dataUrl = new URL("../data", import.meta.url);
  const files = await readdir(dataUrl);

  // Filter for CSV files only
  const csvFiles = files.filter((file) => file.endsWith(".csv"));

  // Store parsed data from each CSV file, keyed by filename
  const merged: Record<string, Array<Record<string, string>>> = {};

  for (const file of csvFiles) {
    const fileUrl = new URL(`../data/${file}`, import.meta.url);
    const fileContent = await readFile(fileUrl, "utf-8");

    const parsed = Papa.parse<Record<string, string>>(fileContent, {
      header: true,
      skipEmptyLines: true,
      // Transform headers to camelCase (e.g., "Company Name" -> "companyName")
      transformHeader: (header) => {
        return header
          .trim()
          .replace(/[\s_-]+(.)/g, (_, char) => char.toUpperCase())
          .replace(/^./, (char) => char.toLowerCase());
      },
    });

    // Use filename (without extension) as the key, converted to lowercase
    const fieldName = file.replace(/\.csv$/, "").toLowerCase();

    merged[fieldName] = parsed.data;
  }

  const saveUrl = new URL("../src/generated/linkedin-data.ts", import.meta.url);

  const content = `// Auto-generated from CSV files in /data
export const linkedInData = ${JSON.stringify(merged, null, 2)} as const;
`;

  await writeFile(saveUrl, content);

  console.log("✅ Successfully generated LinkedIn data");
} catch (err) {
  console.error("❌ Unable to generate LinkedIn data", err);
}
