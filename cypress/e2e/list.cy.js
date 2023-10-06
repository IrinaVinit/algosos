import { CircleBorder } from "./constants";

describe("лист", () => {
  beforeEach(() => {
    cy.visit("/list");
  });
  it("проверка блокировки кнопок при пустом инпуте", () => {
    cy.get('[data-cy="input-value"]').type("ku");
    cy.get('[data-cy="input-value"]').clear();
    cy.get('[data-cy="button-list-addHead"]').should("be.disabled");
    cy.get('[data-cy="button-list-addHead"] img').should("not.exist");
    cy.get('[data-cy="button-list-addTail"]').should("be.disabled");
    cy.get('[data-cy="button-list-addIndex"]').should("be.disabled");
    cy.get('[data-cy="input-index"]').should("not.have", "value");
    cy.get('[data-cy="button-list-removeIndex"]').should("be.disabled");
  });

  it("корректная отрисовка дефолтного списка", () => {
    cy.get('[data-cy="circle-content"]').should("exist").and("have.length", "4");
    cy.get('[data-cy="circle"]').each((circle) => {
      cy.get(circle).should("have.css", "border-color", CircleBorder.Default);
    });
    cy.get('[data-cy="circle-letter"]').eq(0).should("contain", "c");
    cy.get('[data-cy="circle-letter"]').eq(1).should("contain", "o");
    cy.get('[data-cy="circle-letter"]').eq(2).should("contain", "o");
    cy.get('[data-cy="circle-letter"]').eq(3).should("contain", "l");
    cy.get('[data-cy="circle-content"] div[data-cy="circle-head"]')
      .first()
      .should("contain", "head");
    cy.get('[data-cy="circle-content"] div[data-cy="circle-tail"]')
      .last()
      .should("contain", "tail");
  });
  
});
