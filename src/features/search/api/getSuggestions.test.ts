import { getSuggestions } from "@features/search/api/getSuggestions";
import useTypeaheadFetch from "@features/search/api/getSuggestions";
import { renderHook, waitFor } from "@testing-library/react";
// import { suggestionEndpoint as mockSuggestionEndpoint } from "@/testing/api.mock";

(globalThis as any).fetch = jest.fn();

describe("getSuggestions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return filtered suggestions on success", async () => {
    const mockResponse = {
      suggestions: ["apple", "banana", "apricot", "blueberry"],
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getSuggestions("ap");

    expect(result.data).toEqual(["apple", "apricot"]);
    expect(result.error).toBeNull();
  });

  it("should be able to handle failed API response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await getSuggestions("ap");

    expect(result.data).toBeNull();
    expect(result.error).toBe(
      "Failed to retrieve data from server, got code 500"
    );
  });

  it("should be able to handle network error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await getSuggestions("ap");

    expect(result.data).toBeNull();
    expect(result.error).toBe("Network error");
  });
});

describe("useTypeaheadFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not fetch if input is empty or less than 3 characters", () => {
    const { result } = renderHook(() => useTypeaheadFetch("ap"));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should fetch data correctly", async () => {
    const mockResponse = {
      suggestions: ["apple", "apricot", "avocado"],
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    const { result } = renderHook(() => useTypeaheadFetch("app"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(["apple"]);
    expect(result.current.error).toBe("");
  });

  it("should be able to handle API errors", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useTypeaheadFetch("apple"));

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Failed to retrieve data from server, got code 500"
      );
    });
  });

  it("should be able to handle network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useTypeaheadFetch("appleasdads"));

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe("Network error");
      expect(result.current.loading).toBe(false);
    });
  });
});
