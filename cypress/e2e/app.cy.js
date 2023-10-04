describe('приложение загружено', () => {
    it('доступно по localhost:3000', ()=> {
        cy.visit('http://localhost:3000/');
    })
})