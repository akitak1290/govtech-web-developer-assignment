import { apiSearchResponse } from "@/features/search/types";

export function filterSuggestionList(
  suggestion: string,
  searchString: string
): boolean {
  return suggestion.includes(searchString);
}

export function filterResultList(
  data: apiSearchResponse,
  searchString: string
): apiSearchResponse | null {
  const resultItems = data.ResultItems.filter(
    (item) =>
      item.DocumentTitle.Text.toLowerCase().includes(
        searchString.toLowerCase()
      ) ||
      item.DocumentExcerpt.Text.toLowerCase().includes(
        searchString.toLowerCase()
      )
  );

  return resultItems.length > 0
    ? {
        TotalNumberOfResults: resultItems.length,
        Page: data.Page,
        PageSize: data.PageSize,
        ResultItems: resultItems,
      }
    : null;
}
