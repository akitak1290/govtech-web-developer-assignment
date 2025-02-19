import { act, renderHook } from "@testing-library/react";
import { useError } from "./useError";

describe(useError, () => {
  it("setError update error state successfully", () => {
    const { result } = renderHook(() => useError());
    const errorString = "Loss connection to the server";

    act(() => {
      result.current.setError(errorString);
    });
    expect(result.current.error).toBe(errorString);
  });

  it("clearError clear error state successfully", () => {
    const { result } = renderHook(() => useError());
    const errorString = "Loss connection to the server";

    act(() => {
      result.current.setError(errorString);
    });
    expect(result.current.error).toBe(errorString);

    act(() => {
      result.current.clearError();
    });
    expect(result.current.error).toBe("");
  });
});
