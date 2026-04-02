"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { createHighlighter } from "shiki";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = false
}) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState("");
  useEffect(() => {
    let cancelled = false;
    async function highlight() {
      try {
        const highlighter = await createHighlighter({
          themes: ["one-dark-pro"],
          langs: [language]
        });
        if (cancelled) return;
        const html = highlighter.codeToHtml(code.trim(), {
          lang: language,
          theme: "one-dark-pro"
        });
        setHighlighted(html);
      } catch {
        // Fallback: render plain text
        setHighlighted("");
      }
    }
    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, language]);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);
  return <div className="group relative overflow-hidden rounded-lg border border-border">{<button onClick={handleCopy} className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-secondary opacity-0 transition-all hover:text-text-primary group-hover:opacity-100" aria-label="Copy code">{copied ? <Check size={13} /> : <Copy size={13} />}</button>}{<div className="overflow-x-auto">{highlighted ? <div className={cn("shiki-wrapper text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:m-0 [&_code]:font-mono", showLineNumbers && "[&_.line]:before:content-[counter(line)] [&_.line]:before:counter-increment-[line] [&_.line]:before:mr-6 [&_.line]:before:text-text-secondary/40 [&_.line]:before:text-right [&_.line]:before:inline-block [&_.line]:before:w-4 [&_code]:counter-reset-[line]")} dangerouslySetInnerHTML={{
        __html: highlighted
      }} /> : <pre className="p-4 text-[13px] leading-relaxed">{<code className="font-mono text-text-primary">{code.trim()}</code>}</pre>}</div>}</div>;
}