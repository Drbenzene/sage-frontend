import axios from "axios";
import { toast } from "sonner";

export const Base_URL = "https://swapi.dev/api/";

export default async function APICall(
  Url: string,
  Method: "GET" | "POST" | "PUT" | "DELETE",
  Data?: any,
  isFormData = false,
  timeoutOverride?: number | null,
  silent?: boolean
) {
  axios.defaults.headers.common["Content-Type"] = isFormData
    ? "multipart/form-data"
    : `application/json`;
  //   axios.defaults.headers.common["cor"] = "no-cors";
  // }

  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.authorization) {
        localStorage.setItem("access_token", response.data.authorization);
      }
      return response;
    },
    (error) => {
      console.log(error, "THE ERROR");
      return error.response;
    }
  );

  let baseUrl = Base_URL;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  const response = await axios({
    method: Method,
    url: baseUrl + Url,
    data: Data,
    // timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
  });

  console.log(response, "THE RESPONSE");
  if (response) {
    console.log(response, "THE RESPONSE222");
    if (!response.status) {
      if (!silent)
        toast.error("Please check your network connection and try again");
      return null;
    }

    if (response.status >= 400 && response.status < 500) {
      console.log(response, "THE RESPONSE333");
      toast.error(
        response?.data?.message ||
          response?.data?.responseMessage ||
          response?.data
      );
      return null;
    }

    if (response.status >= 500) {
      let message =
        "Sorry your request cannot be processed at this moment please try again later";
      if (response.data.message) {
        message = `${response.data.message}`;
      }
      if (!silent) toast.error(message);
      return null;
    }
  } else {
    toast.error("Server error, please try again");
  }

  return !response
    ? null
    : response.data
    ? response.data
    : { status: "success" };
}
