import { useState } from "react";
import SearchInput from "./components/SearchInput";
import { apiSearchResponse, apiSearchResponseParsed } from "./types";
import SearchResult from "./components/SearchResult";
import { getSearchResult } from "./api/getSearchResult";

export default function Search() {
  const [result, setResult] = useState<apiSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const [data, loading, error] = useSearch(query);

  const handlerSearch = async (queryString: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    const result: apiSearchResponseParsed = await getSearchResult(queryString);
    // simulate a long request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (result.error) {
      setError(result.error);
      result;
    }

    setResult(result.data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="py-10 shadow-md w-full">
        <div className="max-w-screen-xl w-full m-auto px-4">
          <SearchInput onSearch={handlerSearch} />
        </div>
      </div>

      <div className="max-w-screen-xl px-4">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {result && <SearchResult result={result} />}
      </div>
    </div>
  );
}
