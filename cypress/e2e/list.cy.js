import { CircleBorder } from "./constants";
import { addByIndex, addElementToHead, addElementToTail, deleteByIndex, deleteFromHead, deleteFromTail } from "./list-utils";

describe("лист", () => {
  beforeEach(() => {
    cy.visit("/list");
  });
  it("проверка блокировки кнопок при пустом инпуте", () => {
    cy.get('[data-cy="input-value"]').as('input').type("ku");
    cy.get('@input').clear();
    cy.get('[data-cy="button-list-addHead"]').should("be.disabled");
    cy.get('[data-cy="button-list-addHead"] img').should("not.exist");
    cy.get('[data-cy="button-list-addTail"]').should("be.disabled");
    cy.get('[data-cy="button-list-addIndex"]').should("be.disabled");
    cy.get('[data-cy="input-index"]').should("have.value", "");
    cy.get('[data-cy="button-list-removeIndex"]').should("be.disabled");
  });

  it("корректная отрисовка дефолтного списка", () => {
    cy.get('[data-cy="circle-content"]').should("exist").and("have.length", "4");
    cy.get('[data-cy="circle"]').each((circle) => {
      cy.get(circle).should("have.css", "border-color", CircleBorder.Default);
    });
    cy.get('[data-cy="circle-letter"]').as('letter').eq(0).should("contain", "c");
    cy.get('@letter').eq(1).should("contain", "o");
    cy.get('@letter').eq(2).should("contain", "o");
    cy.get('@letter').eq(3).should("contain", "l");
    cy.get('[data-cy="circle-content"] div[data-cy="circle-head"]')
      .first()
      .should("contain", "head");
    cy.get('[data-cy="circle-content"] [data-cy="circle-tail"]')
      .last()
      .should("contain", "tail");
  });
  
  it('добавляется в head', () => {
    addElementToHead('ku');
  })
  it('добавляется в tail', ()=> {
    addElementToTail('hj');
   
  })
  it('добавляется по индексу', ()=> {
    addByIndex('fg', 2);
  })
  it('удаляется из head', ()=> {
    deleteFromHead();
  })
  it('удаляется из tail', ()=> {
    deleteFromTail();
  })
  it('удаляется по индексу', () => {
    deleteByIndex(2);
  }) 
});
