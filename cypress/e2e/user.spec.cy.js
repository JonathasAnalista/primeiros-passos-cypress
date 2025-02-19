import userData from '../fixtures/user-date.json'

describe('Orange HRM Tests', () => {

  const selectorslist = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    sectionTitleTopBar: ".oxd-topbar-header-title",
    dashboardGrid: ".orangehrm-dashboard-grid",
    wrongCredentialAlert: ".oxd-alert",
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: '[name="firstName"]',
    lastNameField: '[name="lastName"]',
    genericField: ".oxd-input--active", //..campo que nao tinha mais no site porém pra lembrar
    //  como selecionar o quinto elemento  da lista de atributos... usei o nome generic porque eles
    // nao é único
    dateField: "[placeholder='yyyy- dd - mm']",
    genericComboBox: ".oxd-select-text--arrow",
    quintoItemComboBox: '.oxd-select-dropdown > :nth-child(5)',
    segundoItemComboBox: '.oxd-select-dropdown > :nth-child(2)',
    dateCloseButton: '.--close',
    submitButton: "[type = 'submit']",
  }


  it.only('User Info Update - Sucess', () => { // O metodo only é pra chamar só esse it
    cy.visit('/auth/login')
    cy.get(selectorslist.usernameField).type(userData.userSucess.username)
    cy.get(selectorslist.passwordField).type(userData.userSucess.password)
    cy.get(selectorslist.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorslist.dashboardGrid)
    cy.get(selectorslist.myInfoButton).click()
    cy.get(selectorslist.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorslist.lastNameField).clear().type('LastNameTest')
    //cy.get(selectorslist.genericField).eq(4).type("NickNameTest")... pegando o quinto atributo
    //  da lista de elementos
    cy.get(selectorslist.genericField).eq(3).clear().type("emploTest")
    cy.get(selectorslist.genericField).eq(4).clear().type("otherIdTest")
    cy.get(selectorslist.genericField).eq(5).clear().type("drivers license Number Test")
    cy.get(selectorslist.genericField).eq(6).clear().type("2025-02-19")
    cy.get(selectorslist.dateCloseButton).click()
    //cy.get(selectorslist.genericField).eq(7).clear().type("ssnNumberTest")
    cy.get(selectorslist.genericField).eq(8).clear().type("TestFiled")
    cy.get(selectorslist.submitButton).eq(1).click({ force: true })
    cy.get('body').should('contain', 'Successfully Saved')
    cy.get('.oxd-toast-close')

    cy.get(selectorslist.genericComboBox).eq(0).click({ force: true })
    cy.get(selectorslist.quintoItemComboBox).click()
    cy.get(selectorslist.genericComboBox).eq(1).click({ force: true })
    cy.get(selectorslist.segundoItemComboBox).click()


  })

  it('Login - fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorslist.usernameField).type(userData.userFail.username)
    cy.get(selectorslist.passwordField).type(userData.userFail.password)
    cy.get(selectorslist.loginButton).click()
    cy.get(selectorslist.wrongCredentialAlert)
  })
})