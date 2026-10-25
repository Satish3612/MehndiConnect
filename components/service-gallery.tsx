"use client";

import { useState } from "react";
import { CategoryList } from "@/components/category-list";
import { ServiceCard } from "@/components/service-card";
import { copy } from "@/lib/i18n/copy";
import {
  getServicesByCategory,
  sampleServices,
  serviceCategories,
  type MehndiService,
  type ServiceCategory,
} from "@/lib/services/catalog";
import { saveSelectedService } from "@/lib/services/selection";

export type CatalogStatus = "loading" | "error" | "ready";

type ServiceGalleryProps = {
  catalog?: readonly MehndiService[];
  status?: CatalogStatus;
};

export function ServiceGallery({
  catalog = sampleServices,
  status = "ready",
}: ServiceGalleryProps) {
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategory>(serviceCategories[0]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [selectionError, setSelectionError] = useState(false);

  const categoryServices = getServicesByCategory(catalog, activeCategory);

  function handleSelect(service: MehndiService) {
    setSelectedServiceId(service.id);
    setSelectionError(false);

    try {
      saveSelectedService(service.id, window.sessionStorage);
    } catch {
      setSelectionError(true);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7f0]">
      <header className="sticky top-0 z-20 border-b border-[#e9e1d6]/90 bg-[#faf7f0]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a
            className="focus-ring flex items-center gap-3 rounded"
            href="#top"
            aria-label={copy.brand}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#354c3a] text-lg text-[#f2dfc7]">
              ✳
            </span>
            <span>
              <span className="block text-base font-bold tracking-wide text-[#29342a] sm:text-lg">
                {copy.brand}
              </span>
              <span className="hidden text-[10px] tracking-[0.18em] text-[#8c3948] sm:block">
                MEHNDI · ART · OCCASIONS
              </span>
            </span>
          </a>
          <nav aria-label="मुख्य नेविगेशन" className="flex items-center gap-4 sm:gap-7">
            <a
              className="focus-ring rounded text-sm font-medium text-[#5b6257] transition hover:text-[#8c3948]"
              href="#collections"
            >
              {copy.categoriesTitle}
            </a>
            <a
              className="focus-ring rounded text-sm font-medium text-[#5b6257] transition hover:text-[#8c3948]"
              href="#services"
            >
              {copy.servicesTitle}
            </a>
            <a
              className="focus-ring hidden rounded-full bg-[#354c3a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#263a2c] sm:inline-flex"
              href="#services"
            >
              {copy.eyebrow}
            </a>
          </nav>
        </div>
      </header>

      <div
        id="main-content"
        className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-10"
      >
        <section
          id="top"
          aria-labelledby="gallery-title"
          className="hero-panel relative mb-14 grid min-h-[420px] overflow-hidden rounded-[2rem] border border-[#e8ded1] sm:mb-20 sm:min-h-[500px] sm:grid-cols-[1.08fr_0.92fr]"
        >
          <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
            <p className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#9a796a]/25 bg-[#fffdf8]/65 px-4 py-2 text-xs font-semibold tracking-wide text-[#71594c] sm:text-sm">
              <span aria-hidden="true" className="text-[#9b4b57]">✦</span>
              {copy.collectionLabel}
            </p>
            <h1
              id="gallery-title"
              className="display-type max-w-2xl text-4xl leading-[1.35] text-[#29382d] sm:text-5xl lg:text-6xl"
            >
              {copy.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#5e6256] sm:mt-6 sm:text-lg">
              {copy.introduction}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#775d58]">
              {copy.sampleDisclaimer}
            </p>
            <a
              className="focus-ring mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#354c3a] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#354c3a]/15 transition hover:-translate-y-0.5 hover:bg-[#263a2c]"
              href="#collections"
            >
              {copy.categoriesTitle}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div
            aria-hidden="true"
            className="relative hidden min-h-[420px] overflow-hidden sm:block sm:min-h-[500px]"
          >
            <div className="absolute -right-16 top-12 h-[26rem] w-[26rem] rounded-full border border-[#8b7459]/15" />
            <div className="absolute right-3 top-24 h-[22rem] w-[22rem] rounded-full border border-[#8b7459]/20" />
            <svg
              className="hero-ornament absolute right-[7%] top-[12%] h-[82%] w-[82%]"
              viewBox="0 0 440 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M220 54C220 54 178 115 178 168C178 190 196 205 220 205C244 205 262 190 262 168C262 115 220 54 220 54Z" stroke="currentColor" strokeWidth="2" />
              <path d="M220 446C220 446 178 385 178 332C178 310 196 295 220 295C244 295 262 310 262 332C262 385 220 446 220 446Z" stroke="currentColor" strokeWidth="2" />
              <path d="M42 250C42 250 103 208 156 208C178 208 193 226 193 250C193 274 178 292 156 292C103 292 42 250 42 250Z" stroke="currentColor" strokeWidth="2" />
              <path d="M398 250C398 250 337 208 284 208C262 208 247 226 247 250C247 274 262 292 284 292C337 292 398 250 398 250Z" stroke="currentColor" strokeWidth="2" />
              <circle cx="220" cy="250" r="80" stroke="currentColor" strokeWidth="2" />
              <circle cx="220" cy="250" r="65" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="220" cy="250" r="46" stroke="currentColor" strokeWidth="2" />
              <circle cx="220" cy="250" r="26" stroke="currentColor" strokeWidth="2" />
              <circle cx="220" cy="250" r="9" fill="currentColor" />
              <path d="M220 170C234 186 241 199 241 214C241 226 232 235 220 235C208 235 199 226 199 214C199 199 206 186 220 170Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <path d="M220 330C206 314 199 301 199 286C199 274 208 265 220 265C232 265 241 274 241 286C241 301 234 314 220 330Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <path d="M140 250C156 236 169 229 184 229C196 229 205 238 205 250C205 262 196 271 184 271C169 271 156 264 140 250Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <path d="M300 250C284 264 271 271 256 271C244 271 235 262 235 250C235 238 244 229 256 229C271 229 284 236 300 250Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <path d="M164 194C184 198 197 205 207 215C215 223 215 235 207 243C199 251 187 251 179 243C169 233 164 218 164 194Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <path d="M276 306C256 302 243 295 233 285C225 277 225 265 233 257C241 249 253 249 261 257C271 267 276 282 276 306Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <path d="M276 194C256 198 243 205 233 215C225 223 225 235 233 243C241 251 253 251 261 243C271 233 276 218 276 194Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <path d="M164 306C184 302 197 295 207 285C215 277 215 265 207 257C199 249 187 249 179 257C169 267 164 282 164 306Z" fill="#FAF7F0" stroke="currentColor" strokeWidth="1.5" />
              <g fill="#9B4B57">
                <circle cx="220" cy="130" r="4" /><circle cx="220" cy="370" r="4" />
                <circle cx="100" cy="250" r="4" /><circle cx="340" cy="250" r="4" />
                <circle cx="135" cy="165" r="3" /><circle cx="305" cy="165" r="3" />
                <circle cx="135" cy="335" r="3" /><circle cx="305" cy="335" r="3" />
              </g>
            </svg>
            <div className="hero-stamp absolute bottom-[12%] left-[9%] rounded-2xl border border-white/70 bg-[#fffdf8]/90 px-5 py-4 backdrop-blur">
              <p className="text-xs font-semibold tracking-wide text-[#8c3948]">
                {copy.heroNote}
              </p>
              <p className="display-type mt-1 text-lg text-[#354c3a]">
                {copy.eyebrow}
              </p>
            </div>
          </div>
        </section>

        <section
          id="collections"
          aria-labelledby="category-heading"
          className="mb-14 scroll-mt-28 sm:mb-20"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#8c3948]">
                01 · COLLECTIONS
              </p>
              <h2
                id="category-heading"
                className="display-type text-2xl text-[#29342a] sm:text-3xl"
              >
                {copy.categoriesTitle}
              </h2>
            </div>
            <p className="hidden text-sm text-[#756d61] sm:block">
              {copy.collectionNote}
            </p>
          </div>
          <CategoryList
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        <section
          id="services"
          aria-labelledby="services-heading"
          className="scroll-mt-28"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#8c3948]">
                02 · THE EDIT
              </p>
              <h2
                id="services-heading"
                className="display-type text-2xl text-[#29342a] sm:text-3xl"
              >
                {copy.servicesTitle}
                <span className="ml-2 font-sans text-base font-medium tracking-normal text-[#7c756a] sm:text-lg">
                  / {copy.categories[activeCategory]}
                </span>
              </h2>
            </div>
            {status === "ready" && categoryServices.length > 0 && (
              <span className="rounded-full border border-[#e7ded2] bg-[#fffdf9] px-4 py-2 text-sm text-[#67675d]">
                {new Intl.NumberFormat("hi-IN-u-nu-deva").format(categoryServices.length)}{" "}
                {copy.serviceCount}
              </span>
            )}
          </div>

          {status === "loading" ? (
            <div
              role="status"
              className="service-state rounded-3xl border border-[#eae2d7] p-8 text-[#475742] shadow-sm sm:p-12"
            >
              <span className="mb-4 block text-3xl text-[#9b4b57]" aria-hidden="true">✳</span>
              <p className="text-base font-medium">{copy.loading}</p>
            </div>
          ) : status === "error" ? (
            <p
              role="alert"
              className="service-state rounded-3xl border border-[#dfc8c5] p-8 text-[#713d2c] shadow-sm sm:p-12"
            >
              {copy.error}
            </p>
          ) : categoryServices.length === 0 ? (
            <p
              role="status"
              className="service-state rounded-3xl border border-[#eae2d7] p-8 text-[#5b6257] shadow-sm sm:p-12"
            >
              {catalog.length === 0 ? copy.noCatalogServices : copy.noServices}
            </p>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {categoryServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedServiceId === service.id}
                  onSelect={handleSelect}
                  priority={index < 2}
                />
              ))}
            </div>
          )}
        </section>

        {selectedServiceId && (
          <aside
            className="mt-8 flex items-start gap-4 rounded-2xl border border-[#c6d0c1] bg-[#edf1e8] p-5 text-[#344b39] sm:items-center sm:p-6"
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#354c3a] text-lg text-white"
            >
              ✓
            </span>
            <div>
              <p className="font-semibold">{copy.selectionHint}</p>
              {selectionError && (
                <p role="alert" className="mt-2 text-sm text-[#713d2c]">
                {copy.selectionSaveError}
                </p>
              )}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
