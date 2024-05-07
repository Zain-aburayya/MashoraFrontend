function isValidName(name: string): boolean {
  if (nameValidation(name) && nameRegexArabic(name)) {
    return true;
  }
  return false;
}

function nameValidation(name: string): boolean {
  if (name.trim().length < 2 || name.trim().length > 25) {
    return false;
  }
  return true;
}

// function nameRegexEnglish(name: string): boolean {
//   const validNameRegex = /^[a-zA-Z]+$/u;
//   return validNameRegex.test(name.trim());
// }

function nameRegexArabic(name: string): boolean {
  const validNameRegex = /^[\u0600-\u06FF\s-]+$/u;
  return validNameRegex.test(name.trim());
}

export default isValidName;
