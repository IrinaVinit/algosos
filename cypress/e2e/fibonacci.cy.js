import { circleSelector } from "./constants";

describe("фибоначчи", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
    cy.get('[data-cy="input-fib"]').type(5);
  });
  it("проверка блокировки кнопки при пустом инпуте", () => {
    cy.get('[data-cy="input-fib"]').clear();
    cy.get('[data-cy="button-fib"]').should("be.disabled");
  });
  it("числа генерируются корректно", () => {
    cy.get('[data-cy="button-fib"]').click();
    cy.get(circleSelector).eq(0).should("contain", 1);
    cy.get(circleSelector).eq(1).should("contain", 1);
    cy.get(circleSelector).eq(2).should("contain", 2);
    cy.get(circleSelector).eq(3).should("contain", 3);
    cy.get(circleSelector).eq(4).should("contain", 5);
    cy.get(circleSelector).eq(5).should("contain", 8);
  });
});
