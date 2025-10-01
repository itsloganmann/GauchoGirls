import { describe, it, expect } from "vitest";
import { toSlug } from "./slug";

describe("toSlug", () => {
  it("converts spaces to hyphens", () => {
    expect(toSlug("Jane Doe")).toBe("jane-doe");
  });

  it("handles multiple spaces", () => {
    expect(toSlug("Jane   Marie   Doe")).toBe("jane-marie-doe");
  });

  it("removes special characters", () => {
    expect(toSlug("Jane @#$ Doe!")).toBe("jane-doe");
  });

  it("handles leading/trailing spaces", () => {
    expect(toSlug("  Jane Doe  ")).toBe("jane-doe");
  });

  it("preserves unicode characters", () => {
    expect(toSlug("María García")).toBe("maría-garcía");
  });

  it("handles empty string", () => {
    expect(toSlug("")).toBe("");
  });

  it("handles only special characters", () => {
    expect(toSlug("@#$%^&*()")).toBe("");
  });
});
