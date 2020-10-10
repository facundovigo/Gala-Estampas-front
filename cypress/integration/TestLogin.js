beforeEach(()=>{
  cy.visit('http://localhost:8080/#/user')
})
describe('Login', () => {
  it('Si el login es correcto te lleva al home', () => {
    cy.server({ status: 200 })

    cy.route('POST', '/auth/', {
      data: {
        username:'dami@dami.com',
        password:'asdasd123' 
      }
    })

    cy.get('[data-cy=username]').type('dami@dami.com')
    cy.get('[data-cy=password]').type('asdasd123')

    cy.get('[data-cy=login]').click()
    cy.url().should('include', '/#/dashboard')
  });
  it('If the email is not correct, the login button will be disabled', () => {
    cy.server({ status: 400 })

    cy.route('POST', '/auth/')

    cy.get('[data-cy=username]').type('cypress')
    cy.get('[data-cy=password]').type('cypress')

    cy.get('[data-cy=login]').should('be.disabled')
  });
  it('jodeme', () => {
    cy.server({ status: 200 })
    cy.route('POST', '/auth/')

    cy.get('[data-cy=register]').click()
    cy.get('[data-cy=firstName]').type('asd')
    cy.get('[data-cy=error-firstName]').should('include', 'Debe ser mayor a 4 letras')
    // cy.get('[data-cy=lastName]').tipe('cypress')
    // cy.get('[data-cy=pass]').type('cypress')
    // cy.get('[data-cy=confirmPass]').type('cypress')
  })
})

