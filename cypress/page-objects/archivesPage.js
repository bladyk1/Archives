export class ArchivesPage{
    navigate(){
        cy.visit('https://my.labs.livechatinc.com/archives/')
    }

    authenticate(login, password){
        cy.get('#email').type(login)
        cy.get('#password').type(password + "{enter}",{timeout:50000})
    }

    enterClientNameIntoSearchBoxField(clientName){
        cy.get('input[placeholder="Search in archives…"]',{timeout:10000}).type(clientName)
    }

    validateCorrectNumberOfArchivesReturned(number){
        cy.get('li[id^="archive-item-"] b', {timeout:5000}).should('have.length',number)
    }

    archiveElementsClick(){
        cy.get('li[id^="archive-item-"] b',{timeout:1000}).contains('Client no1').click()
    }

    addFilterButtonClick(){
        cy.get('button.css-rnahou0',{timeout:20000}).click()
    }

    dateComboBoxClick(){
        cy.get('h5.css-lsnp5c').contains('Date').siblings('div.css-wvw7sm').click()
    }
    

    showChatsButtonClick(){
        cy.get('button.css-9whsf3').click()
    }

    selectDateFilterPeriod(dateFilter){
        switch(dateFilter){
            case 'Today':
                cy.get('#today').click()
                break
            case 'Last30days':
                cy.get('#last_30_days').click()
                break
            default:
                cy.log('Sorry, parameter not found')
        }
    }

    validateArchivesByDate(dateFilter){
        switch(dateFilter){
            case 'Today':
                cy.get('li[id^="archive-item-"] div.css-quceq6').should('not.visible')
                break
            case 'Last30days':
                this.validateCorrectNumberOfArchivesReturned(1)
                cy.get('li[id^="archive-item-"] div.css-quceq6').then(($div) => {
                    const date = $div.eq(0).text()
                    expect(this.StrToTimestamp(date)).to.be.greaterThan(this.StrToTimestamp(Cypress.moment().subtract(30, 'days').calendar()))
                })
                break
            default:
                cy.log('Sorry, parameter not found')
        }
    }

    StrToTimestamp(text){
        const date = Date.parse(text);
        return date/1000;
       }

}