describe('Test Cypress environment', function(){
    it('it all rigth', function(){
        let a = 1+1,
            b = 2;

        expect(a==b).to.equal(true);
    });
    it('test Gala get search element and type something', function(){
        cy.visit("http://localhost:8080/#/dashboard");
        cy.get('.md-toolbar').contains('Productos...');
        cy.get('.md-input').type('Facu puto');
    });
})