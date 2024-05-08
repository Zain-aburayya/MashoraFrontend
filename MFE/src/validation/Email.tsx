function isValidEmail(email: string): boolean {
  // TODO :: Edit the Email regex in the document
  const validEmailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z]+\.[a-zA-Z.]{2,}$/;
  const validLength = email.length >= 6 && email.length <= 100;
  return validEmailRegex.test(email) && validLength;
}

export default isValidEmail;
