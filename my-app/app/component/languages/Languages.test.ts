import { saveLanguage } from "./Languages.service";
import { languagesSelected } from "../api/api";

describe("saveLanguage", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save the selected language successfully", async () => {
    const selectedLanguage = "En";

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ selectedLanguage }),
    });

    const response = await saveLanguage(selectedLanguage);

    // Verify that fetch was called with the correct URL and options
    expect(global.fetch).toHaveBeenCalledWith(languagesSelected, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedLanguage }),
    });

    // Check that the response is as expected
    expect(response).toEqual({ selectedLanguage });
  });

  it("should throw an error if saving the language fails", async () => {
    const selectedLanguage = "En";

    // Mock the fetch response to simulate an error
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(saveLanguage(selectedLanguage)).rejects.toThrow(
      "Failed to save selected language"
    );
  });
});
