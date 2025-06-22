// libs
import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, vi, Mock } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import {
  FavoritesRoute,
  HomeRoute,
  LoginRoute,
  SearchRoute,
} from "../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "./utils/fakeFetchLoggedIn";
import fakeFetchLoggedOut from "./utils/fakeFetchLoggedOut";

describe("Home", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();

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
    beforeEach(() => {
      global.fetch = vi.fn(fakeFetchLoggedOut);
    });

    describe("Navbar", () => {
      it("Search asks for login", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{HomeRoute}</Routes>
          </MemoryRouter>
        );
        const searchItems: HTMLLIElement[] =
          screen.getAllByTestId("search-nav");

        // Act
        await waitFor(async () => {
          await user.click(searchItems[0]);
        });

        // Assert
        await screen.findByText("Please login to access the catalog");
      });

      it("Favorites asks for login", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{HomeRoute}</Routes>
          </MemoryRouter>
        );

        // Act
        const favoritesItems: HTMLLIElement[] =
          screen.getAllByTestId("favorites-nav");

        await waitFor(async () => {
          await user.click(favoritesItems[0]);
        });

        // Assert
        await screen.findByText("Please login to access your favorites");
      });

      it("Login takes user to Login page", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              {HomeRoute}
              {LoginRoute}
            </Routes>
          </MemoryRouter>
        );
        const loginItems: HTMLLIElement[] = screen.getAllByTestId("login-nav");

        // Act
        await waitFor(async () => {
          user.click(loginItems[0]);
        });

        // Assert
        await screen.findByText("Login to access our catalog");
      });

      it("Logo brings user back to the Home page", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              {HomeRoute}
              {LoginRoute}
            </Routes>
          </MemoryRouter>
        );
        const logo: HTMLAnchorElement = screen.getByTestId("logo-nav");

        // Act
        user.click(logo);

        // Assert
        await screen.findByText("Find your new best friend");
      });

      it("Home brings user back to the Home page", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              {HomeRoute}
              {LoginRoute}
            </Routes>
          </MemoryRouter>
        );
        const homeItems: HTMLLIElement[] = screen.getAllByTestId("home-nav");

        // Act
        user.click(homeItems[0]);

        // Assert
        await screen.findByText("Find your new best friend");
      });
    });

    describe("HoverCard", () => {
      it("Dog cards ask for login", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{HomeRoute}</Routes>
          </MemoryRouter>
        );
        const hoverCards: HTMLDivElement[] =
          screen.getAllByTestId("hover-card");

        // Act
        user.click(hoverCards[0]);

        // Assert
        await screen.findByText("Please login to access the catalog");
      });
    });
  });

  describe("Logged In", () => {
    beforeEach(() => {
      global.fetch = vi.fn(fakeFetchLoggedIn);
    });

    describe("Navbar", () => {
      it("Search takes user to Search page", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              {HomeRoute}
              {SearchRoute}
            </Routes>
          </MemoryRouter>
        );
        const searchItems: HTMLLIElement[] =
          screen.getAllByTestId("search-nav");

        // Act
        await waitFor(async () => {
          user.click(searchItems[0]);
        });

        // Assert
        await screen.findByText("18 Dogs Found");
      });

      it("Favorites takes user to Favorites page", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              {HomeRoute}
              {FavoritesRoute}
            </Routes>
          </MemoryRouter>
        );
        const favoritesItems: HTMLLIElement[] =
          screen.getAllByTestId("favorites-nav");

        // Act
        await waitFor(async () => {
          user.click(favoritesItems[0]);
        });

        // Assert
        await screen.findByText("0 Dogs Favorited");
      });

      it("Logout logs out the user", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Routes>{HomeRoute}</Routes>
          </MemoryRouter>
        );
        const [logoutItem]: HTMLLIElement[] = await screen.findAllByTestId(
          "logout-nav"
        );

        // Act
        await waitFor(async () => {
          await user.click(logoutItem);
        });

        // Assert
        await waitFor(() => screen.findByText("Logout Successful"), {
          timeout: 1750,
        });
      });
    });

    describe("HoverCard", () => {
      it("Dog card adds its breed as a filter in search page", async () => {
        // Arrange
        render(
          <MemoryRouter>
            <Routes>
              {HomeRoute}
              {SearchRoute}
            </Routes>
          </MemoryRouter>
        );

        // Act
        const hoverCards: HTMLDivElement[] =
          screen.getAllByTestId("hover-card");

        // Act
        await waitFor(async () => {
          await user.click(hoverCards[0]);
        });

        // Assert
        await screen.findByText("Toy Poodle");
      });
    });
  });
});
