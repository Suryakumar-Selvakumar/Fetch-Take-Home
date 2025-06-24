// libs
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { FavoritesRoute } from "../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "./utils/fakeFetchLoggedIn";
import { afterEach } from "node:test";

describe("Favorites", () => {
  describe("Cards", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      user = userEvent.setup();
      global.fetch = vi.fn(fakeFetchLoggedIn);
      localStorage.setItem("favorites", JSON.stringify(["1", "2"]));
    });

    afterEach(() => {
      localStorage.clear();
    });

    it("Favorite button removes the dog from favorites", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>{FavoritesRoute}</Routes>
        </MemoryRouter>
      );
      const favoriteButtons: HTMLButtonElement[] = await screen.findAllByTestId(
        "favorite-button"
      );
      const favBtnTwo = favoriteButtons[1];

      // Act
      await screen.findByText("2 Dogs Favorited");
      await user.click(favBtnTwo);

      // Assert
      await screen.findByText("1 Dogs Favorited");
      const dogCardBreed: HTMLHeadingElement = await screen.findByTestId(
        "dog-card-breed"
      );
      expect(dogCardBreed.textContent?.includes("Breed 1")).toBe(true);
    });
  });

  describe("Pagination", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      user = userEvent.setup();
      global.fetch = vi.fn(fakeFetchLoggedIn);
      localStorage.setItem(
        "favorites",
        JSON.stringify([
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ])
      );
    });

    afterEach(() => {
      localStorage.clear();
    });

    it("Next button takes the user to next page", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>{FavoritesRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-favorites-next-button"
      );

      // Act
      await user.click(paginationNextButton);

      // Assert
      const dogCardNames: HTMLHeadingElement[] = await screen.findAllByTestId(
        "dog-card-name"
      );
      expect(dogCardNames[0].textContent?.includes("Name 11")).toBe(true);
      expect(dogCardNames[1].textContent?.includes("Name 12")).toBe(true);
    });

    it("Next page button takes the user to next page", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>{FavoritesRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextPage: HTMLAnchorElement = await screen.findByTestId(
        "pagination-favorites-next-page"
      );

      // Act
      await user.click(paginationNextPage);

      // Assert
      const dogCardNames: HTMLHeadingElement[] = await screen.findAllByTestId(
        "dog-card-name"
      );
      expect(dogCardNames[0].textContent?.includes("Name 11")).toBe(true);
      expect(dogCardNames[1].textContent?.includes("Name 12")).toBe(true);
    });

    it("Previous button takes the user to previous page", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>{FavoritesRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-favorites-next-button"
      );
      const paginationPrevButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-favorites-prev-button"
      );

      // Act
      await user.click(paginationNextButton);
      const dogCardNames: HTMLHeadingElement[] = await screen.findAllByTestId(
        "dog-card-name"
      );
      expect(dogCardNames[0].textContent?.includes("Name 11")).toBe(true);
      expect(dogCardNames[1].textContent?.includes("Name 12")).toBe(true);
      await user.click(paginationPrevButton);

      // Assert
      const dogCardPrevNames: HTMLHeadingElement[] =
        await screen.findAllByTestId("dog-card-name");
      expect(dogCardPrevNames[0].textContent?.includes("Name 2")).toBe(true);
      expect(dogCardPrevNames[1].textContent?.includes("Name 3")).toBe(true);
    });

    it("Previous page button takes the user to previous page", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>{FavoritesRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-favorites-next-button"
      );

      // Act
      await user.click(paginationNextButton);
      const dogCardNames: HTMLHeadingElement[] = await screen.findAllByTestId(
        "dog-card-name"
      );
      expect(dogCardNames[0].textContent?.includes("Name 11")).toBe(true);
      expect(dogCardNames[1].textContent?.includes("Name 12")).toBe(true);
      const paginationPrevPage: HTMLAnchorElement = await screen.findByTestId(
        "pagination-favorites-prev-page"
      );
      await user.click(paginationPrevPage);

      // Assert
      const dogCardPrevNames: HTMLHeadingElement[] =
        await screen.findAllByTestId("dog-card-name");
      expect(dogCardPrevNames[0].textContent?.includes("Name 2")).toBe(true);
      expect(dogCardPrevNames[1].textContent?.includes("Name 3")).toBe(true);
    });
  });

  describe("Modal", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      user = userEvent.setup();

      global.fetch = vi.fn(fakeFetchLoggedIn);

      localStorage.setItem("favorites", JSON.stringify(["1", "2"]));

      class IntersectionObserverMock implements IntersectionObserver {
        readonly root: Element | null = null;
        readonly rootMargin: string = "";
        readonly thresholds: ReadonlyArray<number> = [];

        constructor(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _callback: IntersectionObserverCallback,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _options?: IntersectionObserverInit
        ) {}

        disconnect(): void {}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        observe(_target: Element): void {}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        unobserve(_target: Element): void {}
        takeRecords(): IntersectionObserverEntry[] {
          return [];
        }
      }
      global.IntersectionObserver = IntersectionObserverMock;

      vi.mock("canvas-confetti", () => ({
        __esModule: true,
        default: vi.fn(() => {}),
      }));
    });

    afterEach(() => {
      localStorage.clear();
    });

    it("Displays the matched dog's details", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>{FavoritesRoute}</Routes>
        </MemoryRouter>
      );
      const generateMatchButton: HTMLButtonElement = await screen.findByTestId(
        "generate-match-button"
      );

      // Act
      await screen.findByText("2 Dogs Favorited");
      await user.click(generateMatchButton);

      // Assert
      await screen.findByText("You matched with");
      await screen.findByText(
        "Meet Dog 1, a 10 year old Breed 1 located in City 1, State 1, 1. Currently 50 miles away from you, this dog could be the perfect match to bring joy and companionship into your life."
      );
    });

    it("Close button closes the modal", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>{FavoritesRoute}</Routes>
        </MemoryRouter>
      );
      const generateMatchButton: HTMLButtonElement = await screen.findByTestId(
        "generate-match-button"
      );

      // Act
      await screen.findByText("2 Dogs Favorited");
      await user.click(generateMatchButton);
      const dogPara: HTMLParagraphElement = screen.getByTestId("modal-dog-paragraph");
      expect(dogPara).toHaveTextContent(
        "Meet Dog 1, a 10 year old Breed 1 located in City 1, State 1, 1. Currently 50 miles away from you, this dog could be the perfect match to bring joy and companionship into your life."
      );
      const modalCloseButton: HTMLButtonElement =
        screen.getByTestId("modal-close-button");
      await user.click(modalCloseButton);

      // Assert
      await waitFor(() => {
        expect(screen.queryByTestId("modal-dog-paragraph")).not.toBeInTheDocument();
      });
    });
  });
});
