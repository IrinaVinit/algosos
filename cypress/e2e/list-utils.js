import { CircleBorder, addHeadButton, circleContentSelector, circleHeadSelector, circleSelector, circleTailSelector, inputValue } from "./constants";

export const addElementToHead = (el) => {
  cy.get(inputValue).type(el);
  cy.get(addHeadButton).should("be.not.disabled").click();
  cy.get('[data-cy="button-list-addHead"] img').should("exist");
  cy.get(inputValue).should("be.empty");
  cy.get(circleHeadSelector).eq(0).should("contain", el);
  cy.get(circleSelector)
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get(circleHeadSelector)
    .first()
    .should("contain", "head");
  cy.get(circleSelector)
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Modified);
  cy.get(circleSelector)
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="button-list-addHead"] img').should("not.exist");
};

export const addElementToTail = (el) => {
  cy.get(inputValue).type(el);
  cy.get('[data-cy="button-list-addTail"]').should("be.not.disabled").click();
  cy.get('[data-cy="button-list-addTail"] img').should("exist");
  cy.get(inputValue).should("be.empty");
  cy.get(circleHeadSelector).eq(-2).should("contain", el);
  cy.get(circleSelector)
    .eq(-2)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get(circleTailSelector)
    .eq(-1)
    .should("contain", "tail");
  cy.get(circleSelector)
    .eq(-1)
    .should("have.css", "border-color", CircleBorder.Modified);
  cy.get(circleSelector)
    .eq(-1)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="button-list-addTail"] img').should("not.exist");
};

export const addByIndex = (el, index) => {
  cy.get(inputValue).type(el);
  cy.get('[data-cy="input-index"]').as("input-index").type(index);
  cy.get('[data-cy="button-list-addIndex"]').should("be.not.disabled").click();
  cy.get('[data-cy="button-list-addIndex"] img').should("exist");
  cy.get(inputValue).should("be.empty");
  cy.get("@input-index").should("be.empty");

  for (let i = 0; i <= index; i++) {
    if (i === 1) {
      cy.get(circleHeadSelector)
        .eq(i - 1)
        .should("contain", "head");
    }
    if (i > 1) {
      cy.get(circleHeadSelector)
        .eq(i - 1)
        .should("contain", "");
    }
    cy.get(circleSelector)
      .eq(i)
      .should("have.css", "border-color", CircleBorder.Changing);
    cy.get(circleTailSelector).eq(i).should("contain", "");
    cy.get(circleHeadSelector).eq(i).should("contain", el);
    if (i === index) {
      cy.get(circleSelector)
        .eq(i)
        .should("have.css", "border-color", CircleBorder.Modified);
    }
  }
  cy.get(circleSelector).should("have.css", "border-color", CircleBorder.Default);
  cy.get(circleContentSelector).eq(index).should("contain", el);
  cy.get(circleHeadSelector).eq(index).should("contain", "");
  cy.get(circleHeadSelector)
    .eq(index + 1)
    .should("contain", "");
  cy.get(circleSelector)
    .eq(index)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get(circleSelector).should("have.length", 5);
  cy.get('[data-cy="button-list-addIndex"] img').should("not.exist");
};

export const deleteFromHead = () => {
  cy.get('[data-cy="button-list-removeHead"]').click();
  cy.get('[data-cy="button-list-removeHead"] img').should("exist");
  cy.get(circleSelector)
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get(circleSelector).eq(0).should("not.contain", "c");
  cy.get(circleTailSelector).eq(0).should("contain", "c");
  cy.get(circleSelector)
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get(circleTailSelector).eq(1).should("contain", "");
  cy.get(circleSelector)
    .eq(0)
    .should("have.css", "border-color", CircleBorder.Default);
  cy.get(circleHeadSelector).eq(0).should("contain", "head");
  cy.get('[data-cy="button-list-removeHead"] img').should("not.exist");
};

export const deleteFromTail = () => {
  cy.get('[data-cy="button-list-removeTail"]').click();
  cy.get('[data-cy="button-list-removeTail"] img').should("exist");
  cy.get(circleSelector)
    .last()
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get(circleSelector).last().should("not.contain", "l");
  cy.get(circleTailSelector).eq(-1).should("contain", "l");
  cy.get(circleTailSelector).eq(-1).should("contain", "tail");
  cy.get(circleSelector)
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
    cy.get(circleSelector)
      .eq(i)
      .should("have.css", "border-color", CircleBorder.Changing);
  }

  cy.get(circleSelector)
    .eq(index)
    .should("contain", "")
    .and("have.css", "border-color", CircleBorder.Changing);
  cy.get(circleSelector)
    .should("have.length", "3")
    .and("have.css", "border-color", CircleBorder.Default);
  cy.get('[data-cy="button-list-removeIndex"] img').should("not.exist");
};
