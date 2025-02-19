import { DocumentExcerpt } from "../types";
import useSearchFetch from "../api/getSearchResult";

interface HighlightedParagraphProps {
  data: DocumentExcerpt;
  className?: string;
}
/*
 * optimize this with useMemo if this causes slowdown
 * will need to create a stable reference for @Highlights array
 * to use as dependency
 */
function HighlightedParagraph(props: HighlightedParagraphProps) {
  const { Text, Highlights } = props.data;
  const parsedText: (string | JSX.Element)[] = [];

  if (Highlights.length == 0)
    return <p className={`${props.className}`}>{Text}</p>;
  // assume that @Highlight objects are in order
  let startIndex = 0;
  Highlights.forEach((highlight, index) => {
    parsedText.push(Text.slice(startIndex, highlight.BeginOffset));
    parsedText.push(
      <strong key={index}>
        {Text.slice(highlight.BeginOffset, highlight.EndOffset + 1)}
      </strong>
    );
    startIndex = highlight.EndOffset + 1;
  });

  return <p className={`${props.className}`}>{parsedText}</p>;
}

interface SearchResultProps {
  searchString: string;
}

export default function SearchResult(props: SearchResultProps) {
  const { searchString } = props;
  const { data, loading, error } = useSearchFetch(searchString);

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {searchString !== "" && !data && !loading && <p>No results found</p>}
      {data && data.TotalNumberOfResults > 0 && (
        <div>
          <p className="font-bold py-8 text-xl">
            Showing 1-{Math.min(data.TotalNumberOfResults, data.PageSize)} of{" "}
            {data.TotalNumberOfResults} results
          </p>
          {data.ResultItems.map((item, index) => {
            return (
              <div
                key={index}
                className="*:mb-3 mb-8 flex flex-col"
                aria-label="search-result-item"
              >
                <a
                  href={item.DocumentURI}
                  className="inline-block hover:underline"
                >
                  <HighlightedParagraph
                    data={item.DocumentTitle}
                    className="text-blue-500 font-semibold text-xl"
                  />
                </a>
                <HighlightedParagraph data={item.DocumentExcerpt} />
                <a
                  className="text-gray-500 hover:underline"
                  href={item.DocumentURI}
                >
                  <p className="break-all sm:break-normal">
                    {item.DocumentURI}
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
