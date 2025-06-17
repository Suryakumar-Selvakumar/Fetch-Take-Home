// libs
import { findByText, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import { HomeRoute, LoginRoute } from "../src/utils/Pages";

// utils
import setFakeUserZip from "./utils/setFakeUserZip";
import setFakeBreeds from "./utils/setFakeBreeds";

describe("Home", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn();
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

  describe("Logged Out", () => {
    beforeEach(() => {});

    describe("Navbar", () => {
      it("Search asks for login", async () => {
        // Arrange
        (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(false));
        (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(false));
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{HomeRoute}</Routes>
          </MemoryRouter>
        );
        const searchItems: HTMLElement[] = screen.getAllByTestId("search-nav");

        // Act
        user.click(searchItems[0]);

        // Assert
        await screen.findByText("Please login to access the catalog");
      });

      it("Favorites asks for login", async () => {
        // Arrange
        (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(false));
        (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(false));
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{HomeRoute}</Routes>
          </MemoryRouter>
        );

        // Act
        const favoritesItems: HTMLElement[] =
          screen.getAllByTestId("favorites-nav");
        user.click(favoritesItems[0]);

        // Assert
        await screen.findByText("Please login to access the catalog");
      });

      it("Login takes user to login page", async () => {
        // Arrange
        (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(false));
        (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(false));
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              {HomeRoute}
              {LoginRoute}
            </Routes>
          </MemoryRouter>
        );

        // Act
        const loginItems: HTMLElement[] = screen.getAllByTestId("login-nav");
        user.click(loginItems[0]);

        // Assert
        await screen.findByText("Login to access our catalog");
      });

      it("Logo brings user back to the Home page", async () => {
        // Arrange
        (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(false));
        (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(false));
        render(
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              {HomeRoute}
              {LoginRoute}
            </Routes>
          </MemoryRouter>
        );

        // Act
        const logo: HTMLElement = screen.getByTestId("logo-nav");
        user.click(logo);

        await screen.findByText("Find your new best friend");
      });

      it("Home brings user back to the Home page", async () => {
        // Arrange
        (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(false));
        (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(false));
        render(
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              {HomeRoute}
              {LoginRoute}
            </Routes>
          </MemoryRouter>
        );

        // Act
        const homeItems: HTMLElement[] = screen.getAllByTestId("home-nav");
        user.click(homeItems[0]);

        await screen.findByText("Find your new best friend");
      });
    });

    describe("HoverCard", () => {
      it("Dog cards ask for login", async () => {
        // Arrange
        (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(false));
        (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(false));
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{HomeRoute}</Routes>
          </MemoryRouter>
        );

        // Act
        const hoverCards: HTMLElement[] = screen.getAllByTestId("hover-card");
        user.click(hoverCards[0]);

        // Assert
        await screen.findByText("Please login to access the catalog");
      });
    });
  });
});
