/// <reference types="cypress" />
import {ArchivesPage} from '../page-objects/archivesPage'

describe('LiveChat Archives tests', () => {
    const archivesPage = new ArchivesPage()

    beforeEach(() => {
        cy.visit('/archives')
        archivesPage.authenticate('m.debski+frontend_tests@livechatinc.com','password')
    })

    it('Verify search bar functionality - case 1', () => {
        archivesPage.enterClientNameIntoSearchBoxField('client no1')
        archivesPage.archiveElementsClick()
        cy.get('.css-1w1vawl strong').should('have.text','Client no1')
    })
    
    it('Verify search bar functionality - case 2', () => {
        archivesPage.enterClientNameIntoSearchBoxField('client no1')
        archivesPage.validateCorrectNumberOfArchivesReturned(1)
    })

    it('Verify search bar functionality - no results', () => {
        archivesPage.enterClientNameIntoSearchBoxField('client no5')
        cy.get('.css-xi606m .css-1h1kome.css-1cswulu5').should('have.text','Darn, no results found')
    })

    it('Verify Today filter display correct archives', () => {
        archivesPage.addFilterButtonClick()
        archivesPage.dateComboBoxClick()
        archivesPage.selectDateFilterPeriod('Today')
        archivesPage.showChatsButtonClick()
        archivesPage.validateArchivesByDate('Today')
    })

    it('Verify last 30 days filter display correct archives', () => {
        archivesPage.addFilterButtonClick()
        archivesPage.dateComboBoxClick()
        archivesPage.selectDateFilterPeriod('Last30days')
        archivesPage.showChatsButtonClick()
        archivesPage.validateArchivesByDate('Last30days')
    })

})