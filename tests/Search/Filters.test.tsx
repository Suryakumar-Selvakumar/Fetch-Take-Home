// libs
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { SearchRoute } from "../../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "../utils/fakeFetchLoggedIn";

describe("Filters", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn(fakeFetchLoggedIn);
  });

  it("Filter X button removes the filter", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>{SearchRoute}</Routes>
      </MemoryRouter>
    );

    const sliders: HTMLSpanElement[] = await screen.findAllByRole("slider");
    const maxAgeSlider: HTMLSpanElement = sliders[1];
    const ageMax: HTMLSpanElement = screen.getByTestId("age-max");

    // Act
    await fireEvent.keyDown(maxAgeSlider, { key: "ArrowLeft" });
    await screen.findByText("2 Dogs Found");
    await expect(ageMax).toHaveTextContent("14");
    const filterText: HTMLSpanElement = await screen.findByTestId(
      "filter-text"
    );
    await expect(filterText).toHaveTextContent("Max Age: 14");
    const filterX: HTMLButtonElement = screen.getByTestId("filter-close");
    await user.click(filterX);

    // Assert
    await expect(filterText).not.toBeInTheDocument();
    await expect(ageMax).toHaveTextContent("Any");
  });

  it("Clear all button clears all the filters", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>{SearchRoute}</Routes>
      </MemoryRouter>
    );

    const sliders: HTMLSpanElement[] = await screen.findAllByRole("slider");
    const minAgeSlider: HTMLSpanElement = sliders[0];
    const maxAgeSlider: HTMLSpanElement = sliders[1];
    const ageMin: HTMLSpanElement = screen.getByTestId("age-min");
    const ageMax: HTMLSpanElement = screen.getByTestId("age-max");

    // Act
    await fireEvent.keyDown(minAgeSlider, { key: "ArrowRight" });
    await fireEvent.keyDown(maxAgeSlider, { key: "ArrowLeft" });
    await screen.findByText("2 Dogs Found");
    await expect(ageMin).toHaveTextContent("1");
    await expect(ageMax).toHaveTextContent("14");
    const filters: HTMLSpanElement[] = await screen.findAllByTestId(
      "filter-text"
    );
    await expect(filters[0]).toHaveTextContent("Min Age: 1");
    await expect(filters[1]).toHaveTextContent("Max Age: 14");
    const clearAllButton: HTMLLIElement =
      screen.getByTestId("clear-all-button");
    await user.click(clearAllButton);

    // Assert
    await expect(filters[0]).not.toBeInTheDocument();
    await expect(filters[1]).not.toBeInTheDocument();
    await expect(ageMin).toHaveTextContent("Any");
    await expect(ageMax).toHaveTextContent("Any");
  });
});
