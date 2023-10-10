import { CircleBorder, circleContentSelector, circleSelector } from "./constants";

let index = 0;

export const addElementToStack = (el) => {
    cy.get('[data-cy="input-stack"]').type(el);
    cy.get('[data-cy="button-stack-add"]').click();
    cy.get('[data-cy="button-stack-add"] img').should('exist');
    cy.get('[data-cy="button-stack-delete"]').should("be.disabled");
    cy.get('[data-cy="button-stack-clear"]').should("be.disabled");
    cy.get(circleContentSelector).should('exist');
    cy.get(circleSelector).eq(index).should("have.css", "border-color", CircleBorder.Changing);
    cy.wait(500);
    cy.get(circleSelector).should("have.css", "border-color", CircleBorder.Default);
    cy.get('[data-cy="input-stack"]').should('have.value', '');
    cy.get('[data-cy="button-stack-add"] img').should('not.exist');
    index++;
}

export const deleteElementFromStack = () => {
    if(index>0) {
        cy.get(circleContentSelector).should('have.length', index);
        cy.get('[data-cy="button-stack-delete"]').click();
        cy.get('[data-cy="button-stack-delete"] img').should('exist');
        cy.get('[data-cy="button-stack-add"]').should("be.disabled");
        cy.get('[data-cy="button-stack-clear"]').should("be.disabled");
        cy.get(circleSelector).last().should("have.css", "border-color", CircleBorder.Changing);
        cy.get(circleContentSelector).should('have.length', index-1);
        cy.get('[data-cy="button-stack-delete"] img').should('not.exist');
        index--;
    }
}

export const clearStack = () => {
    if(index>0) {
    cy.get('[data-cy="button-stack-clear"]').click();
    cy.get('[data-cy="button-stack-delete"]').should("be.disabled");
    cy.get('[data-cy="button-stack-add"]').should("be.disabled");
    cy.get(circleContentSelector).should('not.exist');
    cy.get(circleContentSelector).should('have.length', 0);
    cy.get('[data-cy="button-stack-delete"] img').should('not.exist');
    index=0;
}
}