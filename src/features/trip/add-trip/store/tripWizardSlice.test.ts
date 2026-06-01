import { describe, expect, it } from "vitest";

import reducer, {
  nextStep,
  previousStep,
  resetWizard,
  setDestinations,
  setTravelInformation,
} from "./tripWizardSlice";

function getInitialState() {
  return reducer(undefined, { type: "@@INIT" });
}

describe("tripWizardSlice", () => {
  describe("nextStep", () => {
    it("increments currentStep from 0 to 1", () => {
      const state = reducer(getInitialState(), nextStep());
      expect(state.currentStep).toBe(1);
    });

    it("can advance through multiple steps sequentially", () => {
      let state = getInitialState();
      state = reducer(state, nextStep()); // step 1
      state = reducer(state, nextStep()); // step 2
      state = reducer(state, nextStep()); // step 3
      expect(state.currentStep).toBe(3);
    });
  });

  describe("previousStep", () => {
    it("decrements currentStep from 2 to 1", () => {
      let state = getInitialState();
      state = reducer(state, nextStep()); // step 1
      state = reducer(state, nextStep()); // step 2
      state = reducer(state, previousStep()); // back to 1
      expect(state.currentStep).toBe(1);
    });

    it("throws an error when called from step 0", () => {
      const state = getInitialState();
      expect(() => reducer(state, previousStep())).toThrow(
        "You are already on the first step. You can't go back.",
      );
    });
  });

  describe("setTravelInformation", () => {
    it("writes name, description, and dates to the trip", () => {
      const startDate = new Date("2026-10-10");
      const endDate = new Date("2026-10-24");

      const state = reducer(
        getInitialState(),
        setTravelInformation({
          name: "Japan",
          description: "Cherry blossoms and ramen",
          startDate,
          endDate,
          previewImage: null,
        }),
      );

      expect(state.trip.name).toBe("Japan");
      expect(state.trip.description).toBe("Cherry blossoms and ramen");
      expect(state.trip.startDate).toEqual(startDate);
      expect(state.trip.endDate).toEqual(endDate);
    });
  });

  describe("setDestinations", () => {
    it("replaces the destinations array with new values", () => {
      const destinations = [
        { id: "dest-1", name: "Tokyo" },
        { id: "dest-2", name: "Osaka" },
      ];

      const state = reducer(getInitialState(), setDestinations(destinations));

      expect(state.trip.destinations).toHaveLength(2);
      expect(state.trip.destinations[0].name).toBe("Tokyo");
      expect(state.trip.destinations[1].name).toBe("Osaka");
    });
  });

  describe("resetWizard", () => {
    it("resets currentStep back to 0", () => {
      let state = getInitialState();
      state = reducer(state, nextStep());
      state = reducer(state, nextStep());
      state = reducer(state, resetWizard());
      expect(state.currentStep).toBe(0);
    });

    it("clears the trip name", () => {
      let state = reducer(
        getInitialState(),
        setTravelInformation({
          name: "Japan",
          description: "",
          startDate: null,
          endDate: null,
          previewImage: null,
        }),
      );
      state = reducer(state, resetWizard());
      expect(state.trip.name).toBe("");
    });

    it("generates a new trip ID on reset", () => {
      const original = getInitialState();
      const reset = reducer(original, resetWizard());
      expect(reset.trip.id).toBeDefined();
      expect(reset.trip.id).not.toBe(original.trip.id);
    });
  });
});
