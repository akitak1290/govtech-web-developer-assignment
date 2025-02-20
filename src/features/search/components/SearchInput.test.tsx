import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchInput from "./SearchInput";
import useTypeaheadFetch from "../api/getSuggestions";

jest.mock("../api/getSuggestions", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SearchInput Component", () => {
  let onSearchMock: jest.Mock;

  beforeEach(() => {
    onSearchMock = jest.fn();
    (useTypeaheadFetch as jest.Mock).mockReturnValue({ data: [] });
  });

  it("should render search input and button initially", () => {
    render(<SearchInput onSearch={onSearchMock} />);
    expect(screen.getByLabelText("search-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("should update input value on typing", async () => {
    render(<SearchInput onSearch={onSearchMock} />);
    const input = screen.getByRole("textbox", { name: /search-input/i });

    await userEvent.type(input, "hello");

    expect(input).toHaveValue("hello");
  });

  test("should display suggestions and selects one on click", async () => {
    (useTypeaheadFetch as jest.Mock).mockReturnValue({
      data: ["hello world", "hello there"],
    });

    render(<SearchInput onSearch={onSearchMock} />);
    const input = screen.getByLabelText("search-input");

    await userEvent.type(input, "hello");

    const listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent("hello world");

    fireEvent.click(listItems[0]);

    expect(input).toHaveValue("hello world");
    expect(onSearchMock).toHaveBeenCalledWith("hello world");
  });

  it("clears input on clear button click", async () => {
    render(<SearchInput onSearch={onSearchMock} />);
    const input = screen.getByLabelText("search-input");

    await userEvent.type(input, "hi");
    expect(input).toHaveValue("hi");

    const clearButton = screen.getByLabelText("clear-input-button");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
  });

  test("handles keyboard navigation (ArrowDown, ArrowUp, Enter)", async () => {
    (useTypeaheadFetch as jest.Mock).mockReturnValue({
      data: ["apple", "banana", "cherry"],
    });

    render(<SearchInput onSearch={onSearchMock} />);
    const input = screen.getByLabelText("search-input");

    await userEvent.type(input, "app");
    const listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent("apple");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(listItems[0]).toHaveClass("bg-blue-100");

    fireEvent.keyDown(input, { key: "Enter" });
    expect(input).toHaveValue("apple");
  });
});
