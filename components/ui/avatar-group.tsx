"use client";

import { forwardRef } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, avatarVariants } from "@/components/ui/avatar";

const sizeConfig = {
  xxsm: {
    overlap: -12,
    borderWidth: "1px",
    actionSize: "size-5",
    actionIcon: 12,
    actionGap: "gap-1",
  },
  xsm: {
    overlap: -14,
    borderWidth: "1px",
    actionSize: "size-6",
    actionIcon: 16,
    actionGap: "gap-1",
  },
  sm: {
    overlap: -18,
    borderWidth: "1.5px",
    actionSize: "size-8",
    actionIcon: 16,
    actionGap: "gap-1",
  },
  md: {
    overlap: -20,
    borderWidth: "2px",
    actionSize: "size-10",
    actionIcon: 20,
    actionGap: "gap-2",
  },
  lg: {
    overlap: -24,
    borderWidth: "2px",
    actionSize: "size-12",
    actionIcon: 20,
    actionGap: "gap-2",
  },
  xl: {
    overlap: -28,
    borderWidth: "2.5px",
    actionSize: "size-16",
    actionIcon: 20,
    actionGap: "gap-2",
  },
  "2xl": {
    overlap: -32,
    borderWidth: "3px",
    actionSize: "size-[84px]",
    actionIcon: 24,
    actionGap: "gap-2",
  },
};

export const AvatarGroup = forwardRef(
  (
    {
      avatars,
      size = "md",
      max,
      spacing,
      showAddButton = false,
      addButtonAriaLabel = "Add avatar",
      onAddClick,
      className,
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const limit = max ?? avatars.length;
    const visible = avatars.slice(0, limit);
    const remaining = avatars.length - limit;
    const overlap = spacing ?? config.overlap;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          showAddButton && config.actionGap,
          className
        )}
        {...props}
      >
        <div className="flex items-center">
          {visible.map((avatar, index) => (
            <div
              key={avatar.src ?? avatar.fallback ?? index}
              className="relative rounded-full"
              style={{
                marginLeft: index === 0 ? 0 : overlap,
                zIndex: visible.length - index + (remaining > 0 ? 1 : 0),
                border: `${config.borderWidth} solid var(--borders-base)`,
                borderRadius: "9999px",
              }}
            >
              <Avatar
                size={size}
                src={avatar.src}
                fallback={avatar.fallback}
                alt={avatar.alt}
              />
            </div>
          ))}

          {remaining > 0 && (
            <div
              className={cn(
                avatarVariants({ size }),
                "bg-[var(--backgrounds-neutral-secondary-default)] font-medium text-[var(--text-base-primary)]"
              )}
              style={{
                marginLeft: overlap,
                zIndex: 0,
                border: `${config.borderWidth} solid var(--borders-base)`,
                borderRadius: "9999px",
              }}
            >
              +{remaining}
            </div>
          )}
        </div>

        {showAddButton && size !== "xxsm" && (
          <button
            type="button"
            aria-label={addButtonAriaLabel}
            onClick={onAddClick}
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full bg-[var(--backgrounds-neutral-secondary-default)] text-[var(--text-base-primary)] transition-colors hover:bg-[var(--backgrounds-neutral-primary-default)]",
              config.actionSize
            )}
          >
            <Plus size={config.actionIcon} />
          </button>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";
