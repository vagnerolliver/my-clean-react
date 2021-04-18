import React from 'react'
import { Login } from '@/presentation/pages'
import { AxiosHttpClient } from '@/infra/http/axiosHttpClient/axiosHttpClient'
import { RemoteAuthentication } from '@/data/usecases'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation'

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
