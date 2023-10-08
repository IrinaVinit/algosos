import { CircleBorder } from "./constants";

export const addElementToHead = (el) => {
  cy.get('[data-cy="input-value"]').as("input").type(el);
  cy.get('[data-cy="button-list-addHead"]').should("be.not.disabled").click();
  cy.get('[data-cy="button-list-addHead"] img').should("exist");
  cy.get("@input").should("be.empty");
  cy.get('[data-cy="circle-head"]').eq(0).should("contain", el);
  cy.get('[data-cy="circle"]')
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Changing);

  cy.get('[data-cy="circle-content"] [data-cy="circle-head"]')
    .first()
    .should("contain", "head");
  cy.get('[data-cy="circle"]')
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Modified);

  cy.get('[data-cy="circle"]')
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="button-list-addHead"] img').should("not.exist");
};

export const addElementToTail = (el) => {
  cy.get('[data-cy="input-value"]').as("input").type(el);
  cy.get('[data-cy="button-list-addTail"]').should("be.not.disabled").click();
  cy.get('[data-cy="button-list-addTail"] img').should("exist");
  cy.get("@input").should("be.empty");
  cy.get('[data-cy="circle-head"]').eq(-2).should("contain", el);
  cy.get('[data-cy="circle"]')
    .eq(-2)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.wait(1000);
  cy.get('[data-cy="circle-content"] [data-cy="circle-tail"]')
    .eq(-1)
    .should("contain", "tail");
  cy.get('[data-cy="circle"]')
    .eq(-1)
    .should("have.css", "border-color", CircleBorder.Modified);
  cy.wait(1000);
  cy.get('[data-cy="circle"]')
    .eq(-1)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="button-list-addTail"] img').should("not.exist");
};

export const addByIndex = (el, index) => {
  cy.get('[data-cy="input-value"]').as("input").type(el);
  cy.get('[data-cy="input-index"]').as("input-index").type(index);
  cy.get('[data-cy="button-list-addIndex"]').should("be.not.disabled").click();
  cy.get('[data-cy="button-list-addIndex"] img').should("exist");
  cy.get("@input").should("be.empty");
  cy.get("@input-index").should("be.empty");

  for (let i = 0; i <= index; i++) {
    if (i === 1) {
      cy.get('[data-cy="circle-head"]')
        .eq(i - 1)
        .should("contain", "head");
    }
    if (i > 1) {
      cy.get('[data-cy="circle-head"]')
        .eq(i - 1)
        .should("contain", "");
    }
    cy.get('[data-cy="circle"]')
      .eq(i)
      .should("have.css", "border-color", CircleBorder.Changing);
    cy.get('[data-cy="circle-tail"]').eq(i).should("contain", "");
    cy.get('[data-cy="circle-head"]').eq(i).should("contain", el);
    if (i === index) {
      cy.get('[data-cy="circle"]')
        .eq(i)
        .should("have.css", "border-color", CircleBorder.Modified);
    }
  }
  cy.get('[data-cy="circle"]').should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="circle-content"]').eq(index).should("contain", el);
  cy.get('[data-cy="circle-head"]').eq(index).should("contain", "");
  cy.get('[data-cy="circle-head"]')
    .eq(index + 1)
    .should("contain", "");
  cy.get('[data-cy="circle"]')
    .eq(index)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="circle"]').should("have.length", 5);
  cy.get('[data-cy="button-list-addIndex"] img').should("not.exist");
};

export const deleteFromHead = () => {
  cy.get('[data-cy="button-list-removeHead"]').click();
  cy.get('[data-cy="button-list-removeHead"] img').should("exist");
  cy.get('[data-cy="circle"]')
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get('[data-cy="circle"]').eq(0).should("not.contain", "c");
  cy.get('[data-cy="circle-tail"]').eq(0).should("contain", "c");
  cy.get('[data-cy="circle"]')
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get('[data-cy="circle-tail"]').eq(1).should("contain", "");
  cy.get('[data-cy="circle"]')
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="circle-head"]').eq(0).should("contain", "head");
  cy.get('[data-cy="button-list-removeHead"] img').should("not.exist");
};

export const deleteFromTail = () => {
  cy.get('[data-cy="button-list-removeTail"]').click();
  cy.get('[data-cy="button-list-removeTail"] img').should("exist");
  cy.get('[data-cy="circle"]')
    .last()
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get('[data-cy="circle"]').last().should("not.contain", "l");
  cy.get('[data-cy="circle-tail"]').eq(-1).should("contain", "l");
  cy.get('[data-cy="circle-tail"]').eq(-1).should("contain", "tail");
  cy.get('[data-cy="circle"]')
    .eq(-1)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="button-list-removeTail"] img').should("not.exist");
};

export const deleteByIndex = (index) => {
  cy.get('[data-cy="input-index"]').as("input-index").type(index);
  cy.get('[data-cy="button-list-removeIndex"]').click();
  cy.get('[data-cy="button-list-removeIndex"] img').should("exist");
  cy.get("@input-index").should("be.empty");

  for (let i = 0; i <= index; i++) {
    cy.get('[data-cy="circle"]')
      .eq(i)
      .should("have.css", "border-color", CircleBorder.Changing);
  }

  cy.get('[data-cy="circle"]')
    .eq(index)
    .should("contain", "")
    .and("have.css", "border-color", CircleBorder.Changing);
  cy.get('[data-cy="circle"]')
    .should("have.length", "3")
    .and("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="button-list-removeIndex"] img').should("not.exist");
};
