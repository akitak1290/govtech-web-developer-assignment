import { useEffect, useRef, useState } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import useTypeaheadFetch from "../api/getSuggestions";
import SearchIcon from "./SearchIcon";

interface SearchInputProps {
  onSearch: (searchString: string) => void;
}

function highlighText(text: string, searchString: string): JSX.Element {
  const startIndex = text.toLowerCase().indexOf(searchString.toLowerCase());
  if (startIndex === -1) return <p>{text}</p>;

  const endIndex = startIndex + searchString.length;
  return (
    <span>
      {text.substring(0, startIndex)}
      <b>{text.substring(startIndex, endIndex)}</b>
      {text.substring(endIndex)}
    </span>
  );
}

export default function SearchInput(props: SearchInputProps) {
  const { onSearch } = props;

  const [searchString, setSearchString] = useState("");
  const { data: suggestions } = useTypeaheadFetch(searchString);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // component first mount
    searchRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchRef.current) searchRef.current.value = e.target.value;
    // for 2a
    setSearchString(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (searchRef.current) searchRef.current.value = suggestion;
    setSearchString("");

    // for 2b
    onSearch(suggestion);
  };

  const handleClearInput = () => {
    setSearchString("");
    if (searchRef.current) {
      searchRef.current.focus();
      searchRef.current.value = "";
    }
  };

  // to handler 2d
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let newIndex;

    if (!suggestions) return;

    switch (e.key) {
      case "Escape":
        setSearchString("");
        break;
      case "Enter":
        // extend the default submit form
        if (suggestions.length > 0 && suggestionIndex >= 0) {
          searchRef.current!.value = suggestions[suggestionIndex];
        }
        setSearchString("");
        setSuggestionIndex(-1);
        break;
      case "ArrowUp":
        e.preventDefault();
        newIndex =
          suggestionIndex - 1 < 0
            ? suggestions.length - 1
            : suggestionIndex - 1;
        setSuggestionIndex(newIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        newIndex =
          suggestionIndex + 1 >= suggestions.length ? 0 : suggestionIndex + 1;
        setSuggestionIndex(newIndex);
        break;

      default:
        break;
    }
  };

  return (
    <form
      className="relative w-full flex"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchRef.current?.value || "");
      }}
    >
      <div className="relative grow">
        <Input
          onChange={handleInputChange}
          placeholder="search something..."
          onKeyDown={handleKeyDown}
          aria-label="search-input"
          ref={searchRef}
        />
        {searchRef.current && searchRef.current.value.length >= 1 && (
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => handleClearInput()}
            aria-label="clear-input-button"
          >
            x
          </button>
        )}
        {suggestions && suggestions.length > 0 && (
          <ul
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
            aria-label="typeahead-list"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-4 py-2 cursor-pointer ${
                  suggestionIndex == index ? "bg-blue-100" : ""
                }`}
                onMouseEnter={() => setSuggestionIndex(index)}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
              >
                {highlighText(suggestion, searchRef.current!.value)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button type="submit" className="max-w-4">
        <SearchIcon />
        Search
      </Button>
    </form>
  );
}
