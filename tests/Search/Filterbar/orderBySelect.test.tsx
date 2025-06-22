// libs
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { SearchRoute } from "../../../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "../../utils/fakeFetchLoggedIn";

describe("Filterbar", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn(fakeFetchLoggedIn);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Order By dropdown changes the sort order", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>{SearchRoute}</Routes>
      </MemoryRouter>
    );

    const orderBySelect: HTMLButtonElement = await screen.findByTestId(
      "order-by-button"
    );

    // Act
    await waitFor(async () => {
      await user.click(orderBySelect);
    });
    const descOption = await screen.findByText("Descending");
    await user.click(descOption);

    // Assert
    await screen.findByText("Descending");
    await screen.findByText("2 Dogs Found");
    const dogCardBreeds: HTMLHeadingElement[] = await screen.findAllByTestId(
      "dog-card-breed"
    );
    expect(dogCardBreeds[0].textContent?.includes("Airedale")).toBe(true);
    expect(dogCardBreeds[1].textContent?.includes("Basenji")).toBe(true);
  });
});
