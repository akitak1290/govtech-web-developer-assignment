import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";

import useSearchFetch from "../api/getSearchResult";

import mockSearchResult from "@/testing/queryResult.mock.json";

jest.mock("../api/getSearchResult", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe(SearchResult, () => {
  it("search result should show when a valid query string is entered", async () => {
    (useSearchFetch as jest.Mock).mockReturnValue({ data: mockSearchResult }); // Default no suggestions

    const searchString = "valid";
    render(<SearchResult searchString={searchString} />);

    const searchResult = screen.queryAllByLabelText("search-result-item");
    expect(searchResult[0]).toBeInTheDocument();
  });

  it("should display error when an error is returned", () => {
    const errorMessage = "Something went wrong";
    (useSearchFetch as jest.Mock).mockReturnValue({
      data: null,
      error: errorMessage,
    }); // Default no suggestions

    const searchString = "";
    render(<SearchResult searchString={searchString} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should display loading when loading state is true", () => {
    (useSearchFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });

    const searchString = "";
    render(<SearchResult searchString={searchString} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display no results found when the result is empty", () => {
    (useSearchFetch as jest.Mock).mockReturnValue({ data: null });

    const searchString = "asdf";
    render(<SearchResult searchString={searchString} />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
