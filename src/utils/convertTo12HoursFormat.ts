import dayjs from "dayjs";

export function convertTo12HourFormat(timeString: string): string {
  try {
    // Check if input is a valid time format
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(timeString)) {
      throw new Error("Invalid time format. Please use HH:MM or HH:MM:SS format.");
    }

    const date = new Date(`2000-01-01T${timeString}.435Z`);

    // return dayjs(date).format("h:mm A");
    return dayjs(date).format("h:mm A");
  } catch (error) {
    console.error("Error converting time:", error);
    return "Invalid time format";
  }
}
