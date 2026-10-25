import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ServiceGallery } from "@/components/service-gallery";
import { copy } from "@/lib/i18n/copy";
import {
  sampleServices,
  serviceCategories,
} from "@/lib/services/catalog";
import {
  getSelectedServiceId,
  selectedServiceStorageKey,
} from "@/lib/services/selection";

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
});

describe("ServiceGallery", () => {
  it("renders category choices and services for each category", () => {
    render(<ServiceGallery />);

    for (const category of serviceCategories) {
      fireEvent.click(
        screen.getByRole("button", {
          name: new RegExp(copy.categories[category]),
        }),
      );
      const cards = screen.getAllByRole("article");
      const categoryServices = sampleServices.filter(
        (entry) => entry.category === category,
      );
      expect(cards).toHaveLength(categoryServices.length);
      for (const service of categoryServices) {
        expect(
          screen.getByRole("heading", { level: 3, name: service.name }),
        ).toBeInTheDocument();
      }
      expect(
        within(cards[0]).getByRole("button", { name: copy.selectService }),
      ).toBeInTheDocument();
    }
  });

  it("shows each service price and estimated duration", () => {
    render(<ServiceGallery />);

    expect(screen.getByText("₹८,५००")).toBeInTheDocument();
    expect(screen.getByText("५ घंटे")).toBeInTheDocument();
  });

  it("renders distinct local artwork with descriptive alt text", () => {
    render(<ServiceGallery />);

    for (const category of serviceCategories) {
      fireEvent.click(
        screen.getByRole("button", {
          name: new RegExp(copy.categories[category]),
        }),
      );
      const categoryServices = sampleServices.filter(
        (service) => service.category === category,
      );

      for (const service of categoryServices) {
        const image = screen.getByRole("img", { name: service.imageAlt });
        expect(image).toHaveAttribute(
          "src",
          expect.stringContaining(service.id),
        );
      }
    }
  });

  it("selects a service and stores its ID for the next step", () => {
    render(<ServiceGallery />);
    fireEvent.click(
      screen.getAllByRole("button", { name: copy.selectService })[0],
    );

    expect(
      screen.getByRole("button", { name: copy.selectedService }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(getSelectedServiceId(window.sessionStorage)).toBe(
      sampleServices[0].id,
    );
    expect(window.sessionStorage.getItem(selectedServiceStorageKey)).toBe(
      sampleServices[0].id,
    );
  });

  it("supports selecting a service with the keyboard", async () => {
    const user = userEvent.setup();
    render(<ServiceGallery />);
    const selectButton = screen.getAllByRole("button", {
      name: copy.selectService,
    })[0];
    selectButton.focus();
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", { name: copy.selectedService }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("shows an empty-category message", () => {
    render(
      <ServiceGallery
        catalog={sampleServices.filter(
          (service) => service.category !== "engagement",
        )}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /^Engagement/ }));

    expect(screen.getByRole("status")).toHaveTextContent(copy.noServices);
  });

  it("shows an empty-catalog message", () => {
    render(<ServiceGallery catalog={[]} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      copy.noCatalogServices,
    );
  });

  it("shows loading and error states", () => {
    const { rerender } = render(<ServiceGallery status="loading" />);
    expect(screen.getByRole("status")).toHaveTextContent(copy.loading);

    rerender(<ServiceGallery status="error" />);
    expect(screen.getByRole("alert")).toHaveTextContent(copy.error);
  });
});
