import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from '@/main/factories/pages/login/loginFactory'
import { makeSignup } from '@/main/factories/pages/signup/signupFactory'

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
    makeSignup={makeSignup}
  />,
  document.getElementById('main')
)
