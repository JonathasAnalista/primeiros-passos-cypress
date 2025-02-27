class MyInfoPage {

    selectorsList(){
        const selectors = {
            myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
            firstNameField: '[name="firstName"]',
            lastNameField: '[name="lastName"]',
            genericField: ".oxd-input--active", // usei o nome generic porque esse elemento e usado em varios campos do código assim posso chamar usando eq()
            dateField: "[placeholder='yyyy- dd - mm']",
            genericComboBox: ".oxd-select-text--arrow",
            quintoItemComboBox: '.oxd-select-dropdown > :nth-child(5)',
            segundoItemComboBox: '.oxd-select-dropdown > :nth-child(2)',
            dateCloseButton: '.--close',
            submitButton: "[type = 'submit']",

        }
        return selectors
    }

    fillPersonalDetails(FistName, LastName){
        cy.get(this.selectorsList().firstNameField).clear().type(FistName)
        cy.get(this.selectorsList().lastNameField).clear().type(LastName)

}

    fillEmployeeDetails(employeeId, otherId, driversLicenseNumber, licenseExpiryDate, ssnNumber, sinNumber){
        cy.get(this.selectorsList().genericField).eq(3).clear().type(employeeId)
        cy.get(this.selectorsList().genericField).eq(4).clear().type(otherId)
        cy.get(this.selectorsList().genericField).eq(5).clear().type(driversLicenseNumber)
        cy.get(this.selectorsList().genericField).eq(6).clear().type(licenseExpiryDate)
        cy.get(this.selectorsList().dateCloseButton).click()
        cy.get(this.selectorsList().genericField).eq(7).clear().type(ssnNumber)
        cy.get(this.selectorsList().genericField).eq(8).clear().type(sinNumber)
}
    saveForm(){
        cy.get(this.selectorsList().submitButton).eq(1).click({ force: true })    
        cy.get('body').should('contain', 'Successfully Saved')
        cy.get('.oxd-toast-close')


}
    fillStatus(){
        cy.get(this.selectorsList().genericComboBox).eq(0).click({ force: true })
        cy.get(this.selectorsList().quintoItemComboBox).click()
        cy.get(this.selectorsList().genericComboBox).eq(1).click({ force: true })
        cy.get(this.selectorsList().segundoItemComboBox).click() // O metodo click() é para clicar no elemento
    }


}
export default MyInfoPage