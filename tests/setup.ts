import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

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

Object.defineProperty(global.navigator, "geolocation", {
  value: {
    getCurrentPosition: vi.fn().mockImplementation((success) => {
      success({
        coords: {
          latitude: 0,
          longitude: 0,
        },
      });
    }),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  },
});

afterEach(() => {
  cleanup();
});
