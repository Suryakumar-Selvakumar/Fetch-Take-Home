// libs
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { FavoritesRoute, SearchRoute } from "../../../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "../../utils/fakeFetchLoggedIn";

describe("Cards", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn(fakeFetchLoggedIn);
  });

  it("Favorites button adds the dog to favorites", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>
          {SearchRoute}
          {FavoritesRoute}
        </Routes>
      </MemoryRouter>
    );
    const [favoriteButton]: HTMLDivElement[] = await screen.findAllByTestId(
      "favorite-button"
    );

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
});
