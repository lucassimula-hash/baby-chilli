"use client";

import { useState, useCallback } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export function InstallBlock({ command }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <div className="overflow-hidden rounded-[16px] border border-[var(--borders-default)] bg-[var(--backgrounds-base)]">
      <div className="group flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3 overflow-x-auto">
          <Terminal
            size={14}
            className="shrink-0 text-[var(--text-base-secondary)]"
          />
          <code className="whitespace-nowrap font-mono text-[13px] text-[var(--text-base-primary)]">
            {command}
          </code>
        </div>

        <button
          onClick={handleCopy}
          className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--borders-default)] bg-[var(--backgrounds-base)] text-[var(--text-base-secondary)] opacity-0 transition-all hover:text-[var(--text-base-primary)] group-hover:opacity-100"
          aria-label="Copy command"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
    </div>
  );
}
