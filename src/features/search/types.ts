interface Highlight {
  BeginOffset: number;
  EndOffset: number;
}

interface DocumentTitle {
  Text: string;
  Highlights: Highlight[];
}

export interface DocumentExcerpt {
  Text: string;
  Highlights: Highlight[];
}

export interface ResultItem {
  DocumentId: string;
  DocumentTitle: DocumentTitle;
  DocumentExcerpt: DocumentExcerpt;
  DocumentURI: string
}

export interface apiSearchResponse {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: ResultItem[];
}

export interface apiSearchSuggestion {
  stemmedQueryTerm: string,
  suggestions: string[]
}

export interface apiSearchSuggestionParsed {
  error: null | string,
  data: null | string[]
} 

export interface apiSearchResponseParsed{
  error: null | string,
  data: null | apiSearchResponse
} 
