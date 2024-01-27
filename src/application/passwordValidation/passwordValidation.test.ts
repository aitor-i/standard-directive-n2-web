import { describe, it, expect } from "vitest";
import { passwordValidation } from "./passwordValidation";

describe("password validation", () => {
  it("should return valid for a strong password", () => {
    const result = passwordValidation("StrongPass123") as {
      valid: boolean;
      message: string;
    };
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });

  it("should return invalid and provide a message for a weak password", () => {
    const result = passwordValidation("weakpass");
    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "Password is not strong enough. It must contain at least one uppercase letter, one number, and be at least 8 characters long."
    );
  });

  it("should return invalid and provide a message for a password without an uppercase letter", () => {
    const result = passwordValidation("12345678");
    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "Password is not strong enough. It must contain at least one uppercase letter, one number, and be at least 8 characters long."
    );
  });

  it("should return invalid and provide a message for a password without a number", () => {
    const result = passwordValidation("Weakpassword");
    expect(result.valid).toBe(false);
    expect(result.message).toBe(
      "Password is not strong enough. It must contain at least one uppercase letter, one number, and be at least 8 characters long."
    );
  });
});
