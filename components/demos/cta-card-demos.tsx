import { CtaCard, type CtaCardActionType } from "@/components/ui/cta-card";

const EMAIL_TITLE =
  "Federal Wildlife Oversight Needed: Idaho Commissioner Charged with Poaching on Federal Land";

const EMAIL_BODY =
  "Dear U.S. Fish & Wildlife Service, I am writing to bring to your attention a serious accountability concern in Idaho wildlife management.";

export function CtaCardDefault() {
  return (
    <div className="flex w-full flex-col gap-4">
      <CtaCard title={EMAIL_TITLE} secondaryLabel="skip" />
    </div>
  );
}

export function CtaCardWithSecondary() {
  return (
    <div className="flex w-full flex-col gap-4">
      <CtaCard
        title={EMAIL_TITLE}
        body={EMAIL_BODY}
        primaryLabel="review email"
        secondaryLabel="skip"
        socialProof="34 people did this"
      />
    </div>
  );
}

export function CtaCardArrow() {
  return (
    <div className="flex w-full flex-col gap-4">
      <CtaCard
        variant="arrow"
        title={EMAIL_TITLE}
        body={EMAIL_BODY}
        primaryLabel="review email"
        socialProof="34 people did this"
      />
    </div>
  );
}

const CTA_CARD_TYPES: CtaCardActionType[] = [
  "email",
  "instagram",
  "linkedin",
  "x",
  "google-maps",
  "external-link",
  "question",
  "phone-call",
  "petition",
];

export function CtaCardAllButtonVariants() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {CTA_CARD_TYPES.map((type) => (
        <CtaCard key={type} type={type} />
      ))}
    </div>
  );
}

export function CtaCardAllArrowVariants() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {CTA_CARD_TYPES.map((type) => (
        <CtaCard key={type} type={type} variant="arrow" />
      ))}
    </div>
  );
}
