import { circleContentSelector, circleSelector } from "./constants";

describe("строка", () => {
  const word = "task";
  const arr = word.split("");
  const CircleBorder = {
    Default: "rgb(0, 50, 255)",
    Changing: "rgb(210, 82, 225)",
    Modified: "rgb(127, 224, 81)",
  };
  beforeEach(() => {
    cy.visit("/recursion");
    cy.get('[data-cy="input-str"]').type(word);
  });
  it("проверка блокировки кнопки при пустом инпуте", () => {
    cy.get('[data-cy="input-str"]').clear();
    cy.get('[data-cy="button-str"]').should("be.disabled");
  });
  it("алгоритм разворота строки выполняется корректно", () => {
    cy.get('[data-cy="button-str"]').click();
    cy.get(circleContentSelector).should((circles) => {
      expect(circles).to.have.length(word.length);
    });
    cy.get(circleSelector).should("have.css", "border-color", CircleBorder.Default);

    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      cy.get(circleContentSelector).eq(start).should("contain", arr[start]);
      cy.get(circleSelector)
        .eq(start)
        .should("have.css", "border-color", CircleBorder.Changing);
      cy.get(circleContentSelector).eq(end).should("contain", arr[end]);
      cy.get(circleSelector)
        .eq(end)
        .should("have.css", "border-color", CircleBorder.Changing);
      cy.get(circleContentSelector).eq(start).should("contain", arr[end]);
      cy.get(circleSelector)
        .eq(start)
        .should("have.css", "border-color", CircleBorder.Modified);
      cy.get(circleContentSelector).eq(end).should("contain", arr[start]);
      cy.get(circleSelector)
        .eq(end)
        .should("have.css", "border-color", CircleBorder.Modified);
      start++;
      end--;
    }
  });
});
