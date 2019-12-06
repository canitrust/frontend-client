describe('CIT Frontend', function () {
    it('Homepage', function () {
      cy.visit(Cypress.env('CIT_URL') || 'http://localhost:9191');
      cy.get('#navbar-top')
      .find('a')
      .should(($a) => {
        // navigation should have found 2 elements
        expect($a).to.have.length(2)
        expect($a[0]).to.contain('Home')
        expect($a[1]).to.contain('About')
        
      })
      cy.get('#navbar-bottom')
      .find('a')
      .should(($a) => {
        // navigation should have found 2 elements
        expect($a).to.have.length(2)
        expect($a[0]).to.contain('Impress')
        expect($a[1]).to.contain('Contribute')
        
      })
      cy.get('.navbar-brand')
      .should('match', 'a')

      // search bar
      cy.get('form')
      .should('contain.html', 'button')
      .find('.form-control')
      .should('match', 'input')
      // results
      cy.get('.result')
      .should(($result) => {
        // result should have found 5 elements
        expect($result).to.have.length(5)
        
      })
      // pagination
      cy.get('.pagination')
      .should(($pagination) => {
        // result should have found 2 elements
        expect($pagination).to.have.length(2)
        
      })
    })

  });