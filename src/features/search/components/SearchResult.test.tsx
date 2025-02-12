import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";
import mockQueryResult from "@testing/queryResult.mock.json";

describe(SearchResult, () => {
  it("search result should show when a valid query string is entered", async () => {
    render(<SearchResult result={mockQueryResult}/>);

    const searchResult = screen.queryAllByLabelText('search-result-item');
    expect(searchResult[0]).toBeInTheDocument();
  });
});
