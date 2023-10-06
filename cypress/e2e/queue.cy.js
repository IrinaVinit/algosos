import {
  addElementInQueue,
  checkPrevCircleContentInQueue,
  clearQueue,
  deleteElementInQueue,
} from "./utils";

describe("очередь", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("проверка блокировки кнопки при пустом инпуте", () => {
    cy.get('[data-cy="input-queue"]').clear();
    cy.get('[data-cy="button-queue-add"]').should("be.disabled");
    cy.get('[data-cy="button-queue-add"] img').should("not.exist");
    cy.get('[data-cy="button-queue-delete"]').should("be.disabled");
    cy.get('[data-cy="button-queue-clear"]').should("be.disabled");
  });

  it("элементы добавляются и удаляюттся корректно", () => {
    addElementInQueue("y");
    addElementInQueue("n");
    cy.get('[data-cy="circle-content"]')
      .eq(0)
      .should("contain", checkPrevCircleContentInQueue(1));
    addElementInQueue("r");
    addElementInQueue("ss");
    cy.get('[data-cy="circle-content"]')
      .eq(3)
      .should("contain", checkPrevCircleContentInQueue(4));
    deleteElementInQueue();
    deleteElementInQueue();
    clearQueue();
  });
});
