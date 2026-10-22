/**
 * Analizador mínimo de Markdown para el whitepaper (sin dependencias).
 * Soporta: títulos (#, ##, ###), párrafos, listas con "-", tablas y líneas "---".
 */

export type Block =
  | { type: "hr" }
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; header: string[]; align: ("left" | "right")[]; rows: string[][] };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

export function parseMarkdown(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const isSpecial = (l: string) =>
    /^\s*$/.test(l) ||
    /^---+\s*$/.test(l) ||
    /^#{1,3}\s/.test(l) ||
    /^-\s/.test(l) ||
    /^\|/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) {
      i++;
    } else if (/^---+\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
    } else if (/^#{1,3}\s/.test(line)) {
      const m = line.match(/^(#{1,3})\s+(.*)$/)!;
      blocks.push({
        type: "heading",
        level: m[1].length as 1 | 2 | 3,
        text: m[2].trim(),
      });
      i++;
    } else if (/^\|/.test(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      const header = splitRow(tableLines[0]);
      const sep = tableLines[1] ? splitRow(tableLines[1]) : [];
      const align = header.map((_, idx) =>
        /:\s*$/.test(sep[idx] ?? "") ? ("right" as const) : ("left" as const),
      );
      const rows = tableLines.slice(2).map(splitRow);
      blocks.push({ type: "table", header, align, rows });
    } else if (/^-\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s/.test(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "list", items });
    } else {
      const parts: string[] = [];
      while (i < lines.length && !isSpecial(lines[i])) {
        parts.push(lines[i].trim());
        i++;
      }
      blocks.push({ type: "paragraph", text: parts.join(" ") });
    }
  }

  return blocks;
}
