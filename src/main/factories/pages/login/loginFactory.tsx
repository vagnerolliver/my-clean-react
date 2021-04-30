import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remoteAuthenticationFactory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/saveAccessToken/saveAccessTokenFactory'
import { makeLoginValidation } from './loginValidationFactory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
