describe("строка", () => {
    beforeEach(()=> {
        cy.visit("/recursion");
        cy.get('[data-cy="input-str"]').type('test')
    })
    it("проверка блокировки кнопки при пустом инпуте", () => {
      cy.get('[data-cy="input-str"]').clear();
      cy.get('[data-cy="button-str"]').should("be.disabled");
    });
    it("алгоритм разворота строки выполняется корректно", () => {
        cy.get('[data-cy="button-str"]').click();
        cy.get('[data-cy="circle"]').eq(0).should("contain", 't').and('have.css', 'border-radius')

    })
  });