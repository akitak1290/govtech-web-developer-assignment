import { apiSearchResponse, DocumentExcerpt } from "../types";

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
  result: apiSearchResponse;
}

export default function SearchResult(props: SearchResultProps) {
  const { result } = props;

  return (
    <div>
      <p className="font-bold py-8 text-xl">
        Showing {result.Page}-{result.PageSize} of {result.TotalNumberOfResults}{" "}
        results
      </p>
      {result.ResultItems.map((item, index) => {
        return (
          <div key={index} className="*:mb-3 mb-8" aria-label="search-result-item" >
            <a href={item.DocumentURI} className="inline-block hover:underline">
              <HighlightedParagraph
                data={item.DocumentTitle}
                className="text-blue-500 font-semibold text-xl"
              />
            </a>
            <HighlightedParagraph data={item.DocumentExcerpt} />
            <a
              className="text-gray-500 inline-block hover:underline"
              href={item.DocumentURI}
            >
              {item.DocumentURI}
            </a>
          </div>
        );
      })}
    </div>
  );
}
