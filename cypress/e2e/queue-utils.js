import { CircleBorder } from "./constants";
let index = 0;
let deleteElIndex = 0;
const arrQueue = [];

export const addElementInQueue = (el) => {
  cy.get('[data-cy="input-queue"]').type(el);
  cy.get('[data-cy="button-queue-add"]').click();
  cy.get('[data-cy="input-queue"]').should("have.value", "");
  cy.get('[data-cy="button-queue-add"] img').should("exist");
  cy.get('[data-cy="circle-content"]').eq(index).should("contain", el);
  cy.get('[data-cy="circle"]')
    .eq(index)
    .should("have.css", "border-color", CircleBorder.Changing);
  cy.get('[data-cy="circle-content"] div[data-cy="circle-tail"]').should("exist");
  cy.wait(500);
  cy.get('[data-cy="circle"]')
    .eq(index)
    .should("have.css", "border-color", CircleBorder.Default);
  arrQueue.push(el);
  cy.get('[data-cy="circle-content"] div[data-cy="circle-head"]')
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
    cy.get('[data-cy="circle"]')
      .eq(deleteElIndex)
      .should("have.css", "border-color", CircleBorder.Changing);
    cy.wait(500);
    cy.get('[data-cy="circle"]')
      .eq(deleteElIndex)
      .should("have.css", "border-color", CircleBorder.Default);
    cy.get('[data-cy="circle-letter"]').eq(deleteElIndex).should("contain", "");
    cy.get('[data-cy="button-queue-delete"] img').should("not.exist");
    cy.get('[data-cy="circle-content"] div[data-cy="circle-head"]')
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
    cy.get('[data-cy="circle-content"]').each((circle) => {
      cy.get(circle).should("not.contain", "head").and("not.contain", "tail");
    });
    cy.get('[data-cy="circle-letter"]').each((letter) => {
      cy.get(letter).should("contain", "");
    });
  }
};
