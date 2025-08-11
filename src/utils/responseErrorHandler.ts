import { toast } from "react-toastify";

export default function responseErrorHandler(error: any) {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network Error");
  } else if (error.response) {
    toast.error(error.response.data.error || error.response.data.message || "Server Error");
  } else {
    toast.error(error.message);
  }
}
