import { searchResultEndpoint as mockSearchResultEndpoint } from "@/testing/api.mock";
import { apiSearchResponse, apiSearchResponseParsed } from "../types";

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
