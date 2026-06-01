declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      clearWizardState(): Chainable<void>;
      clearAuth(): Chainable<void>;
    }
  }
}

export {};
