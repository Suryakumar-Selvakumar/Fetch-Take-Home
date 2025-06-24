// libs
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
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
      await user.click(searchButton);

      // Assert
      await screen.findByText("90210");
      await waitFor(() => {
        const addressEls: HTMLDivElement[] =
          screen.getAllByTestId("dog-card-address");
        expect(addressEls.length).toBeGreaterThan(0);
        expect(addressEls[0].textContent).toContain("90210");
      });
    });

    it("Sort By dropdown changes the sorting criteria", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );

      const sortBySelect: HTMLButtonElement = await screen.findByTestId(
        "sort-by-button"
      );

      // Act
      await user.click(sortBySelect);
      await screen.findByText("Name");
      const nameOption = await screen.findByText("Name");
      await user.click(nameOption);

      // Assert
      await screen.findByText("Name");
      await screen.findByText("2 Dogs Found");

      const dogCardNames: HTMLHeadingElement[] = await screen.findAllByTestId(
        "dog-card-name"
      );
      expect(dogCardNames[0].textContent?.includes("Andy")).toBe(true);
      expect(dogCardNames[1].textContent?.includes("Barbie")).toBe(true);
    });

    it("Order By dropdown changes the sorting order", async () => {
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
      const dogCardBreeds: HTMLSpanElement[] = await screen.findAllByTestId(
        "dog-card-breed"
      );
      expect(dogCardBreeds[0].textContent?.includes("Basenji")).toBe(true);
      expect(dogCardBreeds[1].textContent?.includes("Airedale")).toBe(true);
    });
  });

  describe("Sidebar", () => {
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

    it("Max Age slider applies maximum age to filters", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );

      const sliders: HTMLSpanElement[] = await screen.findAllByRole("slider");
      const maxAgeSlider: HTMLSpanElement = sliders[1];
      const ageMax: HTMLSpanElement = screen.getByTestId("age-max");

      // Act
      await fireEvent.keyDown(maxAgeSlider, { key: "ArrowLeft" });

      // Assert
      await screen.findByText("2 Dogs Found");
      await expect(ageMax).toHaveTextContent("14");
      const dogCardBreeds: HTMLHeadingElement[] = await screen.findAllByTestId(
        "dog-card-breed"
      );
      expect(dogCardBreeds[0].textContent?.includes("Breed 9")).toBe(true);
      expect(dogCardBreeds[1].textContent?.includes("Breed 10")).toBe(true);
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

  describe("Filters", () => {
    it("Filter X button removes the filter", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );

      const sliders: HTMLSpanElement[] = await screen.findAllByRole("slider");
      const maxAgeSlider: HTMLSpanElement = sliders[1];
      const ageMax: HTMLSpanElement = screen.getByTestId("age-max");

      // Act
      await fireEvent.keyDown(maxAgeSlider, { key: "ArrowLeft" });
      await screen.findByText("2 Dogs Found");
      await expect(ageMax).toHaveTextContent("14");
      const filterText: HTMLSpanElement = await screen.findByTestId(
        "filter-text"
      );
      await expect(filterText).toHaveTextContent("Max Age: 14");
      const filterX: HTMLButtonElement = screen.getByTestId("filter-close");
      await user.click(filterX);

      // Assert
      await expect(filterText).not.toBeInTheDocument();
      await expect(ageMax).toHaveTextContent("Any");
    });

    it("Clear all button clears all the filters", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );

      const sliders: HTMLSpanElement[] = await screen.findAllByRole("slider");
      const minAgeSlider: HTMLSpanElement = sliders[0];
      const maxAgeSlider: HTMLSpanElement = sliders[1];
      const ageMin: HTMLSpanElement = screen.getByTestId("age-min");
      const ageMax: HTMLSpanElement = screen.getByTestId("age-max");

      // Act
      await fireEvent.keyDown(minAgeSlider, { key: "ArrowRight" });
      await fireEvent.keyDown(maxAgeSlider, { key: "ArrowLeft" });
      await screen.findByText("2 Dogs Found");
      await expect(ageMin).toHaveTextContent("1");
      await expect(ageMax).toHaveTextContent("14");
      const filters: HTMLSpanElement[] = await screen.findAllByTestId(
        "filter-text"
      );
      await expect(filters[0]).toHaveTextContent("Min Age: 1");
      await expect(filters[1]).toHaveTextContent("Max Age: 14");
      const clearAllButton: HTMLLIElement =
        screen.getByTestId("clear-all-button");
      await user.click(clearAllButton);

      // Assert
      await expect(filters[0]).not.toBeInTheDocument();
      await expect(filters[1]).not.toBeInTheDocument();
      await expect(ageMin).toHaveTextContent("Any");
      await expect(ageMax).toHaveTextContent("Any");
    });
  });

  describe("Pagination", () => {
    it("Next button takes the user to next page", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-search-next-button"
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
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextPage: HTMLAnchorElement = await screen.findByTestId(
        "pagination-search-next-page"
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
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-search-next-button"
      );
      const paginationPrevButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-search-prev-button"
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
      expect(dogCardPrevNames[0].textContent?.includes("Dog 1")).toBe(true);
      expect(dogCardPrevNames[1].textContent?.includes("Dog 2")).toBe(true);
    });

    it("Previous page button takes the user to previous page", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );
      const paginationNextButton: HTMLAnchorElement = await screen.findByTestId(
        "pagination-search-next-button"
      );

      // Act
      await user.click(paginationNextButton);
      const dogCardNames: HTMLHeadingElement[] = await screen.findAllByTestId(
        "dog-card-name"
      );
      expect(dogCardNames[0].textContent?.includes("Name 11")).toBe(true);
      expect(dogCardNames[1].textContent?.includes("Name 12")).toBe(true);
      const paginationPrevPage: HTMLAnchorElement = await screen.findByTestId(
        "pagination-search-prev-page"
      );
      await user.click(paginationPrevPage);

      // Assert
      const dogCardPrevNames: HTMLHeadingElement[] =
        await screen.findAllByTestId("dog-card-name");
      expect(dogCardPrevNames[0].textContent?.includes("Dog 1")).toBe(true);
      expect(dogCardPrevNames[1].textContent?.includes("Dog 2")).toBe(true);
    });
  });

  describe("Cards", () => {
    it("Favorite button adds the dog to favorites", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>
            {SearchRoute}
            {FavoritesRoute}
          </Routes>
        </MemoryRouter>
      );
      const [favoriteButton]: HTMLButtonElement[] =
        await screen.findAllByTestId("favorite-button");

      // Act
      await user.click(favoriteButton);
      const favoritesItems: HTMLLIElement[] =
        screen.getAllByTestId("favorites-nav");
      await waitFor(async () => {
        user.click(favoritesItems[0]);
      });

      // Assert
      await screen.findByText("1 Dogs Favorited");
      const dogCardBreed: HTMLHeadingElement = await screen.findByTestId(
        "dog-card-breed"
      );
      expect(dogCardBreed.textContent?.includes("Breed 1")).toBe(true);
    });

    it("Favorite button removes the dog from favorites", async () => {
      // Arrange
      localStorage.setItem("favorites", JSON.stringify(["1"]));
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>
            {SearchRoute}
            {FavoritesRoute}
          </Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("1 Dogs Favorited");
      const dogCardBreed: HTMLHeadingElement = await screen.findByTestId(
        "dog-card-breed"
      );
      expect(dogCardBreed.textContent?.includes("Breed 1")).toBe(true);
      const searchItems: HTMLLIElement[] = screen.getAllByTestId("search-nav");
      await waitFor(async () => {
        user.click(searchItems[0]);
      });
      const [favoriteButton]: HTMLButtonElement[] =
        await screen.findAllByTestId("favorite-button");
      await user.click(favoriteButton);
      await waitFor(async () => {
        user.click(screen.getAllByTestId("favorites-nav")[0]);
      });

      // Assert
      await screen.findByText("0 Dogs Favorited");
    });

    it("Dog image opens the Dog modal", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByRole("status");
      const img = await screen.getAllByTestId<HTMLImageElement>(
        "dog-card-image"
      )[0];
      fireEvent.load(img);
      await user.click(img);

      // Assert
      await screen.findByText("Age (yrs):");
      await screen.findByText("Latitude:");
      await screen.findByText("42.000");
      await screen.findByText("72.000");
      await screen.findByText("50.00");
    });

    it("Dog name opens the Dog modal", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByRole("status");
      const dogNames: HTMLButtonElement[] = await screen.findAllByTestId(
        "dog-card-name"
      );
      const img = await screen.getAllByTestId<HTMLImageElement>(
        "dog-card-image"
      )[0];
      fireEvent.load(img);
      await user.click(dogNames[0]);

      // Assert
      await screen.findByText("Age (yrs):");
      await screen.findByText("Latitude:");
      await screen.findByText("42.000");
      await screen.findByText("72.000");
      await screen.findByText("50.00");
    });
  });

  describe("Modal", () => {
    it("Favorite button adds the dog to favorites", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>
            {SearchRoute}
            {FavoritesRoute}
          </Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByRole("status");
      const img = await screen.getAllByTestId<HTMLImageElement>(
        "dog-card-image"
      )[0];
      fireEvent.load(img);
      await user.click(img);
      const modalDogName = screen.getByTestId("modal-dog-name");
      expect(modalDogName).toHaveTextContent("Dog 1");
      const modalFavoriteButton: HTMLButtonElement = await screen.findByTestId(
        "modal-favorite-button"
      );
      await user.click(modalFavoriteButton);
      const closeModalButton: HTMLButtonElement = await screen.findByTestId(
        "modal-close-button"
      );
      await user.click(closeModalButton);
      await waitFor(() => {
        expect(screen.queryByTestId("modal-dog-name")).not.toBeInTheDocument();
      });
      const favoritesItems: HTMLLIElement[] =
        screen.getAllByTestId("favorites-nav");
      await waitFor(async () => {
        user.click(favoritesItems[0]);
      });

      // Assert
      await screen.findByText("1 Dogs Favorited");
      const dogCardBreed: HTMLHeadingElement = await screen.findByTestId(
        "dog-card-breed"
      );
      expect(dogCardBreed.textContent?.includes("Breed 1")).toBe(true);
    });

    it("Favorite button removes the dog from favorites", async () => {
      // Arrange
      localStorage.setItem("favorites", JSON.stringify(["1"]));
      render(
        <MemoryRouter initialEntries={["/favorites"]}>
          <Routes>
            {SearchRoute}
            {FavoritesRoute}
          </Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("1 Dogs Favorited");
      const dogCardBreed: HTMLHeadingElement = await screen.findByTestId(
        "dog-card-breed"
      );
      expect(dogCardBreed.textContent?.includes("Breed 1")).toBe(true);
      const searchItems: HTMLLIElement[] = screen.getAllByTestId("search-nav");
      await waitFor(async () => {
        user.click(searchItems[0]);
      });
      await screen.findByRole("status");
      const img = await screen.getAllByTestId<HTMLImageElement>(
        "dog-card-image"
      )[0];
      fireEvent.load(img);
      await user.click(img);
      const modalDogName = screen.getByTestId("modal-dog-name");
      expect(modalDogName).toHaveTextContent("Dog 1");
      const modalFavoriteButton: HTMLButtonElement = await screen.findByTestId(
        "modal-favorite-button"
      );
      await user.click(modalFavoriteButton);
      const closeModalButton: HTMLButtonElement = await screen.findByTestId(
        "modal-close-button"
      );
      await user.click(closeModalButton);
      await waitFor(() => {
        expect(screen.queryByTestId("modal-dog-name")).not.toBeInTheDocument();
      });
      await waitFor(async () => {
        user.click(screen.getAllByTestId("favorites-nav")[0]);
      });

      // Assert
      await screen.findByText("0 Dogs Favorited");
    });

    it("Close button closes the modal", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/search"]}>
          <Routes>{SearchRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByRole("status");
      const img = await screen.getAllByTestId<HTMLImageElement>(
        "dog-card-image"
      )[0];
      fireEvent.load(img);
      await user.click(img);
      await screen.findByText("42.000");
      await screen.findByText("72.000");
      await screen.findByText("50.00");
      const modalDogName = screen.getByTestId("modal-dog-name");
      expect(modalDogName).toHaveTextContent("Dog 1");
      const closeModalButton: HTMLButtonElement = await screen.findByTestId(
        "modal-close-button"
      );
      await user.click(closeModalButton);

      // Assert
      await waitFor(() => {
        expect(screen.queryByTestId("modal-dog-name")).not.toBeInTheDocument();
      });
    });
  });
});
