// libs
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { HomeRoute, LoginRoute, SearchRoute } from "../src/utils/Pages";
import fakeFetchLoggedOut from "./utils/fakeFetchLoggedOut";
import fakeFetchLoggedIn from "./utils/fakeFetchLoggedIn";

describe("Login", () => {
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

    it("Form login button logs in the user", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            {HomeRoute}
            {LoginRoute}
          </Routes>
        </MemoryRouter>
      );
      const loginNavButton: HTMLLIElement[] =
        screen.getAllByTestId("login-nav");

      // Act
      await user.click(loginNavButton[0]);
      await screen.findByText("Name");
      const loginFormButton: HTMLButtonElement =
        screen.getByTestId("login-form");
      const nameInput: HTMLInputElement = screen.getByTestId("name-input");
      const emailInput: HTMLInputElement = screen.getByTestId("email-input");

      await user.type(nameInput, "abc");
      await user.type(emailInput, "abc@example.com");
      await expect(nameInput).toHaveValue("abc");
      await expect(emailInput).toHaveValue("abc@example.com");
      await user.click(loginFormButton);

      // Assert
      await screen.findByText("Login Successful");
    });
  });

  describe("Logged In", () => {
    beforeEach(() => {
      global.fetch = vi.fn(fakeFetchLoggedIn);
    });

    it("'Browse our catalog of dogs' takes user to Search page", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            {LoginRoute}
            {SearchRoute}
          </Routes>
        </MemoryRouter>
      );
      const browseLink: HTMLAnchorElement = await screen.findByText(
        "Browse our catalog of dogs"
      );

      // Act
      await user.click(browseLink);

      // Assert
      await screen.findByText("2 Dogs Found");
    });

    it("Logout logs out the user", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            {LoginRoute}
            {HomeRoute}
          </Routes>
        </MemoryRouter>
      );
      const logoutButton: HTMLButtonElement = await screen.findByTestId(
        "logout-button"
      );

      // Act
      await user.click(logoutButton);

      // Assert
      await waitFor(() => screen.findByText("Logout Successful"), {
        timeout: 1550,
      });
    });
  });
});
