export function passwordValidation(password: string) {
  const strongPasswordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (strongPasswordPattern.test(password)) {
    return { valid: true, message: "" };
  } else {
    return {
      valid: false,
      message:
        "Password is not strong enough. It must contain at least one uppercase letter, one number, and be at least 8 characters long.",
    };
  }
}
