"use client";

import { copy } from "@/lib/i18n/copy";
import {
  serviceCategories,
  type ServiceCategory,
} from "@/lib/services/catalog";

type CategoryListProps = {
  activeCategory: ServiceCategory;
  onCategoryChange: (category: ServiceCategory) => void;
};

export function CategoryList({
  activeCategory,
  onCategoryChange,
}: CategoryListProps) {
  return (
    <nav aria-label={copy.categoriesTitle}>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {serviceCategories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={`focus-ring group flex min-h-20 w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition duration-200 ${
                activeCategory === category
                  ? "border-[#344b39] bg-[#344b39] text-[#fffdf8] shadow-[0_12px_28px_rgba(52,75,57,0.16)]"
                  : "border-[#e7ded2] bg-[#fffdf9] text-[#2c3029] hover:-translate-y-0.5 hover:border-[#b8aa98] hover:bg-white"
              }`}
              aria-pressed={activeCategory === category}
              onClick={() => onCategoryChange(category)}
            >
              <span>
                <span className="block text-base font-semibold sm:text-lg">
                  {copy.categories[category]}
                </span>
                <span
                  className={`mt-1 block text-xs font-normal leading-5 sm:text-sm ${
                    activeCategory === category
                      ? "text-white/75"
                      : "text-[#756d61]"
                  }`}
                >
                  {copy.categoryDescriptions[category]}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`ml-3 text-xl transition-transform group-hover:translate-x-1 ${
                  activeCategory === category
                    ? "text-[#e8c9cc]"
                    : "text-[#9a6b66]"
                }`}
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
