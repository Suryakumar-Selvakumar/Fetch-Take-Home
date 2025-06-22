// libs
import { render, screen } from "@testing-library/react";
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
});
