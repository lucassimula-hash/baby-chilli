"use client";

import { forwardRef, useId, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { ArrowRight, ChevronRight, PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";

type LooseComponent = (props: Record<string, unknown>) => ReactNode;

const CtaButton = Button as unknown as LooseComponent;
const CtaChip = Chip as unknown as LooseComponent;
const CtaIconButton = IconButton as unknown as LooseComponent;

export interface CtaCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "buttons" | "arrow";
  type?: CtaCardActionType;
  channel?: string;
  channelIcon?: ReactNode;
  title?: string;
  body?: string;
  mediaSrc?: string;
  mediaAlt?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  socialProof?: string;
  onPrimaryClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onSecondaryClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  primaryLoading?: boolean;
  secondaryLoading?: boolean;
}

export type CtaCardActionType =
  | "email"
  | "instagram"
  | "linkedin"
  | "x"
  | "google-maps"
  | "external-link"
  | "question"
  | "phone-call"
  | "petition";

type CtaCardPreset = {
  channel: string;
  channelIcon: ReactNode;
  title: string;
  body?: string;
  mediaSrc?: string;
  mediaAlt?: string;
  primaryLabel: string;
};

const EMAIL_TITLE =
  "Federal Wildlife Oversight Needed: Idaho Commissioner Charged with Poaching on Federal Land";

const EMAIL_BODY =
  "Dear U.S. Fish & Wildlife Service, I am writing to bring to your attention a serious accountability concern in Idaho wildlife management.";

const SOCIAL_BODY =
  "!! URGENT !! Yesterday, Trump's \"God Squad\" voted to exempt oil and gas companies from complying with the #endangeredspeciesact when operating in the Gulf. This puts whales, manatees, sea turtles, queen conchs, and coral reefs at risk of extinction.";

const SOCIAL_THUMBNAIL = "/cta-card/social-comment-thumbnail.png";
const GOOGLE_MAPS_BASEMAP = "/action-cta-card/google-maps-basemap.png";

function DefaultEmailIcon() {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${id}-cta-card-email-filter0-i)`}>
        <g clipPath={`url(#${id}-cta-card-email-clip0)`}>
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-email-paint0-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-email-paint1-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-email-paint2-linear)`} />
          <ellipse cx="10" cy="9" rx="12" ry="9" fill={`url(#${id}-cta-card-email-paint3-linear)`} />
          <g filter={`url(#${id}-cta-card-email-filter1-f)`}>
            <path
              d="M26 8.9376C26 11.328 16.4742 8.9376 10.9231 8.9376C5.37191 8.9376 -2 11.328 -2 8.9376C-2 6.54721 5.48699 1.13834 11.641 1.00258C18.0392 0.861433 26 6.54721 26 8.9376Z"
              fill={`url(#${id}-cta-card-email-paint4-linear)`}
            />
          </g>
          <path
            d="M13.3173 11.8351L14.1756 9.2604C14.9253 7.01121 15.3002 5.88661 14.7065 5.29298C14.1129 4.69934 12.9883 5.07421 10.7391 5.82394L8.16445 6.68216C6.34913 7.28727 5.44147 7.58982 5.18354 8.03349C4.93817 8.45556 4.93817 8.97685 5.18354 9.39892C5.44147 9.84259 6.34913 10.1451 8.16444 10.7502C8.38942 10.8252 8.64252 10.7717 8.81098 10.6048L11.5638 7.87748C11.7187 7.72404 11.9686 7.72521 12.122 7.88008C12.2755 8.03495 12.2743 8.28488 12.1194 8.43831L9.41107 11.1216C9.22539 11.3055 9.16661 11.5871 9.24927 11.8351C9.85437 13.6504 10.1569 14.558 10.6006 14.816C11.0227 15.0613 11.5439 15.0613 11.966 14.816C12.4097 14.558 12.7122 13.6504 13.3173 11.8351Z"
            fill="white"
          />
        </g>
        <rect x="0.25" y="0.25" width="19.5" height="19.5" rx="9.75" stroke={`url(#${id}-cta-card-email-paint5-linear)`} strokeWidth="0.5" />
      </g>
      <defs>
        <filter id={`${id}-cta-card-email-filter0-i`} x="-100" y="-100" width="220" height="220" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.25" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.572549 0 0 0 0 0.823529 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter id={`${id}-cta-card-email-filter1-f`} x="-6" y="-3" width="36" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={`${id}-cta-card-email-paint0-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#92D2FF" />
          <stop offset="1" stopColor="#4B7EFF" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-email-paint1-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0.59" stopOpacity="0" />
          <stop offset="1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-email-paint2-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="0.372525" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-email-paint3-linear`} x1="10" y1="0" x2="10" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-email-paint4-linear`} x1="11.641" y1="1.0026" x2="11.641" y2="9.65898" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-email-paint5-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#92D2FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-cta-card-email-clip0`}>
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full text-white"
      style={{
        background:
          "radial-gradient(circle at 28% 95%, #ffd600 0, #ffbb0c 13%, #ff6930 38%, transparent 67%), radial-gradient(circle at 80% 110%, #ff1b90 0, #f80261 35%, #ed00c0 58%, #7017ff 92%)",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    </span>
  );
}

function GoogleMapsIcon() {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${id}-cta-card-maps-filter0-i)`}>
        <g clipPath={`url(#${id}-cta-card-maps-clip0)`}>
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-maps-paint0-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-maps-paint1-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-maps-paint2-linear)`} />
          <ellipse cx="10" cy="9" rx="12" ry="9" fill={`url(#${id}-cta-card-maps-paint3-linear)`} />
          <g filter={`url(#${id}-cta-card-maps-filter1-f)`}>
            <path
              d="M26 8.9376C26 11.328 16.4742 8.9376 10.9231 8.9376C5.37191 8.9376 -2 11.328 -2 8.9376C-2 6.54721 5.48699 1.13834 11.641 1.00258C18.0392 0.861433 26 6.54721 26 8.9376Z"
              fill={`url(#${id}-cta-card-maps-paint4-linear)`}
            />
          </g>
          <g clipPath={`url(#${id}-cta-card-maps-clip2)`}>
            <path d="M11.4602 4.19156C11.0611 4.06966 10.6258 4 10.1813 4C8.90239 4 7.75047 4.55728 6.97949 5.43673L8.95682 7.0302L11.4602 4.19156Z" fill="#1A73E8" />
            <path d="M6.97959 5.4375C6.37188 6.1341 6 7.03968 6 8.01491C6 8.77247 6.15419 9.38199 6.41723 9.93056L8.95692 7.03097L6.97959 5.4375Z" fill="#EA4335" />
            <path d="M10.1906 6.48147C11.0795 6.48147 11.796 7.16937 11.796 8.0227C11.796 8.39712 11.6509 8.74542 11.4151 9.01535C11.4151 9.01535 12.6759 7.56991 13.9094 6.168C13.4015 5.2276 12.5217 4.51358 11.4604 4.19141L8.95703 7.03005C9.25635 6.69916 9.69173 6.48147 10.1906 6.48147Z" fill="#4285F4" />
            <path d="M10.1905 9.55642C9.30159 9.55642 8.58504 8.86853 8.58504 8.0152C8.58504 7.64077 8.72109 7.29247 8.95692 7.03125L6.41724 9.93084C6.85261 10.8538 7.57823 11.6027 8.322 12.5344L11.415 9.00785C11.1156 9.34744 10.6803 9.55642 10.1905 9.55642Z" fill="#FBBC04" />
            <path d="M11.3606 13.5084C12.7574 11.4099 14.381 10.4608 14.381 8.02266C14.381 7.35219 14.2086 6.72525 13.9093 6.16797L8.32202 12.5331C8.55785 12.8292 8.80275 13.1688 9.03857 13.5171C9.89118 14.7797 9.65535 15.5285 10.1996 15.5285C10.7438 15.5285 10.508 14.771 11.3606 13.5084Z" fill="#34A853" />
          </g>
        </g>
        <rect x="0.25" y="0.25" width="19.5" height="19.5" rx="9.75" stroke={`url(#${id}-cta-card-maps-paint5-linear)`} strokeWidth="0.5" />
      </g>
      <defs>
        <filter id={`${id}-cta-card-maps-filter0-i`} x="-100" y="-100" width="220" height="220" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.25" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.705882 0 0 0 0 0.372549 0 0 0 0.4 0" />
          <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter id={`${id}-cta-card-maps-filter1-f`} x="-6" y="-3" width="36" height="17" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={`${id}-cta-card-maps-paint0-linear`} x1="10" y1="0" x2="10" y2="24.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#99ACCC" />
          <stop offset="1" stopColor="white" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-maps-paint1-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0.59" stopOpacity="0" />
          <stop offset="1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-maps-paint2-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="0.372525" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-maps-paint3-linear`} x1="10" y1="0" x2="10" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-maps-paint4-linear`} x1="11.641" y1="1.0026" x2="11.641" y2="9.65898" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-maps-paint5-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-cta-card-maps-clip0`}>
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
        <clipPath id={`${id}-cta-card-maps-clip2`}>
          <rect width="12" height="12" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SocialLinkIcon() {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${id}-cta-card-link-filter0-i)`}>
        <g clipPath={`url(#${id}-cta-card-link-clip0)`}>
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-link-paint0-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-link-paint1-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-link-paint2-linear)`} />
          <ellipse cx="10.4135" cy="7.44828" rx="9.93103" ry="7.44828" fill={`url(#${id}-cta-card-link-paint3-linear)`} />
          <g filter={`url(#${id}-cta-card-link-filter1-f)`}>
            <path
              d="M21.5181 7.39718C21.5181 9.37543 13.6347 7.39718 9.04066 7.39718C4.44659 7.39718 -1.6543 9.37543 -1.6543 7.39718C-1.6543 5.41892 4.54183 0.942615 9.63483 0.830261C14.9299 0.713449 21.5181 5.41892 21.5181 7.39718Z"
              fill={`url(#${id}-cta-card-link-paint4-linear)`}
            />
          </g>
          <g clipPath={`url(#${id}-cta-card-link-clip2)`}>
            <path
              d="M9.0001 10.5019C9.21483 10.789 9.48878 11.0265 9.80337 11.1984C10.118 11.3703 10.4659 11.4725 10.8234 11.4981C11.181 11.5237 11.5399 11.4721 11.8758 11.3468C12.2117 11.2215 12.5167 11.0255 12.7701 10.7719L14.2701 9.27194C14.7255 8.80043 14.9775 8.16892 14.9718 7.51343C14.9661 6.85794 14.7032 6.23091 14.2396 5.76739C13.7761 5.30387 13.1491 5.04095 12.4936 5.03525C11.8381 5.02955 11.2066 5.28154 10.7351 5.73694L9.8751 6.59194M11.0001 9.50194C10.7854 9.21487 10.5114 8.97734 10.1968 8.80547C9.88223 8.63359 9.53435 8.53138 9.17677 8.50577C8.8192 8.48016 8.46031 8.53175 8.12443 8.65705C7.78855 8.78234 7.48354 8.9784 7.2301 9.23194L5.7301 10.7319C5.2747 11.2034 5.02272 11.8349 5.02841 12.4904C5.03411 13.1459 5.29703 13.773 5.76055 14.2365C6.22407 14.7 6.8511 14.9629 7.5066 14.9686C8.16209 14.9743 8.79359 14.7223 9.2651 14.2669L10.1201 13.4119"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <rect x="0.206897" y="0.206897" width="19.5862" height="19.5862" rx="9.7931" stroke={`url(#${id}-cta-card-link-paint5-linear)`} strokeWidth="0.413793" />
      </g>
      <defs>
        <filter id={`${id}-cta-card-link-filter0-i`} x="-82.7586" y="-82.7586" width="185.517" height="185.517" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.03448" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.788235 0 0 0 0 0.572549 0 0 0 0.4 0" />
          <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter id={`${id}-cta-card-link-filter1-f`} x="-4.96464" y="-2.48222" width="29.7931" height="14.0699" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.65517" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={`${id}-cta-card-link-paint0-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC992" />
          <stop offset="1" stopColor="#FF724B" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-link-paint1-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0.59" stopOpacity="0" />
          <stop offset="1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-link-paint2-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="0.372525" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-link-paint3-linear`} x1="10.4135" y1="0" x2="10.4135" y2="14.8966" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-link-paint4-linear`} x1="9.63483" y1="0.830275" x2="9.63483" y2="7.99418" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-link-paint5-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC992" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-cta-card-link-clip0`}>
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
        <clipPath id={`${id}-cta-card-link-clip2`}>
          <rect width="12" height="12" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function QuestionIcon() {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${id}-cta-card-question-filter0-i)`}>
        <g clipPath={`url(#${id}-cta-card-question-clip0)`}>
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-question-paint0-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-question-paint1-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-question-paint2-linear)`} />
          <ellipse cx="10.4135" cy="7.44828" rx="9.93103" ry="7.44828" fill={`url(#${id}-cta-card-question-paint3-linear)`} />
          <g filter={`url(#${id}-cta-card-question-filter1-f)`}>
            <path
              d="M21.5181 7.39718C21.5181 9.37543 13.6347 7.39718 9.04066 7.39718C4.44659 7.39718 -1.6543 9.37543 -1.6543 7.39718C-1.6543 5.41892 4.54183 0.942615 9.63483 0.830261C14.9299 0.713449 21.5181 5.41892 21.5181 7.39718Z"
              fill={`url(#${id}-cta-card-question-paint4-linear)`}
            />
          </g>
          <path
            d="M12 6.125C12 6.745 11.495 7.25 10.875 7.25H9.125C8.815 7.25 8.535 7.125 8.33 6.92C8.125 6.715 8 6.435 8 6.125C8 5.505 8.505 5 9.125 5H10.875C11.185 5 11.465 5.125 11.67 5.33C11.875 5.535 12 5.815 12 6.125Z"
            fill="white"
          />
          <path
            d="M13.415 6.51632C13.3 6.42132 13.17 6.34632 13.03 6.29132C12.885 6.23632 12.74 6.35132 12.71 6.50132C12.54 7.35632 11.785 8.00132 10.875 8.00132H9.125C8.625 8.00132 8.155 7.80632 7.8 7.45132C7.54 7.19132 7.36 6.86132 7.29 6.50632C7.26 6.35632 7.11 6.23632 6.965 6.29632C6.385 6.53132 6 7.06132 6 8.12632V13.0013C6 14.5013 6.895 15.0013 8 15.0013H12C13.105 15.0013 14 14.5013 14 13.0013V8.12632C14 7.31132 13.775 6.81132 13.415 6.51632ZM8 10.1263H10C10.205 10.1263 10.375 10.2963 10.375 10.5013C10.375 10.7063 10.205 10.8763 10 10.8763H8C7.795 10.8763 7.625 10.7063 7.625 10.5013C7.625 10.2963 7.795 10.1263 8 10.1263ZM12 12.8763H8C7.795 12.8763 7.625 12.7063 7.625 12.5013C7.625 12.2963 7.795 12.1263 8 12.1263H12C12.205 12.1263 12.375 12.2963 12.375 12.5013C12.375 12.7063 12.205 12.8763 12 12.8763Z"
            fill="white"
          />
        </g>
        <rect x="0.206897" y="0.206897" width="19.5862" height="19.5862" rx="9.7931" stroke={`url(#${id}-cta-card-question-paint5-linear)`} strokeWidth="0.413793" />
      </g>
      <defs>
        <filter id={`${id}-cta-card-question-filter0-i`} x="-82.7586" y="-82.7586" width="185.517" height="185.517" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.03448" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.74902 0 0 0 0 0.372549 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter id={`${id}-cta-card-question-filter1-f`} x="-4.96464" y="-2.48222" width="29.7931" height="14.0699" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.65517" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={`${id}-cta-card-question-paint0-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BF5FFF" />
          <stop offset="1" stopColor="#611DC0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-question-paint1-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0.59" stopOpacity="0" />
          <stop offset="1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-question-paint2-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="0.372525" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-question-paint3-linear`} x1="10.4135" y1="0" x2="10.4135" y2="14.8966" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-question-paint4-linear`} x1="9.63483" y1="0.830275" x2="9.63483" y2="7.99418" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-question-paint5-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BF5FFF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-cta-card-question-clip0`}>
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PhoneCallIcon() {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${id}-cta-card-phone-filter0-i)`}>
        <g clipPath={`url(#${id}-cta-card-phone-clip0)`}>
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-phone-paint0-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-phone-paint1-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-phone-paint2-linear)`} />
          <ellipse cx="10.4135" cy="7.44828" rx="9.93103" ry="7.44828" fill={`url(#${id}-cta-card-phone-paint3-linear)`} />
          <g filter={`url(#${id}-cta-card-phone-filter1-f)`}>
            <path
              d="M21.5181 7.39718C21.5181 9.37543 13.6347 7.39718 9.04066 7.39718C4.44659 7.39718 -1.6543 9.37543 -1.6543 7.39718C-1.6543 5.41892 4.54183 0.942615 9.63483 0.830261C14.9299 0.713449 21.5181 5.41892 21.5181 7.39718Z"
              fill={`url(#${id}-cta-card-phone-paint4-linear)`}
            />
          </g>
          <path
            d="M9.525 11.475L8.6 12.4C8.405 12.595 8.095 12.595 7.895 12.405C7.84 12.35 7.785 12.3 7.73 12.245C7.215 11.725 6.75 11.18 6.335 10.61C5.925 10.04 5.595 9.47 5.355 8.905C5.12 8.335 5 7.79 5 7.27C5 6.93 5.06 6.605 5.18 6.305C5.3 6 5.49 5.72 5.755 5.47C6.075 5.155 6.425 5 6.795 5C6.935 5 7.075 5.03 7.2 5.09C7.33 5.15 7.445 5.24 7.535 5.37L8.695 7.005C8.785 7.13 8.85 7.245 8.895 7.355C8.94 7.46 8.965 7.565 8.965 7.66C8.965 7.78 8.93 7.9 8.86 8.015C8.795 8.13 8.7 8.25 8.58 8.37L8.2 8.765C8.145 8.82 8.12 8.885 8.12 8.965C8.12 9.005 8.125 9.04 8.135 9.08C8.15 9.12 8.165 9.15 8.175 9.18C8.265 9.345 8.42 9.56 8.64 9.82C8.865 10.08 9.105 10.345 9.365 10.61C9.415 10.66 9.47 10.71 9.52 10.76C9.72 10.955 9.725 11.275 9.525 11.475Z"
            fill="white"
          />
          <path
            d="M14.985 13.1645C14.985 13.3045 14.96 13.4495 14.91 13.5895C14.895 13.6295 14.88 13.6695 14.86 13.7095C14.775 13.8895 14.665 14.0595 14.52 14.2195C14.275 14.4895 14.005 14.6845 13.7 14.8095C13.695 14.8095 13.69 14.8145 13.685 14.8145C13.39 14.9345 13.07 14.9995 12.725 14.9995C12.215 14.9995 11.67 14.8795 11.095 14.6345C10.52 14.3895 9.94505 14.0595 9.37505 13.6445C9.18005 13.4995 8.98505 13.3545 8.80005 13.1995L10.435 11.5645C10.575 11.6695 10.7 11.7495 10.805 11.8045C10.83 11.8145 10.86 11.8295 10.895 11.8445C10.935 11.8595 10.975 11.8645 11.02 11.8645C11.105 11.8645 11.17 11.8345 11.225 11.7795L11.605 11.4045C11.73 11.2795 11.85 11.1845 11.965 11.1245C12.08 11.0545 12.195 11.0195 12.32 11.0195C12.415 11.0195 12.515 11.0395 12.625 11.0845C12.735 11.1295 12.85 11.1945 12.975 11.2795L14.63 12.4545C14.76 12.5445 14.85 12.6495 14.905 12.7745C14.955 12.8995 14.985 13.0245 14.985 13.1645Z"
            fill="white"
          />
        </g>
        <rect x="0.206897" y="0.206897" width="19.5862" height="19.5862" rx="9.7931" stroke={`url(#${id}-cta-card-phone-paint5-linear)`} strokeWidth="0.413793" />
      </g>
      <defs>
        <filter id={`${id}-cta-card-phone-filter0-i`} x="-82.7586" y="-82.7586" width="185.517" height="185.517" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.03448" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.372549 0 0 0 0 1 0 0 0 0 0.768627 0 0 0 0.4 0" />
          <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter id={`${id}-cta-card-phone-filter1-f`} x="-4.96464" y="-2.48222" width="29.7931" height="14.0699" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.65517" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={`${id}-cta-card-phone-paint0-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5FFFC4" />
          <stop offset="1" stopColor="#1DC084" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-phone-paint1-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0.59" stopOpacity="0" />
          <stop offset="1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-phone-paint2-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="0.372525" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-phone-paint3-linear`} x1="10.4135" y1="0" x2="10.4135" y2="14.8966" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-phone-paint4-linear`} x1="9.63483" y1="0.830275" x2="9.63483" y2="7.99418" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-phone-paint5-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5FFFC4" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-cta-card-phone-clip0`}>
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PetitionIcon() {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${id}-cta-card-petition-filter0-i)`}>
        <g clipPath={`url(#${id}-cta-card-petition-clip0)`}>
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-petition-paint0-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-petition-paint1-linear)`} />
          <rect width="20" height="20" rx="10" fill={`url(#${id}-cta-card-petition-paint2-linear)`} />
          <path
            d="M9.49976 6H7.39976C6.55968 6 6.13964 6 5.81877 6.16349C5.53653 6.3073 5.30706 6.53677 5.16325 6.81901C4.99976 7.13988 4.99976 7.55992 4.99976 8.4V12.6C4.99976 13.4401 4.99976 13.8601 5.16325 14.181C5.30706 14.4632 5.53653 14.6927 5.81877 14.8365C6.13964 15 6.55968 15 7.39976 15H11.5998C12.4398 15 12.8599 15 13.1807 14.8365C13.463 14.6927 13.6925 14.4632 13.8363 14.181C13.9998 13.8601 13.9998 13.4401 13.9998 12.6V10.5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 11.2234C8 10.9788 8 10.8565 8.02763 10.7414C8.05213 10.6394 8.09253 10.5418 8.14736 10.4524C8.2092 10.3515 8.29568 10.265 8.46863 10.092L13.25 5.31066C13.6642 4.89645 14.3358 4.89645 14.75 5.31066C15.1642 5.72487 15.1642 6.39645 14.75 6.81066L9.96864 11.592C9.79569 11.765 9.70921 11.8515 9.6083 11.9133C9.51883 11.9681 9.42128 12.0085 9.31925 12.033C9.20416 12.0607 9.08186 12.0607 8.83727 12.0607H8V11.2234Z"
            fill="white"
          />
          <ellipse cx="10.4135" cy="7.44828" rx="9.93103" ry="7.44828" fill={`url(#${id}-cta-card-petition-paint3-linear)`} />
          <g filter={`url(#${id}-cta-card-petition-filter1-f)`}>
            <path
              d="M21.5181 7.39718C21.5181 9.37543 13.6347 7.39718 9.04066 7.39718C4.44659 7.39718 -1.6543 9.37543 -1.6543 7.39718C-1.6543 5.41892 4.54183 0.942615 9.63483 0.830261C14.9299 0.713449 21.5181 5.41892 21.5181 7.39718Z"
              fill={`url(#${id}-cta-card-petition-paint4-linear)`}
            />
          </g>
        </g>
        <rect x="0.206897" y="0.206897" width="19.5862" height="19.5862" rx="9.7931" stroke={`url(#${id}-cta-card-petition-paint5-linear)`} strokeWidth="0.413793" />
      </g>
      <defs>
        <filter id={`${id}-cta-card-petition-filter0-i`} x="-82.7586" y="-82.7586" width="185.517" height="185.517" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1.03448" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.74902 0 0 0 0 0.372549 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend mode="plus-lighter" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter id={`${id}-cta-card-petition-filter1-f`} x="-4.96464" y="-2.48222" width="29.7931" height="14.0699" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.65517" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={`${id}-cta-card-petition-paint0-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B81DFF" />
          <stop offset="1" stopColor="#B81DC0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-petition-paint1-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0.59" stopOpacity="0" />
          <stop offset="1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-petition-paint2-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="0.372525" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-petition-paint3-linear`} x1="10.4135" y1="0" x2="10.4135" y2="14.8966" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-petition-paint4-linear`} x1="9.63483" y1="0.830275" x2="9.63483" y2="7.99418" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.42" />
          <stop offset="0.595062" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-cta-card-petition-paint5-linear`} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B81DFF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-cta-card-petition-clip0`}>
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function BrandedIcon({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border-[0.5px] text-white", className)} aria-hidden="true">
      {children}
    </span>
  );
}

function LinkedinGlyph() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 8.6H2.7V21h3.8V8.6ZM4.6 3A2.2 2.2 0 1 0 4.6 7.4 2.2 2.2 0 0 0 4.6 3ZM21.3 14.1c0-3.7-2-5.8-5-5.8-2.3 0-3.4 1.3-4 2.2V8.6H8.6V21h3.8v-6.2c0-1.7.3-3.3 2.4-3.3 2 0 2.1 1.9 2.1 3.4V21h3.8v-6.9h.6Z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.9 10.5 21.3 2h-1.8l-6.4 7.4L8 2H2.1l7.8 11.4L2.1 22h1.8l6.8-7.8 5.4 7.8H22l-8.1-11.5Zm-2.4 2.8-.8-1.1L4.4 3.4h2.7l5 7 .8 1.1 6.6 9.2h-2.7l-5.3-7.4Z" />
    </svg>
  );
}

const CTA_CARD_PRESETS: Record<CtaCardActionType, CtaCardPreset> = {
  email: {
    channel: "email",
    channelIcon: <DefaultEmailIcon />,
    title: EMAIL_TITLE,
    body: EMAIL_BODY,
    primaryLabel: "review email",
  },
  instagram: {
    channel: "Instagram",
    channelIcon: <InstagramIcon />,
    title: "@camshaw_",
    body: SOCIAL_BODY,
    mediaSrc: SOCIAL_THUMBNAIL,
    mediaAlt: "Instagram post preview",
    primaryLabel: "comment on Instagram",
  },
  linkedin: {
    channel: "Linkedin",
    channelIcon: (
      <BrandedIcon className="border-[#0082ff] bg-[#0766c2]">
        <LinkedinGlyph />
      </BrandedIcon>
    ),
    title: "@camshaw_",
    body: SOCIAL_BODY,
    mediaSrc: SOCIAL_THUMBNAIL,
    mediaAlt: "Linkedin post preview",
    primaryLabel: "comment on Linkedin",
  },
  x: {
    channel: "X (Twitter)",
    channelIcon: (
      <BrandedIcon className="border-[#f5f5f5] bg-[#140f14]">
        <XGlyph />
      </BrandedIcon>
    ),
    title: "@camshaw_",
    body: SOCIAL_BODY,
    mediaSrc: SOCIAL_THUMBNAIL,
    mediaAlt: "X post preview",
    primaryLabel: "reply on X",
  },
  "google-maps": {
    channel: "Google Maps review",
    channelIcon: <GoogleMapsIcon />,
    title: "This is Hampden. We don't work for fascists. We demand you cut all ties with this regime, or get out of our neighborhood.",
    body: "maps.app.goo.gl/Mudjdcg5c4RLW2RL7",
    mediaSrc: GOOGLE_MAPS_BASEMAP,
    mediaAlt: "Google Maps preview",
    primaryLabel: "post a review",
  },
  "external-link": {
    channel: "external link",
    channelIcon: <SocialLinkIcon />,
    title: "Protect the places this community depends on",
    body: "Open the campaign resource, read the context, and complete the action from the partner page.",
    primaryLabel: "take action",
  },
  question: {
    channel: "question",
    channelIcon: <QuestionIcon />,
    title: "Why do you think young people are still left out of major climate decisions?",
    body: "Share a short answer so the creator can include supporter perspectives in the next update.",
    primaryLabel: "reply to the survey",
  },
  "phone-call": {
    channel: "call",
    channelIcon: <PhoneCallIcon />,
    title: "Call Governor Abbott's office about the Big Bend border wall",
    body: "Ask the office to respond publicly to the local officials opposing the project.",
    primaryLabel: "call now",
  },
  petition: {
    channel: "petition",
    channelIcon: <PetitionIcon />,
    title: "Sign the petition to protect federal wildlife oversight",
    body: "Add your name to support stronger enforcement before the next hearing.",
    primaryLabel: "sign petition",
  },
};

export const CtaCard = forwardRef<HTMLDivElement, CtaCardProps>(
  (
    {
      className,
      variant = "buttons",
      type = "email",
      channel,
      channelIcon,
      title,
      body,
      mediaSrc,
      mediaAlt,
      primaryLabel,
      secondaryLabel,
      socialProof = "34 people did this",
      onPrimaryClick,
      onSecondaryClick,
      primaryDisabled,
      secondaryDisabled,
      primaryLoading,
      secondaryLoading,
      ...props
    },
    ref
  ) => {
    const preset = CTA_CARD_PRESETS[type];
    const isArrowVariant = variant === "arrow";
    const resolvedChannel = channel ?? preset.channel;
    const resolvedChannelIcon = channelIcon ?? preset.channelIcon;
    const resolvedTitle = title ?? preset.title;
    const resolvedBody = body ?? preset.body;
    const resolvedMediaSrc = mediaSrc ?? preset.mediaSrc;
    const resolvedMediaAlt = mediaAlt ?? preset.mediaAlt;
    const resolvedPrimaryLabel = primaryLabel ?? preset.primaryLabel;
    const resolvedSecondaryLabel = secondaryLabel ?? "skip for now";
    const hasMedia = Boolean(resolvedMediaSrc);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-[343px] flex-col overflow-hidden rounded-[var(--radius-7)]",
          isArrowVariant
            ? [
                "border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)]",
                "pb-[var(--space-5)] shadow-[0_4px_4px_0_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.60)]",
                "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
                "after:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.08)]",
              ]
            : [
                "border border-[var(--text-base-primary)] bg-[var(--backgrounds-neutral-secondary-default)]",
                "pb-[var(--space-5)] shadow-[0_8px_16px_0_rgba(20,15,20,0.08)]",
              ],
          "relative",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-[var(--space-4)] px-[var(--space-6)] pt-[var(--space-6)]">
          <div className="flex items-center">
            <CtaChip
              size="md"
              variant="social"
              label={resolvedChannel}
              socialIcon={resolvedChannelIcon}
              className={cn(
                "h-7 !gap-[var(--space-2)] bg-[rgba(245,245,245,0.08)] py-[var(--space-2)] !pl-[var(--space-3)] !pr-[var(--space-5)]",
                "text-[14px] font-normal leading-[var(--line-height-sm)] backdrop-blur-[12px]"
              )}
            />
          </div>

          <div className={cn("flex w-full gap-[var(--space-4)]", hasMedia ? "h-[84px] items-start" : "flex-col")}>
            <div className={cn("min-w-0", hasMedia ? "flex h-full flex-1 flex-col gap-[var(--space-2)] pb-[var(--space-2)]" : "flex flex-col gap-[var(--space-2)]")}>
              <p
                className={cn(
                  "text-[14px] font-medium leading-[var(--line-height-sm)] tracking-[0] text-[var(--text-base-primary)]",
                  hasMedia ? "truncate" : "line-clamp-3"
                )}
              >
                {resolvedTitle}
              </p>
              {resolvedBody && (
                <p
                  className={cn(
                    "text-[14px] font-normal leading-[var(--line-height-sm)] tracking-[0] text-[var(--text-glass-subtle)]",
                    hasMedia ? "line-clamp-3" : "truncate"
                  )}
                >
                  {resolvedBody}
                </p>
              )}
            </div>

            {resolvedMediaSrc && (
              <div
                className="size-20 shrink-0 rounded-[var(--radius-2)] bg-cover bg-center"
                role={resolvedMediaAlt ? "img" : undefined}
                aria-label={resolvedMediaAlt}
                style={{ backgroundImage: `url(${resolvedMediaSrc})` }}
              />
            )}
          </div>
        </div>

        {isArrowVariant ? (
          <div className="flex w-full items-center justify-between px-[var(--space-6)] pt-[var(--space-5)]">
            {socialProof && (
              <p className="min-w-0 truncate text-[12px] font-normal leading-[var(--line-height-xs)] tracking-[0] text-[var(--text-base-secondary)]">
                {socialProof}
              </p>
            )}
            <CtaIconButton
              type="button"
              size="xsm"
              variant="primary"
              icon={ChevronRight}
              loading={primaryLoading}
              disabled={primaryDisabled}
              onClick={onPrimaryClick}
              aria-label={resolvedPrimaryLabel}
              className="ml-[var(--space-4)] shrink-0 shadow-[0_4px_2px_0_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.60)]"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-[var(--space-4)] px-[var(--space-6)] pt-[var(--space-5)]">
            {socialProof && (
              <p className="max-w-full truncate text-center text-[12px] font-normal leading-[var(--line-height-xs)] tracking-[0] text-[var(--text-glass-primary)]">
                {socialProof}
              </p>
            )}

            <CtaButton
              type="button"
              size="md"
              variant="primary"
              leftIcon={PencilLine}
              loading={primaryLoading}
              disabled={primaryDisabled}
              onClick={onPrimaryClick}
              className="h-10 w-full gap-[var(--space-3)] px-[var(--space-5)] text-[14px] leading-[var(--line-height-sm)]"
            >
              {resolvedPrimaryLabel}
            </CtaButton>

            <CtaButton
              type="button"
              size="sm"
              variant="ghost"
              rightIcon={ArrowRight}
              loading={secondaryLoading}
              disabled={secondaryDisabled}
              onClick={onSecondaryClick}
              className="h-8 w-full gap-[var(--space-2)] px-[var(--space-4)] text-[14px] leading-[var(--line-height-sm)] text-[var(--text-base-secondary)] hover:bg-transparent hover:text-[var(--text-base-primary)]"
            >
              {resolvedSecondaryLabel}
            </CtaButton>
          </div>
        )}
      </div>
    );
  }
);

CtaCard.displayName = "CtaCard";
