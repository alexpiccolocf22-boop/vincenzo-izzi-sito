// Netlify esegue questo file a ogni modifica: raccoglie le opere in un unico elenco per il sito.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";

const dir = "content/works";
const works = readdirSync(dir)
  .filter(f => f.endsWith(".json"))
  .map(f => ({ id: f.replace(/\.json$/, ""), ...JSON.parse(readFileSync(`${dir}/${f}`, "utf8")) }));

mkdirSync("data", { recursive: true });
writeFileSync("data/works.json", JSON.stringify(works));
console.log(`Opere pubblicate: ${works.length}`);
