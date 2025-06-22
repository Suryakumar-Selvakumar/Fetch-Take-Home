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

  it("Min Age slider applies minimum age to filters", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>{SearchRoute}</Routes>
      </MemoryRouter>
    );

    const [minAgeSlider]: HTMLSpanElement[] = await screen.findAllByRole(
      "slider"
    );
    const ageMin: HTMLSpanElement = screen.getByTestId("age-min");

    // Act
    await fireEvent.keyDown(minAgeSlider, { key: "ArrowRight" });

    // Assert
    await screen.findByText("2 Dogs Found");
    await expect(ageMin).toHaveTextContent("1");
    const dogCardBreeds: HTMLHeadingElement[] = await screen.findAllByTestId(
      "dog-card-breed"
    );
    expect(dogCardBreeds[0].textContent?.includes("Breed 7")).toBe(true);
    expect(dogCardBreeds[1].textContent?.includes("Breed 8")).toBe(true);
  });
});
