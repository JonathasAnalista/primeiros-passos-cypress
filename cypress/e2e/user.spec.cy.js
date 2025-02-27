import userData from '../fixtures/user-date.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'
import MyInfoPage from '../pages/myinfoPage'

const Chance = require('chance') // A biblioteca Chance é uma biblioteca de geração de dados aleatórios

var chance = new Chance()
const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
const myInfoPage = new MyInfoPage()

describe('Orange HRM Tests', () => {


  it('User Info Update - Sucess', () => { // O metodo only é pra chamar só esse it
        loginPage.acessLoginPage()
        loginPage.loginWithUser(userData.userSucess.username, userData.userSucess.password)  
        dashboardPage.checkDashboardPage()

        menuPage.acessMyInfo()

        myInfoPage.fillPersonalDetails(chance.first(), chance.last())
        myInfoPage.fillEmployeeDetails('1834', '1239', '4123', '2025-01-17' , '2021-01-01', '123')
        myInfoPage.fillStatus()
        myInfoPage.saveForm()
})
}

)


