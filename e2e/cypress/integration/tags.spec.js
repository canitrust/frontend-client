/// <reference types="cypress" />

const UI_URL = Cypress.env('CIT_URL') || 'http://localhost'
const API_URL = Cypress.env('CIT_API_URL') || 'http://localhost:9191'
const API_PREFIX = '/api/v1/'
// import testcases from '../support/utils/getTestcasesFromApi'

let tags
before('Get Tags From API', function  () {
    cy.request(`${API_URL}${API_PREFIX}tag`)
    .its('body')
    .then(function (body) {
        tags = body.tags        
    })
})

describe('Tags', function () {
    function tagsTest(tagText) {

        // Check tag Text
        cy.get('#root')
        .contains('h3', tagText)
        .should('exist')

        cy.get('div.result')
        .should('exist')

    }
    it('Test standard URL', function () {
        tags.forEach(function (tag) {
            cy.visit(UI_URL + '/tag/' + tag.tagText)
            tagsTest(tag.tagText) 
        })
        
    })
    it('Test path URL', function () {
        tags.forEach(function (tag) {
            cy.visit(UI_URL + '/' + tag.tagText)
            tagsTest(tag.tagText)        
        })
        
    })
    
})