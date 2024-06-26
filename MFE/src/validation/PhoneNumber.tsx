function isValidPhoneNumber(phoneNumber: string): boolean {
  if (phoneNumber.length === 0) {
    return true;
  }
  // +962795927353
  const validPhoneRegex = /^\+9627[789]\d{7}$/;
  return validPhoneRegex.test(phoneNumber);
}

export default isValidPhoneNumber;
