import { useMemo } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import { RenderBlock } from "../components/Markdown";
import { parseMarkdown, slugify } from "../utils/markdown";
import whitepaperSource from "../../docs/WHITEPAPER_QORI.md?raw";

export default function Whitepaper() {
  const { cover, body, toc } = useMemo(() => {
    const blocks = parseMarkdown(whitepaperSource);
    const firstHr = blocks.findIndex((b) => b.type === "hr");
    const cover = firstHr === -1 ? [] : blocks.slice(0, firstHr);
    const body = firstHr === -1 ? blocks : blocks.slice(firstHr + 1);
    const toc = body
      .filter((b) => b.type === "heading" && b.level === 1)
      .map((b) => (b.type === "heading" ? b.text : ""));
    return { cover, body, toc };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-yellow-400/20 bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="leading-none">
            <div className="text-xs font-semibold tracking-widest text-yellow-400">
              FC GLOBAL
            </div>
            <div className="text-2xl font-bold text-yellow-400">QORI</div>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-gray-300 transition hover:text-yellow-400">
              ← Inicio
            </Link>
            <a
              href="/whitepaper.md"
              download="whitepaper-qori.md"
              className="rounded-lg border border-yellow-400 px-3 py-1.5 text-white transition hover:bg-yellow-400 hover:text-black"
            >
              Descargar (.md)
            </a>
          </div>
        </div>
      </header>

      <div role="note" className="border-b border-yellow-400/30 bg-yellow-400/10 px-5 py-3">
        <p className="mx-auto max-w-6xl text-sm leading-6 text-yellow-200">
          <strong>Documento en borrador.</strong> No constituye oferta pública, promoción de
          valores ni asesoría financiera. QORI aún no está lanzado y el contrato no ha sido
          desplegado ni auditado externamente.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-8 lg:mb-0">
          <nav
            aria-label="Índice del whitepaper"
            className="lg:sticky lg:top-6"
          >
            <details className="rounded-xl border border-yellow-400/20 bg-zinc-950 p-4" open={typeof window !== "undefined" && window.innerWidth >= 1024}>
              <summary className="cursor-pointer text-sm font-semibold tracking-wide text-yellow-400 lg:cursor-default">
                Contenido
              </summary>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((t) => (
                  <li key={t}>
                    <a
                      href={`#${slugify(t)}`}
                      className="text-gray-300 transition hover:text-yellow-400"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </nav>
        </aside>

        <main className="min-w-0">
          <section className="rounded-2xl border border-yellow-400/20 bg-zinc-950 p-6 sm:p-8">
            {cover.map((b, i) => {
              if (b.type === "heading" && b.level === 1 && i === 0) {
                return (
                  <p key={i} className="text-xs font-semibold tracking-[0.3em] text-yellow-400">
                    {b.text}
                  </p>
                );
              }
              if (b.type === "heading" && b.level === 1) {
                return (
                  <h1 key={i} className="mt-2 text-5xl font-extrabold text-yellow-400 sm:text-6xl">
                    {b.text}
                  </h1>
                );
              }
              if (b.type === "heading" && b.level === 2) {
                return (
                  <h2 key={i} className="mt-2 mb-6 text-xl text-white sm:text-2xl">
                    {b.text}
                  </h2>
                );
              }
              return <RenderBlock key={i} block={b} />;
            })}
          </section>

          <article>
            {body.map((b, i) => (
              <RenderBlock key={i} block={b} />
            ))}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
