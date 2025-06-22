// libs
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

// components
import { SearchRoute } from "../../../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "../../utils/fakeFetchLoggedIn";

describe("Sidebar", () => {
  beforeEach(() => {
    global.fetch = vi.fn(fakeFetchLoggedIn);
  });

  it("Max Age slider applies maximum age to filters", async () => {
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

    // Assert
    await screen.findByText("2 Dogs Found");
    await expect(ageMax).toHaveTextContent("14");
    const dogCardBreeds: HTMLHeadingElement[] = await screen.findAllByTestId(
      "dog-card-breed"
    );
    expect(dogCardBreeds[0].textContent?.includes("Breed 9")).toBe(true);
    expect(dogCardBreeds[1].textContent?.includes("Breed 10")).toBe(true);
  });
});
