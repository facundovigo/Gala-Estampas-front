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
  it('validate all register inputs', () => {
    cy.server({ status: 200 })
    cy.route('POST', '/auth/')

    //test first & last name
    cy.get('[data-cy=register]').click()
    cy.get('[data-cy=firstName]').type('asd')
    cy.get('[data-cy=error-firstName]').should('have.text', 'Debe ser mayor a 4 letras')
    cy.get('[data-cy=firstName]').clear().type('cypress')
    cy.get('[data-cy=lastName]').type('asd')
    cy.get('[data-cy=error-lastName]').should('have.text', 'Debe ser mayor a 4 letras')
    cy.get('[data-cy=lastName]').clear().type('cypress')

    //test mail
    cy.get('[data-cy=email]').type('cypress')
    cy.get('[data-cy=error-email]').should('have.text', 'Debe ser un correo electrónico válido')
    cy.get('[data-cy=email]').clear().type('cypress@mail.com')

    //test pass long & identity
    cy.get('[data-cy=pass]').type('cypressPass')
    cy.get('[data-cy=error-pass]').should('have.text', 'Las Contraseñas no coinciden')
    cy.get('[data-cy=confirmPass]').type('cypressPass')
    cy.get('[data-cy=error-pass]').should('not.have.text', 'Las Contraseñas no coinciden')
    cy.get('[data-cy=confirmPass]').type('oso')
    cy.get('[data-cy=error-pass]').should('have.text', 'Las Contraseñas no coinciden')
    cy.get('[data-cy=confirmPass]').clear().type('cypressPass')
    
    //test register btn enabled
    cy.get('[data-cy=register]').should('be.enabled')

  })
})

