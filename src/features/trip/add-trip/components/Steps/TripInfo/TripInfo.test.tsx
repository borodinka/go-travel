import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@test/utils/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TripInfo from "./TripInfo";

vi.mock("@services/firebase", () => ({
  getDownloadURL: vi.fn().mockResolvedValue(null),
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

vi.mock("@hooks/useBreakpoints", () => ({
  useBreakpoints: vi.fn().mockReturnValue({
    xs: false,
    md: true,
    lg: true,
  }),
}));

vi.mock("@hooks/useDialog", () => ({
  default: vi.fn().mockReturnValue({
    isOpen: false,
    open: vi.fn(),
    close: vi.fn(),
  }),
}));

describe("TripInfo — Wizard Step 1", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -- RENDERING --

  it("renders the Trip Name input field", () => {
    renderWithProviders(<TripInfo />);
    expect(screen.getByLabelText(/trip name/i)).toBeInTheDocument();
  });

  it("renders the Description input field", () => {
    renderWithProviders(<TripInfo />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("renders the Next button", () => {
    renderWithProviders(<TripInfo />);
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("renders the Preview Image placeholder", () => {
    renderWithProviders(<TripInfo />);
    expect(screen.getByText(/preview image/i)).toBeInTheDocument();
  });

  // -- REQUIRED FIELD VALIDATION --

  it("shows an error when Next is clicked without a Trip Name", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TripInfo />);

    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/please specify trip name/i)).toBeInTheDocument();
    });
  });

  it("shows an error when Next is clicked without a Preview Image", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TripInfo />);

    await user.type(screen.getByLabelText(/trip name/i), "Japan");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/please select a preview image/i),
      ).toBeInTheDocument();
    });
  });

  // -- OPTIONAL FIELD BEHAVIOR --

  it("does not show a validation error for Description (it is optional)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TripInfo />);

    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/please specify trip name/i)).toBeInTheDocument();
    });

    expect(screen.getByText("0/200")).toBeInTheDocument();
  });

  // -- CHARACTER COUNTER --

  it("updates the character counter as the user types in Description", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TripInfo />);

    await user.type(screen.getByLabelText(/description/i), "Hello");

    expect(screen.getByText("5/200")).toBeInTheDocument();
  });

  // -- FORM SUBMISSION --

  it("advances the wizard when the form is submitted with valid data", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<TripInfo />, {
      preloadedState: {
        tripWizard: {
          currentStep: 0,
          trip: {
            id: "test-trip-id",
            name: "",
            description: "",
            previewImage: { templateImageId: "hawaii-template" },
            startDate: new Date("2026-10-10"),
            endDate: new Date("2026-10-24"),
            locationFrom: "",
            destinations: [{ id: "dest-1", name: "" }],
            places: [{ id: "place-1", name: "", isChecked: false }],
            expenses: [],
            documents: [],
            packingLists: [],
            photos: [],
          },
        },
      },
    });

    await user.type(screen.getByLabelText(/trip name/i), "Japan");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      const state = store.getState();
      expect(state.tripWizard.trip.name).toBe("Japan");
      expect(state.tripWizard.currentStep).toBe(1);
    });
  });
});
