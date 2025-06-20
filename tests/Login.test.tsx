// libs
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, vi, Mock, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { HomeRoute, LoginRoute, SearchRoute } from "../src/utils/Pages";
import setFakeUserZip from "./utils/setFakeUserZip";
import setFakeBreeds from "./utils/setFakeBreeds";
import handleFakeLogin from "./utils/handleFakeLogin";
import setFakeDogIds from "./utils/setFakeDogIds";
import { setFakeDogs, setFakeLocations } from "./utils/setFakeDogsData";

describe("Login", () => {
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
    beforeEach(() => {
      (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(false));
      (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(false));
    });

    it("Form login button logs in the user", async () => {
      // Arrange
      (fetch as Mock).mockResolvedValueOnce(handleFakeLogin());
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            {HomeRoute}
            {LoginRoute}
          </Routes>
        </MemoryRouter>
      );
      const loginNavButton = screen.getAllByTestId("login-nav");

      // Act
      await user.click(loginNavButton[0]);
      await screen.findByText("Name");
      const loginFormButton = screen.getByTestId("login-form");
      const nameInput = screen.getByTestId("name-input") as HTMLInputElement;
      const emailInput = screen.getByTestId("email-input") as HTMLInputElement;

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
      (fetch as Mock).mockResolvedValueOnce(setFakeUserZip(true));
      (fetch as Mock).mockResolvedValueOnce(setFakeBreeds(true));
    });

    it("'Browse our catalog of dogs' takes user to Search page", async () => {
      // Arrange
      (fetch as Mock).mockResolvedValueOnce(setFakeDogIds());
      (fetch as Mock).mockResolvedValueOnce(setFakeDogs());
      (fetch as Mock).mockResolvedValueOnce(setFakeLocations());
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            {LoginRoute}
            {SearchRoute}
          </Routes>
        </MemoryRouter>
      );
      const browseButton = await screen.findByText(
        "Browse our catalog of dogs"
      );

      // Act
      await user.click(browseButton);

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
      const logoutButton = await screen.findByTestId("logout-button");

      // Act
      await user.click(logoutButton);

      // Assert
      await waitFor(() => screen.findByText("Logout Successful"), {
        timeout: 1550,
      });
    });
  });
});
