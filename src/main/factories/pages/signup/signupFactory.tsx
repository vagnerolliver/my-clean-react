import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases/addAccount/remoteAddAccountFactory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/saveAccessToken/saveAccessTokenFactory'
import { makeSignupValidation } from './signupValidationFactory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      validation={makeSignupValidation()}
      addAccount={makeRemoteAddAccount()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
