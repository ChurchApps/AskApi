import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_SOURCE = path.resolve(__dirname, "../../ChurchAppsSupport/docs/b1-admin");
const DOCS_OUTPUT = path.resolve(__dirname, "../config/docs/b1-admin-docs.md");

function stripFrontMatter(content: string): string {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return match ? content.slice(match[0].length) : content;
}

function stripHtmlTags(content: string): string {
  return content
    .replace(/<div[^>]*>|<\/div>/g, "")
    .replace(/<video[\s\S]*?<\/video>/g, "[Video]")
    .replace(/<h4>([^<]*)<\/h4>/g, "#### $1")
    .replace(/<[^>]+>/g, "");
}

function collectFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

const files = collectFiles(DOCS_SOURCE);
let output = "";
for (const file of files.sort()) {
  const rel = path.relative(DOCS_SOURCE, file).replace(/\\/g, "/");
  let content = fs.readFileSync(file, "utf8");
  content = stripFrontMatter(content);
  content = stripHtmlTags(content);
  output += `\n## ${rel}\n\n${content.trim()}\n\n---\n`;
}

const outputDir = path.dirname(DOCS_OUTPUT);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(DOCS_OUTPUT, output.trim(), "utf8");
console.log(`Built docs: ${files.length} files -> ${DOCS_OUTPUT}`);
