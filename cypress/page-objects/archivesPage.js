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

    archiveElementClick(){
        cy.get('li[id^="archive-item-"] b',{timeout:1000}).contains('Client no1').click()
    }

    addFilterButtonClick(){
        cy.get('.css-ddvln20',{timeout:20000}).click()
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
        this.showChatsButtonClick()
    }

    validateArchivesByDate(dateFilter){
        switch(dateFilter){
            case 'Today':
                cy.get('li[id^="archive-item-"] div.css-quceq6').should('not.visible')
                break
            case 'Last30days':
                cy.get('li[id^="archive-item-"] div.css-quceq6').should('not.visible')
                /* ------ if we expect 1 or more archives we should use below validation instead ------ */
                /* this.validateCorrectNumberOfArchivesReturned(1)
                cy.get('li[id^="archive-item-"] div.css-quceq6').each(($div) => {
                    const date = $div.eq(0).text()
                    expect(this.StrToTimestamp(date)).to.be.greaterThan(this.StrToTimestamp(Cypress.moment().subtract(30, 'days').calendar()))
                }) */
                break
            default:
                cy.log('Sorry, parameter not found')
        }
    }

    selectDateFilterCustomPeriod(start, end){
        cy.get('#custom_period',{timeout:5000}).click()
        cy.get('#dateRange_from').type(start)
        cy.get('#dateRange_to').type(end)
        return this.showChatsButtonClick()
    }

    validateArchivesDateWithDataRange(from,to){
        cy.get('li[id^="archive-item-"] div.css-quceq6').each(($div) => {
            const date = $div.eq(0).text()
            expect(this.StrToTimestamp(date)).to.be.greaterThan(this.StrToTimestamp(from))
            expect(this.StrToTimestamp(date)).to.be.lessThan(this.StrToTimestamp(to))
        })
    }

    tagComboBoxClick(){
        cy.get('h5.css-lsnp5c').contains('Tag').siblings('div.css-wvw7sm').click()
    }
    
    selectMultipleTagFilter(){
        for (var i=0; i < arguments.length; i++){
            var arg = arguments[i]
            switch(arg){
                case 'Not tagged':
                    cy.get('.css-9vadj0').contains('Not tagged').click()
                    break                
                case 'complaint':
                    cy.get('.css-9vadj0').contains('complaint').click()
                    break
                case  'spam':
                    cy.get('.css-9vadj0').contains('spam').click()
                    break
                case  'positive feedback':
                    cy.get('.css-9vadj0').contains('positive feedback').click()
                    break
                case  'sales':
                    cy.get('.css-9vadj0').contains('sales').click()
                    break
                case  'support':
                    cy.get('.css-9vadj0').contains('support').click()
                    break
                default:
                    cy.log('Sorry, parameter not found')
            }
        }
        return this.showChatsButtonClick()
    }

    validateArchivesContainCorrectTags(){
        cy.get('li[id^="archive-item-"]').each(($div) =>{
            cy.wrap($div).click()
            for (var i=0; i < arguments.length; i++){
                var arg = arguments[i]
                cy.get('.css-hyz9fq').contains(arg).should('be.visible')
                }
        })
    }

    StrToTimestamp(text){
        const date = Date.parse(text);
        return date/1000;
       }

}