import React, { useState } from 'react'
import Styles from './login.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <FormContext.Provider value={{ state, errorState }}>
      <div className={Styles.login}>
        <LoginHeader />
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
        <Footer />
      </div>
    </FormContext.Provider>
  )
}

export default Login
