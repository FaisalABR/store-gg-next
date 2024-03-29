import { JWTPayloadTypes } from "@/services/data-types";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallAPIProps) {
  let headers = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const cookiesToken = Cookies.get("token");
    if (cookiesToken) {
      const jwtToken = atob(cookiesToken);
      headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }
  }
  const response = await axios({ url, method, data, headers }).catch(
    (err) => err.response
  );
  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  const { length } = Object.keys(response);

  const res = {
    error: false,
    message: response.message,
    data: length > 1 ? response.data : response.data.data,
  };

  return res;
}
