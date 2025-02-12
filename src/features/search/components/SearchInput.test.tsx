import {
  render,
  act,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";
import * as getSuggestionsModule from "../api/getSuggestions";
import mockSuggestions from "@testing/suggestion.mock.json";

describe(SearchInput, () => {
  it("typeahead box shows suggestions when > 2 letters are typed", async () => {
    render(<SearchInput onSearch={jest.fn()} />);

    const searchInputElement = screen.getByLabelText("search-input");

    jest
      .spyOn(getSuggestionsModule, "getSuggestions")
      .mockResolvedValue({ error: null, data: mockSuggestions.suggestions });

    await act(async () => {
      await userEvent.type(searchInputElement, "chi");
    });

    // Debugging log
    await waitFor(() => {
      const lists = screen.getByRole("list");
      expect(lists).toBeInTheDocument();
    });
  });

  it("typeahead box should not show suggestions when <= 2 letters are typed", async () => {
    render(<SearchInput onSearch={jest.fn()} />);

    const searchInputElement = screen.getByLabelText("search-input");

    await act(async () => {
      await userEvent.type(searchInputElement, "ch");
    });

    const lists = screen.queryByRole("list");
    expect(lists).not.toBeInTheDocument();
  });

  it("delete icon should appears when >= 1 letter is typed", async () => {
    render(<SearchInput onSearch={jest.fn()} />);

    const searchInputElement = screen.getByLabelText("search-input");
    await act(async () => {
      await userEvent.type(searchInputElement, "chi");
    });

    const deleteButton = await screen.findByLabelText("clear-input-button");
    expect(deleteButton).toBeInTheDocument();
  });

  it("when clicked, delete icon should clear the input field, hide the suggestion dropdown, and vanish", async () => {
    render(<SearchInput onSearch={jest.fn()} />);

    jest
      .spyOn(getSuggestionsModule, "getSuggestions")
      .mockResolvedValue({ error: null, data: mockSuggestions.suggestions });

    const searchInputElement: HTMLInputElement =
      screen.getByLabelText("search-input");
    await act(async () => {
      await userEvent.type(searchInputElement, "chi");
    });

    const lists = await screen.findByRole("list");
    expect(lists).toBeInTheDocument();

    const deleteButton = await screen.findByLabelText("clear-input-button");
    await userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
    expect(lists).not.toBeInTheDocument();
    expect(searchInputElement.value).toBeFalsy();
    expect(searchInputElement).toHaveFocus();
  });

  it("when selecting a suggestion from the dropdown, the suggestion will populate the input field, the dropdown disappear, and search result should be updated", async () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    jest
      .spyOn(getSuggestionsModule, "getSuggestions")
      .mockResolvedValue({ error: null, data: mockSuggestions.suggestions });

    const searchInputElement: HTMLInputElement =
      screen.getByLabelText("search-input");

    await act(async () => {
      await userEvent.type(searchInputElement, "chi");
    });

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();

    searchInputElement.focus();
    await act(async () => {
      await userEvent.keyboard("{ArrowDown}");
    });
    await act(async () => {
      await userEvent.keyboard("{Enter}");
    });

    expect(searchInputElement).toHaveValue("child care");
    expect(list).not.toBeInTheDocument();
  });
});
