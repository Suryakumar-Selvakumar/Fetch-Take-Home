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

  it("Search input adds the input as a filter", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>{SearchRoute}</Routes>
      </MemoryRouter>
    );

    const searchInput: HTMLInputElement = screen.getByTestId("search-input");
    const searchButton: HTMLButtonElement = screen.getByTestId("search-button");

    // Act
    await user.type(searchInput, "90210");
    await expect(searchInput).toHaveValue("90210");
    await user.click(searchButton);

    // Assert
    await screen.findByText("90210");
    await waitFor(() => {
      const addressEls = screen.getAllByTestId("dog-card-address");
      expect(addressEls.length).toBeGreaterThan(0);
      expect(addressEls[0].textContent).toContain("90210");
    });
  });
});
