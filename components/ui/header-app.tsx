"use client";

import type { ReactNode } from "react";
import { Bell, ChevronLeft, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeaderAppType = "home" | "notification" | "search" | "profile";

export type HeaderAppProps = {
  type?: HeaderAppType;

  /** Home: logo slot (32×32). */
  logo?: ReactNode;
  /** Home: show the brand-colored dot on the bell icon. Default true. */
  hasNotificationDot?: boolean;
  /** Home: avatar image src. */
  avatarSrc?: string;
  onBellClick?: () => void;
  onSearchIconClick?: () => void;
  onAvatarClick?: () => void;

  /** notification / profile / search: back handler. */
  onBack?: () => void;
  /** notification / profile: hide back button. Default true. */
  showBack?: boolean;

  /** notification / profile: centered title. */
  title?: string;

  /** profile: show the trailing settings icon button. Default true. */
  showSettings?: boolean;
  onSettingsClick?: () => void;

  /** search: placeholder. Default "search". */
  searchPlaceholder?: string;
  /** search: called when the search row is tapped. */
  onSearchClick?: () => void;

  className?: string;
};

const ICON_BTN =
  "size-10 shrink-0 inline-flex items-center justify-center rounded-full text-[var(--text-base-primary)] transition-colors hover:bg-[var(--backgrounds-neutral-primary-default)]";

export function HeaderApp({
  type = "home",
  logo,
  hasNotificationDot = true,
  avatarSrc,
  onBellClick,
  onSearchIconClick,
  onAvatarClick,
  onBack,
  showBack = true,
  title,
  showSettings,
  onSettingsClick,
  searchPlaceholder = "search",
  onSearchClick,
  className,
}: HeaderAppProps) {
  if (type === "home") {
    return (
      <header
        className={cn(
          "w-[375px] py-2 pl-4 pr-3 flex items-center justify-between",
          className
        )}
      >
        <div className="size-8 shrink-0">{logo ?? null}</div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button type="button" aria-label="Notifications" onClick={onBellClick} className={ICON_BTN}>
              <Bell size={20} />
            </button>
            {hasNotificationDot && (
              <span
                aria-hidden
                className="pointer-events-none absolute size-2 rounded-full border border-[var(--borders-default)] bg-[var(--backgrounds-brand-strong-default)]"
                style={{ top: 8, left: 21 }}
              />
            )}
          </div>
          <button type="button" aria-label="Search" onClick={onSearchIconClick} className={ICON_BTN}>
            <Search size={20} />
          </button>
          {avatarSrc ? (
            <button
              type="button"
              aria-label="Profile"
              onClick={onAvatarClick}
              className="size-10 shrink-0 overflow-hidden rounded-full border-[0.5px] border-[var(--borders-default)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarSrc} alt="" className="size-10 object-cover" />
            </button>
          ) : null}
        </div>
      </header>
    );
  }

  if (type === "search") {
    return (
      <header className={cn("w-[375px] py-2 px-4 flex items-center", className)}>
        <button
          type="button"
          aria-label={searchPlaceholder}
          onClick={onSearchClick}
          className="flex flex-1 items-center gap-2 rounded-2xl border border-[var(--borders-brand)] bg-[var(--backgrounds-neutral-primary-default)] py-2 pl-2 pr-3 text-left shadow-[0_0_0_2px_var(--shadow-brand-moderate)]"
        >
          <ChevronLeft size={20} className="shrink-0 text-[var(--text-base-primary)]" />
          <span className="text-base text-[var(--text-base-secondary)]">{searchPlaceholder}</span>
        </button>
      </header>
    );
  }

  // notification or profile
  const isProfile = type === "profile";
  const shouldShowSettings = showSettings ?? isProfile;

  return (
    <header
      className={cn(
        "w-[375px] py-2 pl-4 pr-3 flex items-center justify-between",
        className
      )}
    >
      {showBack ? (
        <button type="button" aria-label="Go back" onClick={onBack} className={ICON_BTN}>
          <ChevronLeft size={20} />
        </button>
      ) : (
        <div className="size-10 shrink-0" />
      )}
      <p className="flex-1 text-center text-base font-semibold leading-5 text-[var(--text-base-primary)] truncate">
        {title}
      </p>
      {shouldShowSettings ? (
        <button type="button" aria-label="Settings" onClick={onSettingsClick} className={ICON_BTN}>
          <Settings size={20} />
        </button>
      ) : (
        <div className="size-10 shrink-0" />
      )}
    </header>
  );
}
