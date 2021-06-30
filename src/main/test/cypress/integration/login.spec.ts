import faker from 'faker'

describe('Login', () => {
  const selectors = {
    form: 'login__form',
    submitButton: 'submitButton',
    signupLinkElement: 'login__signup',
    errorWrap: 'form-status__error-wrap',
    mainError: 'form-status__main-error',
    emailInput: 'input__email',
    passwordInput: 'input__password',
    emailInputStatus: 'input__email-status',
    passwordInputStatus: 'input__password-status',
    spinnerElement: 'spinner'
  }
  beforeEach(() => cy.visit('Login'))

  it('Should load with correct initial state', () => {
    cy.getByTestId(selectors.emailInputStatus)
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId(selectors.passwordInputStatus)
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId(selectors.submitButton).should('have.attr', 'disabled')
    cy.getByTestId(selectors.errorWrap).should('not.have.descendants')
  })

  it('Should present error state is form is invalid', () => {
    cy.getByTestId(selectors.emailInput).focus().type(faker.random.word())
    cy.getByTestId(selectors.emailInputStatus)
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId(selectors.passwordInput).focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId(selectors.passwordInputStatus)
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId(selectors.submitButton).should('have.attr', 'disabled')
    cy.getByTestId(selectors.errorWrap).should('not.have.descendants')
  })
})
