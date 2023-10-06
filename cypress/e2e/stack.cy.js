import { CircleBorder } from "./constants";

describe("стэк", () => {
    beforeEach(() => {
      cy.visit("/stack");
      cy.get('[data-cy="input-stack"]').type('key');
      cy.get('[data-cy="button-stack-add"]').click();
      cy.get('[data-cy="button-stack-add"] img').should('exist');
    });
    it("проверка блокировки кнопки при пустом инпуте", () => {
      cy.get('[data-cy="input-stack"]').clear();
      cy.get('[data-cy="button-stack-add"]').should("be.disabled");
      cy.get('[data-cy="button-stack-add"] img').should('not.exist');
    });

    it("элементы добавляются корректно", () => {
      cy.get('[data-cy="button-stack-delete"]').should("be.disabled");
      cy.get('[data-cy="button-stack-clear"]').should("be.disabled");
      cy.get('[data-cy="circle-content"]').should('exist');
      cy.get('[data-cy="circle"]').should("have.css", "border-color", CircleBorder.Changing);
      cy.wait(500);
      cy.get('[data-cy="circle"]').should("have.css", "border-color", CircleBorder.Default);
      cy.get('[data-cy="input-stack"]').should('have.value', '');
      cy.get('[data-cy="button-stack-add"] img').should('not.exist');
    });
    
    it("элементы удаляются корректно", () => {
        cy.get('[data-cy="input-stack"]').type('ty');
        cy.get('[data-cy="button-stack-add"]').click();
        cy.get('[data-cy="button-stack-add"] img').should('not.exist');
        cy.get('[data-cy="circle-content"]').should('have.length', 2);
        cy.get('[data-cy="button-stack-delete"]').click();
        cy.get('[data-cy="button-stack-delete"] img').should('exist');
        cy.get('[data-cy="button-stack-add"]').should("be.disabled");
        cy.get('[data-cy="button-stack-clear"]').should("be.disabled");
        cy.get('[data-cy="circle"]').last().should("have.css", "border-color", CircleBorder.Changing);
        cy.get('[data-cy="circle-content"]').should('have.length', 1);
        cy.get('[data-cy="button-stack-delete"] img').should('not.exist');
      })
      it("стэк очищается корректно", () => {
        cy.get('[data-cy="input-stack"]').type('ty');
        cy.get('[data-cy="button-stack-add"]').click();
        cy.get('[data-cy="button-stack-add"] img').should('not.exist');
        cy.get('[data-cy="button-stack-clear"]').click();
        cy.get('[data-cy="button-stack-delete"]').should("be.disabled");
        cy.get('[data-cy="button-stack-add"]').should("be.disabled");
        cy.get('[data-cy="circle-content"]').should('not.exist');
        cy.get('[data-cy="circle-content"]').should('have.length', 0);
        cy.get('[data-cy="button-stack-delete"] img').should('not.exist');
      })
      
    });
   
  
    