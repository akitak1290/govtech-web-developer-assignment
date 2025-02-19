import { useState } from "react";
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";

export default function Search() {
  const [searchString, setSearchString] = useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="py-10 shadow-md w-full">
        <div className="max-w-screen-xl w-full m-auto px-4">
          <SearchInput onSearch={(value) => setSearchString(value)} />
        </div>
      </div>

      <div className="max-w-screen-xl px-4">
        <SearchResult searchString={searchString} />
      </div>
    </div>
  );
}
