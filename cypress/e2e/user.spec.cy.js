import userData from '../fixtures/user-date.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM Tests', () => {

  const selectorslist = {
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

  it.only('User Info Update - Sucess', () => { // O metodo only é pra chamar só esse it
        loginPage.acessLoginPage()
        loginPage.loginWithUser(userData.userSucess.username, userData.userSucess.password)  

        dashboardPage.checkDashboardPage()

        menuPage.acessMyInfo()

    cy.get(selectorslist.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorslist.lastNameField).clear().type('LastNameTest')
    cy.get(selectorslist.genericField).eq(3).clear().type("emploTest")
    cy.get(selectorslist.genericField).eq(4).clear().type("otherIdTest")
    cy.get(selectorslist.genericField).eq(5).clear().type("drivers license Number Test")
    cy.get(selectorslist.genericField).eq(6).clear().type("2025-02-19")
    cy.get(selectorslist.dateCloseButton).click()
    cy.get(selectorslist.genericField).eq(7).clear().type("ssnNumberTest")
    cy.get(selectorslist.genericField).eq(8).clear().type("TestFiled")
    cy.get(selectorslist.submitButton).eq(1).click({ force: true })
    cy.get('body').should('contain', 'Successfully Saved')
    cy.get('.oxd-toast-close')
    cy.get(selectorslist.genericComboBox).eq(0).click({ force: true })
    cy.get(selectorslist.quintoItemComboBox).click()
    cy.get(selectorslist.genericComboBox).eq(1).click({ force: true })
    cy.get(selectorslist.segundoItemComboBox).click() // O metodo click() é para clicar no elemento


 })

  it('Login - fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorslist.usernameField).type(userData.userFail.username)
    cy.get(selectorslist.passwordField).type(userData.userFail.password)
    cy.get(selectorslist.loginButton).click()
    cy.get(selectorslist.wrongCredentialAlert)
  })
})

