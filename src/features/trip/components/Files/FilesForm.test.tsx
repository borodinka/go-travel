import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@test/utils/renderWithProviders";
import userEvent from "@testing-library/user-event";

import type { TripFile } from "../../types";
import FilesForm from "./FilesForm";

const mockShowErrorMessage = vi.hoisted(() => vi.fn());

vi.mock("@services/firebase", () => ({
  getDownloadURL: vi.fn().mockResolvedValue("https://test.com/file.pdf"),
  useStorage: vi.fn().mockReturnValue({
    uploadFiles: vi.fn(),
    uploadProgresses: [],
    removeFile: vi.fn().mockResolvedValue(true),
    isLoading: false,
    removingFilePath: null,
    uploadErrors: [],
  }),
  auth: {
    currentUser: { uid: "test-user-id", displayName: "Test User" },
  },
}));

vi.mock("@hooks/useToast", () => ({
  default: vi.fn().mockReturnValue({
    showErrorMessage: mockShowErrorMessage,
    showSuccessMessage: vi.fn(),
  }),
}));

function createTestFile(
  name: string,
  sizeInBytes: number,
  type = "application/pdf",
) {
  return new File([new Uint8Array(sizeInBytes)], name, { type });
}

function renderFilesForm(defaultFiles: TripFile[] = [{ fileName: "" }]) {
  return renderWithProviders(
    <FilesForm
      defaultFiles={defaultFiles}
      type="document"
      tripId="test-trip-123"
      autoUpload={false}
    />,
  );
}

describe("FilesForm — File Upload Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -- FILE SIZE VALIDATION --

  it("shows an error message when a file exceeds the 3MB size limit", async () => {
    const user = userEvent.setup();
    renderFilesForm();

    const oversizedFile = createTestFile("large-document.pdf", 4 * 1024 * 1024);

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, oversizedFile);

    expect(mockShowErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("File size is too big"),
    );
  });

  it("does not show an error for a file that is within the 3MB size limit", async () => {
    const user = userEvent.setup();
    renderFilesForm();

    const validFile = createTestFile("small-document.pdf", 1 * 1024 * 1024);

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, validFile);

    expect(mockShowErrorMessage).not.toHaveBeenCalledWith(
      expect.stringContaining("File size is too big"),
    );
  });

  // -- DUPLICATE FILENAME VALIDATION --

  it("shows an error when a file with the same name is uploaded twice", async () => {
    const user = userEvent.setup();

    const existingFile: TripFile = {
      fileName: "contract.pdf",
      url: "https://firebase.com/docs/contract.pdf",
      storagePath: "documents/test-trip/contract.pdf",
    };
    renderFilesForm([existingFile, { fileName: "" }]);

    const duplicateFile = createTestFile("contract.pdf", 500 * 1024);
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, duplicateFile);

    expect(mockShowErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining("already uploaded file with the same name"),
    );
  });

  // -- SUCCESSFUL UPLOAD FLOW --

  it("does not show any error for a valid unique file upload", async () => {
    const user = userEvent.setup();
    renderFilesForm();

    const validFile = createTestFile("itinerary.pdf", 800 * 1024);
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, validFile);

    expect(mockShowErrorMessage).not.toHaveBeenCalled();
  });
});
