import React from 'react'
import { Router } from 'react-router-dom'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Signup } from '@/presentation/pages'
import { render, RenderResult, cleanup, waitFor, fireEvent } from '@testing-library/react'
import { FormHelper as Helper, ValidationStub, AddAccountSpy, SaveAccessTokenMock } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const sut = render(
    <Router history={history}>
      <Signup
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}

const selectors = {
  form: 'signup__form',
  submitButton: 'signup__submit',
  signupLinkElement: 'signup__login',
  errorWrap: 'form-status__error-wrap',
  mainError: 'form-status__main-error',
  emailInputStatus: 'input__email-status',
  passwordInputStatus: 'input__password-status',
  spinnerElement: 'spinner'
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.internet.email(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId(selectors.form)
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, selectors.errorWrap, 0)
    Helper.testButtonIsDisabled(sut, selectors.submitButton, true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  test('Should show valid email error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid passwordConfirmation error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, selectors.submitButton, false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, selectors.spinnerElement)
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call addAccountSpy only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsAddAccount).toBe(1)
  })

  test('Should not call addAccountSpy if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsAddAccount).toBe(0)
  })

  test('Should present error if addAccountSpy fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, selectors.mainError, error.message)
    Helper.testChildCount(sut, selectors.errorWrap, 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId(selectors.form))
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, selectors.mainError, error.message)
    Helper.testChildCount(sut, selectors.errorWrap, 1)
  })

  test('Should go to login page', () => {
    const { sut } = makeSut()
    const loginLink = sut.getByTestId(selectors.signupLinkElement)
    fireEvent.click(loginLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
