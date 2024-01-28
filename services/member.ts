import { callAPI } from "@/config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function getMemberTransaction(valueParams: string) {
  let params = "";
  if (valueParams === "all") {
    params = "/";
  } else {
    params = `?status=${valueParams}`;
  }

  const url = `${ROOT_API}/${API_VERSION}/players/history${params}`;

  return callAPI({ url, method: "GET", token: true });
}

export async function getTransactionDetail(id: string, serverToken: string) {
  const url = `${ROOT_API}/${API_VERSION}/players/history/${id}/detail`;

  return callAPI({ url, method: "GET", serverToken });
}
