
beforeEach(()=>{
  })

describe('Order',() =>{
  it('Si no estoy logueado no puedo elegir favoritos', ()=>{
    cy.gala_page('test','/#/dashboard')
    cy.get('[data-cy=card-fav]').should('have.length', 0)
  });

  it('Si me logueo puedo elegir favoritos', ()=>{
    cy.gala_login()
    cy.get('[data-cy=card-fav]').should('have.length', 8)
  });

  it('Si no estoy logueado no puedo comprar', ()=>{
    cy.get('[data-cy=card-detail]').first().click()
    cy.get('[data-cy=orderCreate]').click()
    cy.url().should('include', '/#/user')
  });

  it('Si la cantidad es menor que 1 se desactiva en boton de comprar', ()=>{
    cy.gala_getAProduct()
    cy.get('[data-cy=cant]').clear()
    cy.get('[data-cy=cant-error]').should('have.text', 'Este campo es requerido')
    cy.get('[data-cy=cant]').type('0')
    cy.get('[data-cy=cant-error]').should('have.text', 'Debe ser mayor a 0')
    cy.get('[data-cy=orderCreate]').should('be.disabled')
  })
});