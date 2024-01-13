import { useState } from "react";

export interface FetchParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: {};
  credentials?: "include" | "same-origin";
}

export const useFetch = <T>() => {
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [response, setResponse] = useState<T>();
  const [responseObject, setRowResponse] = useState<Response>();

  const fetcher = async ({ url, body, ...params }: FetchParams) => {
    try {
      setFetchingStatus("loading");
      const rowRes = await fetch(url, {
        body: JSON.stringify(body),
        ...params,
      });

      setRowResponse(rowRes);

      const res = await rowRes.json();

      setResponse(res);
      setFetchingStatus("succeeded");
    } catch (error) {
      setFetchingStatus("failed");
    }
  };

  return { fetchingStatus, response, fetcher, responseObject };
};
