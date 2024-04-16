function isValidEmail(email: string): boolean {
  const validEmailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return validEmailRegex.test(email);
}

export default isValidEmail;
