"use client";

import { useState, useMemo } from "react";
import { Check, Copy } from "lucide-react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Settings,
  User,
  Mail,
  Heart,
  Star,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Loader2,
  Calendar,
  Clock,
  Download,
  Upload,
  Trash2,
  Edit2,
  AlertCircle,
  Info,
  Bell,
  Lock,
  Unlock,
  Home,
  Bookmark,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Icon catalogue                                                     */
/* ------------------------------------------------------------------ */

interface IconEntry {
  name: string;
  component: LucideIcon;
}

const icons: IconEntry[] = [
  { name: "Search", component: Search },
  { name: "Menu", component: Menu },
  { name: "X", component: X },
  { name: "ChevronDown", component: ChevronDown },
  { name: "ChevronUp", component: ChevronUp },
  { name: "ChevronLeft", component: ChevronLeft },
  { name: "ChevronRight", component: ChevronRight },
  { name: "Check", component: Check },
  { name: "Plus", component: Plus },
  { name: "Minus", component: Minus },
  { name: "Copy", component: Copy },
  { name: "Eye", component: Eye },
  { name: "EyeOff", component: EyeOff },
  { name: "Settings", component: Settings },
  { name: "User", component: User },
  { name: "Mail", component: Mail },
  { name: "Heart", component: Heart },
  { name: "Star", component: Star },
  { name: "ArrowRight", component: ArrowRight },
  { name: "ArrowLeft", component: ArrowLeft },
  { name: "ExternalLink", component: ExternalLink },
  { name: "Loader2", component: Loader2 },
  { name: "Calendar", component: Calendar },
  { name: "Clock", component: Clock },
  { name: "Download", component: Download },
  { name: "Upload", component: Upload },
  { name: "Trash2", component: Trash2 },
  { name: "Edit2", component: Edit2 },
  { name: "AlertCircle", component: AlertCircle },
  { name: "Info", component: Info },
  { name: "Bell", component: Bell },
  { name: "Lock", component: Lock },
  { name: "Unlock", component: Unlock },
  { name: "Home", component: Home },
  { name: "Bookmark", component: Bookmark },
  { name: "Filter", component: Filter },
  { name: "Grid", component: Grid },
  { name: "List", component: List },
  { name: "MoreHorizontal", component: MoreHorizontal },
  { name: "MoreVertical", component: MoreVertical },
];

const sizes = [16, 20, 24, 32] as const;

/* ------------------------------------------------------------------ */
/*  Icon card                                                          */
/* ------------------------------------------------------------------ */

function IconCard({
  entry,
  size,
}: {
  entry: IconEntry;
  size: number;
}) {
  const [copied, setCopied] = useState(false);
  const Icon = entry.component;

  function handleCopy() {
    const importCode = `import { ${entry.name} } from "lucide-react"`;
    navigator.clipboard.writeText(importCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col items-center gap-2.5 rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-base)] p-4 transition-all hover:border-[var(--borders-neutral-bolder)] hover:shadow-sm"
      title={`Click to copy import for ${entry.name}`}
    >
      {/* Copied badge */}
      {copied && (
        <span className="absolute -top-2 right-2 flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-medium text-white">
          <Check size={10} />
          Copied
        </span>
      )}

      <div className="flex h-10 w-10 items-center justify-center">
        <Icon size={size} className="text-[var(--text-base-primary)]" />
      </div>
      <span className="text-xs text-[var(--text-base-secondary)] group-hover:text-[var(--text-base-primary)] transition-colors truncate w-full text-center">
        {entry.name}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState<number>(24);

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return icons;
    const q = searchQuery.toLowerCase();
    return icons.filter((icon) => icon.name.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-[24px] font-bold tracking-tight text-[var(--text-base-primary)]">
          Icons
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
          The Chilli design system uses <strong className="text-[var(--text-base-primary)]">Lucide</strong> as
          its icon library. Over 1,400 icons are available -- below are the most commonly used
          ones. Click any icon to copy its import statement.
        </p>
      </header>

      <div className="space-y-8">
        {/* ---- Controls ---- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-base-secondary)]"
            />
            <input
              type="text"
              placeholder="Filter icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[var(--borders-default)] bg-[var(--backgrounds-base)] py-2 pl-9 pr-3 text-sm text-[var(--text-base-primary)] placeholder:text-[var(--text-base-secondary)] outline-none transition-colors focus:border-[var(--borders-neutral-bolder)]"
            />
          </div>

          {/* Size selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--text-base-secondary)]">Size:</span>
            <div className="flex rounded-lg border border-[var(--borders-default)] overflow-hidden">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedSize === s
                      ? "bg-[var(--backgrounds-brand-strong-default)] text-white"
                      : "text-[var(--text-base-secondary)] hover:bg-[var(--backgrounds-neutral-primary-default)]"
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Grid ---- */}
        {filteredIcons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search size={32} className="text-[var(--text-base-secondary)] mb-3" />
            <p className="text-sm text-[var(--text-base-secondary)]">
              No icons match &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {filteredIcons.map((entry) => (
              <IconCard key={entry.name} entry={entry} size={selectedSize} />
            ))}
          </div>
        )}

        {/* ---- Usage guide ---- */}
        <section className="rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] p-6 space-y-4">
          <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
            Usage
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)] mb-1.5">
                Install
              </p>
              <code className="block rounded-lg bg-[var(--backgrounds-base)] border border-[var(--borders-default)] px-4 py-3 text-sm font-mono text-[var(--text-base-primary)]">
                npm install lucide-react
              </code>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)] mb-1.5">
                Import
              </p>
              <code className="block rounded-lg bg-[var(--backgrounds-base)] border border-[var(--borders-default)] px-4 py-3 text-sm font-mono text-[var(--text-base-primary)]">
                {`import { Search, Plus, Settings } from "lucide-react"`}
              </code>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)] mb-1.5">
                Render
              </p>
              <code className="block rounded-lg bg-[var(--backgrounds-base)] border border-[var(--borders-default)] px-4 py-3 text-sm font-mono text-[var(--text-base-primary)]">
                {`<Search size={20} className="text-gray-500" />`}
              </code>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
