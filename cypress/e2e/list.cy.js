import { CircleBorder, addHeadButton, circleContentSelector, circleHeadSelector, circleSelector, circleTailSelector, inputValue } from "./constants";
import { addByIndex, addElementToHead, addElementToTail, deleteByIndex, deleteFromHead, deleteFromTail } from "./list-utils";

describe("лист", () => {
  beforeEach(() => {
    cy.visit("/list");
  });
  it("проверка блокировки кнопок при пустом инпуте", () => {
    cy.get(inputValue).type("ku");
    cy.get(inputValue).clear();
    cy.get(addHeadButton).should("be.disabled");
    cy.get('[data-cy="button-list-addHead"] img').should("not.exist");
    cy.get('[data-cy="button-list-addTail"]').should("be.disabled");
    cy.get('[data-cy="button-list-addIndex"]').should("be.disabled");
    cy.get('[data-cy="input-index"]').should("have.value", "");
    cy.get('[data-cy="button-list-removeIndex"]').should("be.disabled");
  });

  it("корректная отрисовка дефолтного списка", () => {
    cy.get(circleContentSelector).should("exist").and("have.length", "4");
    cy.get(circleSelector).each((circle) => {
      cy.get(circle).should("have.css", "border-color", CircleBorder.Default);
    });
    cy.get(circleSelector).eq(0).should("contain", "c");
    cy.get(circleSelector).eq(1).should("contain", "o");
    cy.get(circleSelector).eq(2).should("contain", "o");
    cy.get(circleSelector).eq(3).should("contain", "l");
    cy.get(circleHeadSelector)
      .first()
      .should("contain", "head");
    cy.get(circleTailSelector)
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
