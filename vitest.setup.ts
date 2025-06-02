import "@testing-library/jest-dom";
import { vi } from "vitest";

// mock scrollIntoView to prevent test failures
window.HTMLElement.prototype.scrollIntoView = vi.fn();
