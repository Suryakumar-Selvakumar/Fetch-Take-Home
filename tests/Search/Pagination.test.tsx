// libs
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { SearchRoute } from "../../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "../utils/fakeFetchLoggedIn";

describe("Pagination", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn(fakeFetchLoggedIn);
  });

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
    const dogCardPrevNames: HTMLHeadingElement[] = await screen.findAllByTestId(
      "dog-card-name"
    );
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
    const dogCardPrevNames: HTMLHeadingElement[] = await screen.findAllByTestId(
      "dog-card-name"
    );
    expect(dogCardPrevNames[0].textContent?.includes("Dog 1")).toBe(true);
    expect(dogCardPrevNames[1].textContent?.includes("Dog 2")).toBe(true);
  });
});
