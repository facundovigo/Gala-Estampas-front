describe('Test Cypress environment', function(){
    before(function(){
        cy.log("precondiciones comunes a todos los casos");
    })
    after(function(){
        cy.log("postcondiciones comunes a todos los casos");
    })
    beforeEach(function(){
        cy.log("Precondiciones a ejecutar previo a cada test");
        cy.gala_page('test','#/dashboard');
    })
    afterEach(function(){
        cy.log("postcondiciones a ejecutar posterior a cada test");
    })
    it('it all rigth', function(){
        let a = 1+1,
            b = 2;

        expect(a==b).to.equal(true);
    });
    it('test Gala get search element and type something', function(){
        
        cy.get('.md-toolbar').contains('Productos...');
        cy.get('.md-input').clear().type('Encontre el buscador...');
    });
    it('test checks', function(){
        cy.gala_page('test', '#/user')
        cy.get('.radio > :nth-child(1) > input').check();
        cy.get('#check-no').check();
        //el uncheck() se usa para descheckear checkbox, en este caso no es un checkBox por eso rompe
    })
})
/* el orden de ejecución es 
    before
        beforeEach 
            test
        afterEach
    after
*/