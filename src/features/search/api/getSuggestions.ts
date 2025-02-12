import { suggestionEndpoint as mockSuggestionEndpoint } from "@/testing/api.mock";
import { apiSearchSuggestion, apiSearchSuggestionParsed } from "../types";
// import { useEffect, useState } from "react";

// const suggestionEndpoint = ""; // update with real endpoint
const suggestionEndpoint = mockSuggestionEndpoint;

export async function getSuggestions(
  queryString: string
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
    if (!data.stemmedQueryTerm.includes(queryString)) {
      return {
        data: null,
        error: "No suggestions found",
      };
    }

    return {
      data: data.suggestions,
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

// export default function useSearch(url: string){
//     const [data, setData] = useState<apiSearchResponse | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (!url) {
//             setData(null);
//             return;
//         }

//         const getData = async () => {
//             setLoading(true);
//             try {
//                 const data = await fetchSearchResult(url);
//                 setData(data);
//             } catch (error) {
//                 setError(`Failed to fetch from ${url}`);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         getData();
//     },[]);

//     return { data, loading, error };
// }
