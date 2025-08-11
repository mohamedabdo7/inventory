export const generatePassword = (length = 8) => {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "@$!%*?&";

  const getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  let password = "";
  password += getRandomChar(lowerCaseLetters);
  password += getRandomChar(upperCaseLetters);
  password += getRandomChar(numbers);
  password += getRandomChar(specialChars);

  const allAllowedChars = lowerCaseLetters + upperCaseLetters + numbers + specialChars;
  for (let i = 4; i < length; i++) {
    password += getRandomChar(allAllowedChars);
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
