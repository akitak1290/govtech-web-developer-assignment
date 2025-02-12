import { apiSearchSuggestion } from "@/features/search/types";


export function filterSuggestionList(list: apiSearchSuggestion, queryString: string) {
    return {
        "stemmedQueryTerm": queryString,
        "suggestions": list.suggestions.filter(suggestion => suggestion.includes(queryString.toLocaleLowerCase())),
    }
}