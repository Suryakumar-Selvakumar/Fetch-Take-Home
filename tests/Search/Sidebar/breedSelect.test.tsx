// libs
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { SearchRoute } from "../../../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "../../utils/fakeFetchLoggedIn";

describe("Sidebar", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn(fakeFetchLoggedIn);
  });

  it("Breed dropdown adds selected breed to filters", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>{SearchRoute}</Routes>
      </MemoryRouter>
    );

    const breedSelect: HTMLButtonElement = await screen.findByTestId(
      "breed-button"
    );

    // Act
    await waitFor(async () => {
      await user.click(breedSelect);
    });
    const breedOptionOne = await screen.findByText("Breed 1");
    const breedOptionTwo = await screen.findByText("Breed 1");
    await user.click(breedOptionOne);
    await user.click(breedOptionTwo);

    // Assert
    const dogCardBreeds: HTMLHeadingElement[] = await screen.findAllByTestId(
      "dog-card-breed"
    );
    expect(dogCardBreeds[0].textContent?.includes("Breed 1")).toBe(true);
    expect(dogCardBreeds[1].textContent?.includes("Breed 2")).toBe(true);
  });
});
