import { describe, expect, it } from "vitest";

import type { Expense } from "../types";
import { getTripTotalBudget } from "./getTripTotalBudget";

describe("getTripTotalBudget", () => {
  it("returns 0 for an empty expenses array", () => {
    expect(getTripTotalBudget([])).toBe(0);
  });

  it("returns the amount when there is a single expense", () => {
    const expenses: Expense[] = [
      { id: "1", category: "Hotel", description: "One night", amount: 200 },
    ];
    expect(getTripTotalBudget(expenses)).toBe(200);
  });

  it("returns the correct sum of multiple expenses", () => {
    const expenses: Expense[] = [
      { id: "1", category: "Tickets", description: "Flight", amount: 800 },
      { id: "2", category: "Hotel", description: "Hotel", amount: 600 },
      { id: "3", category: "Food", description: "Meals", amount: 250 },
    ];
    expect(getTripTotalBudget(expenses)).toBe(1650);
  });

  it("handles decimal amounts without floating point errors", () => {
    const expenses: Expense[] = [
      { id: "1", category: "Food", description: "Coffee", amount: 4.5 },
      { id: "2", category: "Food", description: "Lunch", amount: 12.75 },
    ];
    expect(getTripTotalBudget(expenses)).toBeCloseTo(17.25);
  });
});
