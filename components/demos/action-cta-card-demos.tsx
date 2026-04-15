"use client";

import { ActionCtaCard, type ActionCtaType } from "@/components/ui/action-cta-card";

/* ----- Send Email ----- */

export function ActionCtaCardEmailDefault() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="send-email" state="default" />
    </div>
  );
}
export function ActionCtaCardEmailPinned() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="send-email" state="pinned" />
    </div>
  );
}
export function ActionCtaCardEmailCompleted() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="send-email" state="completed" count={34} countLabel="emails sent" actionLabel="view emails" />
    </div>
  );
}

/* ----- Instagram ----- */

export function ActionCtaCardInstagramDefault() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="instagram" state="default" />
    </div>
  );
}
export function ActionCtaCardInstagramPinned() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="instagram" state="pinned" />
    </div>
  );
}
export function ActionCtaCardInstagramCompleted() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="instagram" state="completed" count={142} countLabel="comments posted" actionLabel="view comments" />
    </div>
  );
}

/* ----- Google Maps ----- */

export function ActionCtaCardGoogleMapsDefault() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="google-maps" state="default" />
    </div>
  );
}
export function ActionCtaCardGoogleMapsPinned() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="google-maps" state="pinned" />
    </div>
  );
}
export function ActionCtaCardGoogleMapsCompleted() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="google-maps" state="completed" count={142} countLabel="reviews left" actionLabel="view reviews" />
    </div>
  );
}

/* ----- Phone Call ----- */

export function ActionCtaCardPhoneDefault() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="phone-call" state="default" />
    </div>
  );
}
export function ActionCtaCardPhonePinned() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="phone-call" state="pinned" />
    </div>
  );
}
export function ActionCtaCardPhoneCompleted() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="phone-call" state="completed" count={12} countLabel="calls done" actionLabel="view calls" />
    </div>
  );
}

/* ----- Question ----- */

export function ActionCtaCardQuestionDefault() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="question" state="default" />
    </div>
  );
}
export function ActionCtaCardQuestionPinned() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="question" state="pinned" />
    </div>
  );
}
export function ActionCtaCardQuestionCompleted() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="question" state="completed" count={423} countLabel="replies" actionLabel="view replies" />
    </div>
  );
}

/* ----- External Link ----- */

export function ActionCtaCardExternalDefault() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="external-link" state="default" />
    </div>
  );
}
export function ActionCtaCardExternalPinned() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="external-link" state="pinned" />
    </div>
  );
}
export function ActionCtaCardExternalCompleted() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="external-link" state="completed" count={52} countLabel="completed" actionLabel="view actions" />
    </div>
  );
}

/* ----- Action counter ----- */

export function ActionCtaCardActionDefault() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="action" state="default" count={1} actionLabel="view supporters" />
    </div>
  );
}
export function ActionCtaCardActionTopSupporters() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="action" state="top-supporters" count={12} actionLabel="view top supporters" />
    </div>
  );
}
export function ActionCtaCardActionCompleted() {
  return (
    <div className="mx-auto w-full max-w-[343px]">
      <ActionCtaCard type="action" state="completed" count={1} actionLabel="view actions completed" />
    </div>
  );
}

/* ----- Backwards-compatible legacy demos (kept for any stale registry keys) ----- */

export function ActionCtaCardDefault() {
  return <ActionCtaCardEmailDefault />;
}
export function ActionCtaCardInstagram() {
  return <ActionCtaCardInstagramDefault />;
}
export function ActionCtaCardGoogleMaps() {
  return <ActionCtaCardGoogleMapsDefault />;
}
export function ActionCtaCardCompleted() {
  return <ActionCtaCardActionCompleted />;
}

/* ----- "All states" showcase per type (Default / Pinned / Completed) ----- */

function AllStatesRow({ type }: { type: ActionCtaType }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <ActionCtaCard type={type} state="default" />
      <ActionCtaCard type={type} state="pinned" />
      <ActionCtaCard type={type} state="completed" />
    </div>
  );
}

export function ActionCtaCardEmailAll() { return <AllStatesRow type="send-email" />; }
export function ActionCtaCardInstagramAll() { return <AllStatesRow type="instagram" />; }
export function ActionCtaCardGoogleMapsAll() { return <AllStatesRow type="google-maps" />; }
export function ActionCtaCardPhoneAll() { return <AllStatesRow type="phone-call" />; }
export function ActionCtaCardQuestionAll() { return <AllStatesRow type="question" />; }
export function ActionCtaCardExternalAll() { return <AllStatesRow type="external-link" />; }

export function ActionCtaCardActionAll() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <ActionCtaCard type="action" state="default" count={1} />
      <ActionCtaCard type="action" state="top-supporters" count={12} />
      <ActionCtaCard type="action" state="completed" count={1} />
    </div>
  );
}

/* ----- All types grid ----- */

export function ActionCtaCardAllTypes() {
  const types: ActionCtaType[] = [
    "send-email",
    "instagram",
    "google-maps",
    "phone-call",
    "question",
    "external-link",
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {types.map((t) => (
        <ActionCtaCard key={t} type={t} state="default" />
      ))}
    </div>
  );
}
