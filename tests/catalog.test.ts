import { describe, expect, it } from "vitest";
import {
  getServicesByCategory,
  sampleServices,
  serviceCategories,
} from "@/lib/services/catalog";

describe("service catalog", () => {
  it("provides all required categories", () => {
    expect(serviceCategories).toEqual(["bridal", "engagement", "simple"]);
  });

  it.each(serviceCategories)("filters services in the %s category", (category) => {
    const filtered = getServicesByCategory(sampleServices, category);

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((service) => service.category === category)).toBe(true);
  });

  it("returns an empty list when a category has no services", () => {
    expect(getServicesByCategory([], "simple")).toEqual([]);
  });
});
