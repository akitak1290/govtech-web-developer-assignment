import { suggestionEndpoint as mockSuggestionEndpoint } from "@/testing/api.mock";
import { apiSearchSuggestion, apiSearchSuggestionParsed } from "../types";
import { useEffect, useState } from "react";
import { useError } from "@/hooks/useError";
import { filterSuggestionList } from "@/testing/filter";
// import { useEffect, useState } from "react";

// const suggestionEndpoint = ""; // update with real endpoint
const suggestionEndpoint = mockSuggestionEndpoint;

export async function getSuggestions(
  searchString: string
): Promise<apiSearchSuggestionParsed> {
  try {
    const response = await fetch(suggestionEndpoint);

    if (!response.ok) {
      return {
        data: null,
        error: `Failed to retrieve data from server, got code ${response.status}`,
      };
      // log
    }

    const data: apiSearchSuggestion = await response.json();

    return {
      data: data.suggestions.filter((suggestion: string) =>
        filterSuggestionList(suggestion, searchString)
      ),
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

export default function useTypeaheadFetch(searchString: string) {
  const [debouncedString, setDebouncedString] = useState(searchString);

  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { error, setError, clearError } = useError();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedString(searchString);
    }, 300);

    return () => clearTimeout(handler);
  }, [debouncedString]);

  useEffect(() => {
    if (!searchString || searchString.length <= 2) {
      setData(null);
      return;
    }

    const getData = async () => {
      setLoading(true);
      const { data, error } = await getSuggestions(searchString);

      if (error) {
        setError(error);
      } else {
        setData(data && data.length > 6 ? data.slice(0, 7) : data);
      }
      setLoading(false);
    };
    getData();
  }, [searchString, setError, clearError]);

  return { data, loading, error };
}
