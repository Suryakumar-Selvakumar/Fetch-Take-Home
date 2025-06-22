// libs
import { render, screen} from "@testing-library/react";
import { beforeEach, describe, it, vi, expect } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// components
import { SearchRoute } from "../../../src/utils/Pages";

// utils
import fakeFetchLoggedIn from "../../utils/fakeFetchLoggedIn";

describe("Cards", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    global.fetch = vi.fn(fakeFetchLoggedIn);
  });

  it("Hovering on address displays the distance in miles", async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>{SearchRoute}</Routes>
      </MemoryRouter>
    );
    const dogCardAddresses: HTMLDivElement[] = await screen.findAllByTestId(
      "dog-card-address"
    );
    const dogOneAddress = dogCardAddresses[0];

    // Act
    await user.hover(dogOneAddress);

    // Assert
    const tooltips: HTMLDivElement[] = await screen.findAllByTestId(
      "distance-tooltip"
    );
    expect(tooltips[0]).toHaveTextContent("50 miles away");
  });
});
