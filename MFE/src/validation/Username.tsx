export function isValidName(name: string, field: string): boolean {
  if (
    field === 'name' &&
    nameValidation(name) &&
    (nameRegexArabic(name) || nameRegexEnglish(name))
  ) {
    console.log('wtf');
    return true;
  } else if (
    field === 'username' &&
    nameValidation(name) &&
    nameRegexEnglish(name)
  ) {
    console.log('here');
    return true;
  }
  return false;
}

export function isSameLanguage(name1: string, name2: string): boolean {
  const containsArabic1 = /[\u0600-\u06FF]/u.test(name1);
  const containsArabic2 = /[\u0600-\u06FF]/u.test(name2);
  return containsArabic1 === containsArabic2;
}

function nameValidation(name: string): boolean {
  if (name.trim().length < 2 || name.trim().length > 25) {
    return false;
  }
  return true;
}

function nameRegexEnglish(name: string): boolean {
  const validNameRegex = /^[a-zA-Z][a-zA-Z0-9._-]{2,24}$/u;
  return validNameRegex.test(name.trim());
}

function nameRegexArabic(name: string): boolean {
  const validNameRegex = /^[\u0600-\u06FF\s-]+$/u;
  return validNameRegex.test(name.trim());
}
