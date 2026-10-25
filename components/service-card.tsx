"use client";

import Image from "next/image";
import { copy } from "@/lib/i18n/copy";
import type { MehndiService } from "@/lib/services/catalog";
import { designImages } from "@/lib/services/design-images";

type ServiceCardProps = {
  service: MehndiService;
  isSelected: boolean;
  onSelect: (service: MehndiService) => void;
  priority?: boolean;
};

const inrFormatter = new Intl.NumberFormat("hi-IN-u-nu-deva", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatDuration(durationMinutes: number): string {
  if (durationMinutes % 60 === 0) {
    return `${new Intl.NumberFormat("hi-IN-u-nu-deva").format(durationMinutes / 60)} ${copy.hours}`;
  }

  return `${new Intl.NumberFormat("hi-IN-u-nu-deva").format(durationMinutes)} ${copy.minutes}`;
}

export function ServiceCard({
  service,
  isSelected,
  onSelect,
  priority = false,
}: ServiceCardProps) {
  const image = designImages[service.id];

  return (
    <article
      className={`service-card group overflow-hidden rounded-[1.35rem] border bg-[#fffdf9] transition duration-300 hover:-translate-y-1 ${
        isSelected
          ? "border-[#9b4b57] ring-2 ring-[#9b4b57]/70"
          : "border-[#eae2d7]"
      }`}
    >
      <div className="service-image relative aspect-[1.24] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={service.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,#f5e3df_0,#eee4d6_72%)]"
            role="img"
            aria-label={service.imageAlt}
          >
            <span className="rounded-full border border-[#344b39]/20 bg-white/70 px-4 py-2 text-sm text-[#344b39]">
              {copy.designPlaceholder}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-[#fffdf8]/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#475742] shadow-sm backdrop-blur">
          {copy.categories[service.category]}
        </span>
        {isSelected && (
          <span className="absolute right-4 top-4 rounded-full bg-[#8c3948] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            {copy.selectedLabel}
          </span>
        )}
      </div>
      <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="display-type text-xl leading-snug text-[#29342a] sm:text-2xl">
            {service.name}
          </h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-[#71685e]">
            {service.description}
          </p>
        </div>
        <p className="inline-flex w-fit max-w-full items-center gap-2 rounded-lg bg-[#f5eeea] px-3 py-2 text-sm font-medium leading-5 text-[#714751]">
          <span aria-hidden="true" className="text-[#9b4b57]">✦</span>
          <span>
            {copy.packageLabel}: {service.packageName}
          </span>
        </p>
        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-[#eee7de] pt-4">
          <div>
            <dt className="text-xs font-medium tracking-wide text-[#777065]">
              {copy.priceLabel} ({copy.sampleLabel})
            </dt>
            <dd className="mt-1 text-lg font-semibold text-[#29342a] sm:text-xl">
              {inrFormatter.format(service.priceInr)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-[#777065]">
              {copy.durationLabel}
            </dt>
            <dd className="mt-1 text-base font-semibold text-[#29342a]">
              {formatDuration(service.durationMinutes)}
            </dd>
          </div>
        </dl>
        <button
          type="button"
          className={`focus-ring mt-1 w-full rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
            isSelected
              ? "bg-[#8c3948] text-white hover:bg-[#74303d]"
              : "bg-[#354c3a] text-white hover:bg-[#263a2c]"
          }`}
          aria-pressed={isSelected}
          onClick={() => onSelect(service)}
        >
          {isSelected ? copy.selectedService : copy.selectService}
        </button>
      </div>
    </article>
  );
}
