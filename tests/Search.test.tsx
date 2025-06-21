// libs
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { FavoritesRoute, SearchRoute } from "../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "./utils/fakeFetchLoggedIn";

describe("Search", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn(fakeFetchLoggedIn);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Filterbar", () => {
    it("Search input adds the input as a filter", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );
      const searchInput: HTMLInputElement = screen.getByTestId("search-input");
      const searchButton: HTMLButtonElement =
        screen.getByTestId("search-button");

      // Act
      await user.type(searchInput, "90210");
      await expect(searchInput).toHaveValue("90210");
      user.click(searchButton);

      // Assert
      await screen.findByText("90210");
    });
  });
});
