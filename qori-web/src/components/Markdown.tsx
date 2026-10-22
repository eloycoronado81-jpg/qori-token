import type { ReactNode } from "react";

import { slugify, type Block } from "../utils/markdown";

/**
 * Renderizador mínimo de Markdown para el whitepaper.
 * Soporta: títulos (#, ##, ###), párrafos, listas con "-", tablas, líneas "---",
 * **negrita**, *cursiva* y `código`. No interpreta HTML ni enlaces: todo el texto
 * se muestra como texto (React lo escapa), así que no hay riesgo de inyección.
 */

const INLINE = /\*\*(.+?)\*\*|\*([^*\s][^*]*)\*|`([^`]+)`/g;

function Inline({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const m of text.matchAll(INLINE)) {
    const start = m.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-white">
          <Inline text={m[1]} />
        </strong>,
      );
    } else if (m[2] !== undefined) {
      nodes.push(<em key={key++}>{m[2]}</em>);
    } else {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-zinc-800 px-1.5 py-0.5 text-[0.9em] text-yellow-300"
        >
          {m[3]}
        </code>,
      );
    }
    last = start + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "hr":
      return null;

    case "heading": {
      const id = slugify(block.text);
      if (block.level === 1) {
        return (
          <h2
            id={id}
            className="scroll-mt-24 mt-14 mb-4 border-b border-yellow-400/20 pb-3 text-2xl font-bold text-yellow-400 sm:text-3xl"
          >
            <Inline text={block.text} />
          </h2>
        );
      }
      if (block.level === 2) {
        return (
          <h3
            id={id}
            className="scroll-mt-24 mt-8 mb-3 text-xl font-semibold text-white"
          >
            <Inline text={block.text} />
          </h3>
        );
      }
      return (
        <h4 id={id} className="scroll-mt-24 mt-6 mb-2 text-lg font-semibold text-white">
          <Inline text={block.text} />
        </h4>
      );
    }

    case "paragraph":
      return (
        <p className="my-4 leading-8 text-gray-300">
          <Inline text={block.text} />
        </p>
      );

    case "list":
      return (
        <ul className="my-4 space-y-2 pl-5 text-gray-300 marker:text-yellow-400 [list-style:disc]">
          {block.items.map((item, idx) => (
            <li key={idx} className="pl-1 leading-7">
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-yellow-400/20">
          <table className="w-full min-w-[20rem] border-collapse text-left text-sm sm:text-base">
            <thead className="bg-zinc-900 text-yellow-400">
              <tr>
                {block.header.map((h, idx) => (
                  <th
                    key={idx}
                    className={`px-4 py-3 font-semibold ${
                      block.align[idx] === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    <Inline text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-zinc-800 text-gray-300">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`px-4 py-3 align-top ${
                        block.align[c] === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
