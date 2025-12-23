describe("Kanban Board E2E Test", () => {
  beforeEach(() => {
    // Visit app and wait for it to fully load
    cy.visit("http://localhost:5173");

    // Wait until header/input is visible (React might be slow)
    cy.get('input[placeholder="New list title"]', { timeout: 10000 }).should("be.visible");
  });

  it("creates a list", () => {
    cy.get('input[placeholder="New list title"]').type("My List");
    cy.contains("Add List").click();

    // Assert list appears
    cy.contains("My List").should("exist");
  });

  it("creates a card in the list", () => {
    // Ensure list exists
    cy.get('input[placeholder="New list title"]').type("My List 2");
    cy.contains("Add List").click();

    // Click "+ Add Card" button in first list
    cy.contains("My List").parent().within(() => {
      cy.contains("+ Add Card").click();
      // Check default card title exists
      cy.contains("New Task").should("exist");
    });
  });

  it("moves a card between lists using drag & drop simulation", () => {
    // Add a second list
    cy.get('input[placeholder="New list title"]').type("Second List");
    cy.contains("Add List").click();

    // Drag the card from first list to second list
    cy.contains("My List").parent().within(() => {
      cy.contains("New Task")
        .trigger("mousedown", { which: 1 })
        .trigger("mousemove", { clientX: 300, clientY: 0 })
        .trigger("mouseup", { force: true });
    });

    // Verify the card is now in the second list
    cy.contains("Second List").parent().contains("New Task").should("exist");
  });

  it("supports undo and redo", () => {
    // Click undo button
    cy.contains("Undo").click();
    cy.contains("My List").should("exist"); // First list still there
    // Redo button
    cy.contains("Redo").click();
    cy.contains("My List").should("exist"); // Should reapply any action
  });
});
