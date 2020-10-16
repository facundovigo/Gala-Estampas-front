// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('gala_page', (mode, url)=>{ 
    api = mode=="prod" ?'http://heroku/sarasa' :'http://localhost:8080/'
    return cy.visit(api+url) 
})

Cypress.Commands.add( 'gala_login', ()=>{
    cy.gala_page('test', '/#/user')
    cy.get('[data-cy=username]').type('dami@dami.com')
    cy.get('[data-cy=password]').type('asdasd123')
    cy.get('[data-cy=login]').click()
})

Cypress.Commands.add('gala_getAProduct',()=>{
    cy.gala_login()
    cy.get('[data-cy=card-detail]').first().click()
    cy.get('[data-cy=orderCreate]').click()
})