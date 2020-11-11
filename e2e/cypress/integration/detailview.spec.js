/// <reference types="cypress" />

const UI_URL = Cypress.env('CIT_URL') || 'http://localhost'
const API_URL = Cypress.env('CIT_API_URL') || 'http://localhost:9191'
const API_PREFIX = '/api/v1/'
// import testcases from '../support/utils/getTestcasesFromApi'

let testcases = []
before('Get Testcases From API', function  () {
    function req (page) {
        cy.request(`${API_URL}${API_PREFIX}testcase?page=${page}`)
        .its('body')
        .then(function (body) {
            testcases.push(...body.testcases.items)
            if (body.testcases.itemsPerPage*page < body.testcases.totalItems) {
                page += 1
                req(page)
            }
        })
    }
    req(1)
})

describe('DetailView', function () {
    function detailViewTest() {
        // Check title, description, detail description
        cy.get('.result')
        .find('div.testcase-info')
        .should('contain.html', '<div><h2>')
        .should('contain.html', '<div><p>')
        .should('contain.html', '<div class="collapse">')
        .find('button').click()
        cy.get('.result')
        .find('div.collapse')
        .should('contain.html', 'Introduction')

        // Check the legend section
        cy.get('.result')
        .contains('div', 'Legend')
        .should('contain.html', '<div class="tab-content"><p>')
        .should('contain.html', '<table class="table"')
        // Check the result
        cy.get('table.testresult-table')
        .find('th')
        .each(($el) => {
            const text = $el.text()
            expect($el.text()).to.match(/^(Chrome(android)?|Edge|Firefox|Ie|Safari(ios)?)$/)
        })
        //check latest field
        cy.get('table.testresult-table')
        .find('tr.latest')
        .find('td')
        .each(($el) => {
            expect($el).not.to.be.empty
        })
        //TODO: check the matrix result

        // check disclaimer
        cy.get('.result')
        .contains('div', 'Disclaimer')
        .find('p')
        .should(($p) => {
            expect($p).not.to.be.empty
        })
    }

    
    it('Test standard URL', function () {
        testcases.forEach(function (testcase) {
            cy.visit(UI_URL + '/detail/' + testcase.testNumber)
            detailViewTest()
            
        })
        
    })
    it('Test path URL', function () {
        testcases.forEach(function (testcase) {
            cy.visit(UI_URL + '/' + testcase.path);
            detailViewTest()
        })
        
    })
    
})