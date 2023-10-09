import { CircleBorder, circleContentSelector, circleHeadSelector, circleLetter, circleSelector, circleTailSelector, inputQueue } from "./constants";
let index = 0;
let deleteElIndex = 0;
const arrQueue = [];

export const addElementInQueue = (el) => {
  cy.get(inputQueue).type(el);
  cy.get('[data-cy="button-queue-add"]').click();
  cy.get(inputQueue).should("have.value", "");
  cy.get('[data-cy="button-queue-add"] img').should("exist");
  cy.get(circleSelector).eq(index).should("contain", el);
  cy.get(circleSelector)
    .eq(index)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get(circleTailSelector).should("exist");
  cy.wait(500);
  cy.get(circleSelector)
    .eq(index)
    .should("have.css", "border-color", CircleBorder.Default);
  arrQueue.push(el);
  cy.get(circleHeadSelector)
    .eq(deleteElIndex)
    .should("contain", "head");
  index++;
};

export const checkPrevCircleContentInQueue = (index) => {
  if (index > 0) {
    return arrQueue[index - 1];
  }
};

export const deleteElementInQueue = () => {
  if (index > 1) {
    cy.get('[data-cy="button-queue-delete"]').click();
    cy.get('[data-cy="button-queue-delete"] img').should("exist");
    cy.get('[data-cy="button-queue-add"]').should("be.disabled");
    cy.get('[data-cy="button-queue-clear"]').should("be.disabled");
    cy.get(circleSelector)
      .eq(deleteElIndex)
      .should("have.css", "border-color", CircleBorder.Changing);
    cy.wait(500);
    cy.get(circleSelector)
      .eq(deleteElIndex)
      .should("have.css", "border-color", CircleBorder.Default);
    cy.get(circleLetter).eq(deleteElIndex).should("contain", "");
    cy.get('[data-cy="button-queue-delete"] img').should("not.exist");
    cy.get(circleHeadSelector)
      .eq(deleteElIndex + 1)
      .should("contain", "head");
    arrQueue.shift();
    index--;
    deleteElIndex++;
  } else {
    clearQueue();
  }
};

export const clearQueue = () => {
  if (index > 0) {
    cy.get('[data-cy="button-queue-clear"]').click();
    cy.get(circleContentSelector).should("not.contain", "head").and("not.contain", "tail");
    cy.get(circleLetter).should("contain", "");
  }
};
