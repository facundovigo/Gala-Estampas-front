describe('Test create Order', ()=>{

    it('Cant create a user with exist email', ()=>{
        cy.gala_page('test', '#/user');
        cy.get('.page-link').click();
        cy.get('input[name="first_name"]').type('Test First Name');
        cy.get('input[name="last_name"]').type('Test Last Name');
        cy.get('input[name="email"]').type('test@email.com');        
        cy.get('input[name="password"]').type('test123asd');
        cy.get('input[name="password_confirm"]').type('test123asd');
        
        
        cy.server()
        cy.route('POST', 'http://ec2-3-131-160-45.us-east-2.compute.amazonaws.com/api/auth/register/').as('post')
    
        cy.get('button[name="register_btn"]').click();

        // make sure the XHR completes and the UI changes
        cy.get('@post').should('have.property', 'status', 400)
//        cy.contains('#output', '"email": ["user with this email already exists."]').should('be.visible')

    })
})