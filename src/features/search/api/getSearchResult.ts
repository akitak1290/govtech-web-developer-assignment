import { searchResultEndpoint as mockSearchResultEndpoint } from "@/testing/api.mock";
import { apiSearchResponse, apiSearchResponseParsed } from "../types";
import { useState, useEffect } from "react";
import { useError } from "@/hooks/useError";

// const searchResultEndpoint = ""; // update with real endpoint
const searchResultEndpoint = mockSearchResultEndpoint;

export async function getSearchResult(
  _: string // update when have real endpoint
): Promise<apiSearchResponseParsed> {
  try {
    const response = await fetch(searchResultEndpoint);

    if (!response.ok) {
      return {
        data: null,
        error: `Failed to retrieve data from server, got code ${response.status}`,
      };
      // log
    }

    const data: apiSearchResponse = await response.json();
    return {
      // data: {
      //   TotalNumberOfResults: data.TotalNumberOfResults,
      //   Page: data.Page,
      //   PageSize: data.PageSize,
      //   ResultItems: data.ResultItems.filter({}),
      // },
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message,
    };
    // log
  }
}

export default function useSearchFetch(searchString: string) {
  const [data, setData] = useState<apiSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { error, setError, clearError } = useError();

  useEffect(() => {
    if (!searchString) {
      setData(null);
      clearError();
      return;
    }

    const getData = async () => {
      setLoading(true);
      const { data, error } = await getSearchResult(searchString);

      if (error) {
        setError(error);
      } else {
        setData(data);
      }
      setLoading(false);
    };
    getData();
  }, [searchString, setError, clearError]);

  return { data, loading, error };
}
