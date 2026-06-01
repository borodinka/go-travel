import "./commands";

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Firebase") ||
    err.message.includes("Network") ||
    err.message.includes("firestore")
  ) {
    return false;
  }
  return true;
});
