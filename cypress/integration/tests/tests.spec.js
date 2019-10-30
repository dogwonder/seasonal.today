/// <reference types="Cypress" />

// run tests
// Command line: `$(npm bin)/cypress run`
// UI: `node_modules/.bin/cypress open`

context('Actions', () => {


  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  // https://on.cypress.io/interacting-with-elements
  

  // it('Open homepage', () => {
  //   // https://on.cypress.io/type
  //   cy.get('h1')
  //     .should('contain', 'Welcome')
  // })

  it('Has no detectable a11y violations on load', () => {
    // Test the page at initial load
    // cy.configureAxe({
    //   rules: {}
    // })
    cy.checkA11y()
  })

  //Cookies
  it('Set Cookie policy 🍪', () => {
    cy.getCookie('jw_cookie_policy')
      .should('have.property', 'value', '{%22essential%22:true%2C%22analytics%22:true%2C%22marketing%22:true}')
  })

  it('Change Cookie policy 🍪 -- Analytics', () => {
    cy.visit('/cookies.html')
      .get('#radio-cookie__analytics-off').check()  
      .getCookie('jw_cookie_policy')
      .should('have.property', 'value', '{%22essential%22:true%2C%22analytics%22:false%2C%22marketing%22:true}')
  })

  it('Change Cookie policy 🍪 -- Marketing', () => {
    cy.visit('/cookies.html')
      .get('#radio-cookie__marketing-off').check()  
      .getCookie('jw_cookie_policy')
      .should('have.property', 'value', '{%22essential%22:true%2C%22analytics%22:true%2C%22marketing%22:false}')
  })
 
})
