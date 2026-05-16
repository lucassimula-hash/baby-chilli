"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { components } from "@/lib/registry";
import { AnimatedTitle } from "@/components/ui/animated-title";
import { cn } from "@/lib/utils";

const navItems = [
  { slug: "showcase" },
  ...components.map((component) => ({ slug: component.slug })),
  { slug: "colors" },
  { slug: "typography" },
  { slug: "spacing" },
  { slug: "icons" },
  { slug: "flags" },
  { slug: "logos" },
];

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  currentSlug: string;
  className?: string;
};

export function PageHeader({
  title,
  subtitle,
  currentSlug,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  const { prevSlug, nextSlug } = useMemo(() => {
    const currentIndex = navItems.findIndex((item) => item.slug === currentSlug);
    return {
      prevSlug: currentIndex > 0 ? navItems[currentIndex - 1]?.slug ?? null : null,
      nextSlug:
        currentIndex >= 0 && currentIndex < navItems.length - 1
          ? navItems[currentIndex + 1]?.slug ?? null
          : null,
    };
  }, [currentSlug]);

  return (
    <header
      className={cn(
        "flex items-start justify-between gap-6",
        className
      )}
    >
      <div className="max-w-[640px]">
        <AnimatedTitle as="h1" className="text-[24px] font-bold tracking-tight text-[var(--text-base-primary)]">
          {title}
        </AnimatedTitle>
        {subtitle ? (
          <p className="mt-2 max-w-[570px] text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-1 hidden items-center gap-2 md:flex">
        <motion.button
          type="button"
          aria-label="Previous page"
          onClick={() => {
            if (prevSlug) router.push(`/docs/${prevSlug}`);
          }}
          disabled={!prevSlug}
          whileHover={prevSlug ? { scale: 1.02 } : undefined}
          whileTap={prevSlug ? { scale: 0.98 } : undefined}
          className="flex size-8 items-center justify-center rounded-full bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] transition-colors hover:bg-[var(--btn-secondary-bg-hover)] disabled:cursor-not-allowed disabled:bg-[var(--btn-disabled-bg)] disabled:text-[var(--btn-disabled-text)]"
        >
          <ArrowLeft size={16} />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Next page"
          onClick={() => {
            if (nextSlug) router.push(`/docs/${nextSlug}`);
          }}
          disabled={!nextSlug}
          whileHover={nextSlug ? { scale: 1.02 } : undefined}
          whileTap={nextSlug ? { scale: 0.98 } : undefined}
          className="flex size-8 items-center justify-center rounded-full bg-transparent text-[var(--text-base-secondary)] transition-colors hover:bg-[var(--backgrounds-neutral-secondary-default)] disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[var(--btn-disabled-text)]"
        >
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </header>
  );
}
