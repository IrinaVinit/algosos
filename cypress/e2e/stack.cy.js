import { addElementToStack, clearStack, deleteElementFromStack } from "./stack-utils";

describe("стэк", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });
  it("проверка блокировки кнопки при пустом инпуте", () => {
    cy.get('[data-cy="input-stack"]').type("key");
    cy.get('[data-cy="input-stack"]').clear();
    cy.get('[data-cy="button-stack-add"]').should("be.disabled");
    cy.get('[data-cy="button-stack-add"] img').should("not.exist");
  });

  it("элементы добавляются и удаляются корректно", () => {
    addElementToStack("wow");
    addElementToStack("oy");
    deleteElementFromStack();
    addElementToStack("else");
    clearStack();
  });
});
