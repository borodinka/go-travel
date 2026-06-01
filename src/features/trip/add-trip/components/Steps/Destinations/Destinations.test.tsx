import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@test/utils/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Destinations from "./Destinations";

vi.mock("@hooks/useBreakpoints", () => ({
  useBreakpoints: vi.fn().mockReturnValue({ md: true, lg: true }),
}));

describe("Destinations — Wizard Step 2", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -- RENDERING --

  it("renders the From field", () => {
    renderWithProviders(<Destinations />);
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
  });

  it("renders the first Destination field", () => {
    renderWithProviders(<Destinations />);
    expect(screen.getByLabelText(/destination 1/i)).toBeInTheDocument();
  });

  it("renders the Add Destination button", () => {
    renderWithProviders(<Destinations />);
    expect(
      screen.getByRole("button", { name: /add destination/i }),
    ).toBeInTheDocument();
  });

  it("does not show a remove button for the first destination", () => {
    renderWithProviders(<Destinations />);
    expect(
      screen.queryByRole("button", { name: /remove destination/i }),
    ).not.toBeInTheDocument();
  });

  // -- REQUIRED FIELD VALIDATION --

  it("shows a validation error when the From field is empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Destinations />);

    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/please specify where your trip starts/i),
      ).toBeInTheDocument();
    });
  });

  it("shows a validation error when the Destination field is empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Destinations />);

    await user.type(screen.getByLabelText(/from/i), "Los Angeles");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/please specify the destination/i),
      ).toBeInTheDocument();
    });
  });

  // -- DYNAMIC FIELD ARRAY BEHAVIOR --

  it("adds a second destination field when Add Destination is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Destinations />);

    await user.click(screen.getByRole("button", { name: /add destination/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/destination 2/i)).toBeInTheDocument();
    });
  });

  it("shows a remove button when a second destination is added", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Destinations />);

    await user.click(screen.getByRole("button", { name: /add destination/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /remove destination/i }),
      ).toBeInTheDocument();
    });
  });

  it("removes the second destination when its remove button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Destinations />);

    await user.click(screen.getByRole("button", { name: /add destination/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/destination 2/i)).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: /remove destination/i }),
    );

    await waitFor(() => {
      expect(screen.queryByLabelText(/destination 2/i)).not.toBeInTheDocument();
    });
  });

  // -- FORM SUBMISSION --

  it("advances the wizard and writes locationFrom to the store on valid submission", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Destinations />);

    await user.type(screen.getByLabelText(/from/i), "Los Angeles");
    await user.type(screen.getByLabelText(/destination 1/i), "Tokyo");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      const state = store.getState();
      expect(state.tripWizard.currentStep).toBe(1);
      expect(state.tripWizard.trip.locationFrom).toBe("Los Angeles");
      expect(state.tripWizard.trip.destinations[0].name).toBe("Tokyo");
    });
  });

  it("saves multiple destinations to the store", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Destinations />);

    await user.type(screen.getByLabelText(/from/i), "Los Angeles");
    await user.type(screen.getByLabelText(/destination 1/i), "Tokyo");

    await user.click(screen.getByRole("button", { name: /add destination/i }));
    await waitFor(() => screen.getByLabelText(/destination 2/i));
    await user.type(screen.getByLabelText(/destination 2/i), "Osaka");

    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      const destinations = store.getState().tripWizard.trip.destinations;
      expect(destinations).toHaveLength(2);
      expect(destinations[1].name).toBe("Osaka");
    });
  });
});
