export function isValidPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,15}$/;
  return passwordRegex.test(password);
}

export function confirmPasswordValidation(
  password: string,
  confirmPassword: string,
): boolean {
  return password === confirmPassword;
}
