import { parsePhoneNumber } from "react-phone-number-input";

export default function formatPhoneNumber(phone?: string) {
  if (!phone) return;

  const parsedPhoneNumber = parsePhoneNumber(phone);
  const formattedPhoneNumber = `+${parsedPhoneNumber?.countryCallingCode} ${parsedPhoneNumber?.nationalNumber}`;

  return formattedPhoneNumber;
}
