/// <reference types="cypress" />

describe('Testing Google Translate Application', function () {
    let data;
    before(function () {
        cy.fixture('example').then(function (Data) {
            data = Data;
        })
    })

    it('Test translate functionality', function () {
        cy.visit('https://translate.google.com/');
        cy.get('#i7 > .VfPpkd-YVzG2b').click();
        cy.wait(2000);
        cy.get('.aCQag > .kHGNJd > :nth-child(2) > .bvzp8c > .OoYv6d > .pEyuac > .qkH7ie > .yFQBKb').type(data.sourceLang).type('{enter}');
        cy.get('.aCQag > .kHGNJd > .zXU7Rb > .EO28P > :nth-child(5) > .VfPpkd-Bz112c-LgbsSe > .VfPpkd-Bz112c-RLmnJb').click();
        cy.get('.aCQag > .kHGNJd > :nth-child(2) > .bvzp8c > .ykTHSe > .pEyuac > .qkH7ie > .yFQBKb').type(data.transLang).type('{enter}');
        cy.get('textarea.er8xn').type(data.initText).type('{enter}');
        cy.wait(4000);
        cy.get('.ryNqvb').should('have.text', data.expectText);
    })

    it('Testing Swap Languages feature', function () {
        cy.contains("button", /swap_horiz/i).click();
        cy.wait(3000)
        cy.get('.D5aOJc').contains(data.expectText);
        cy.get('.ryNqvb').contains(data.initText);
    })


    it('Testing Screen Keyboard feature', function () {
        cy.wait(4000);
        cy.get('textarea.er8xn').clear();
        cy.get('.ita-kd-dropdown > .ita-kd-img').click();
        cy.get(':nth-child(2) > .ita-kd-menuitem-inputtool-name').click();
        cy.get('.QFw9Te').as('sourceTextBox');
        cy.get('@sourceTextBox').click()
        cy.get('#K20').as('capslockButton');
        cy.get('@capslockButton').click()
        cy.get('.vk-btn').as('keyPadLetters')
        cy.get('@keyPadLetters').contains('H').click();
        cy.get('@capslockButton').click()
        cy.get('@keyPadLetters').contains('i').click();
        cy.get('@sourceTextBox').contains('Hi')
        cy.get('.vk-t-btn').click()
    })
})
