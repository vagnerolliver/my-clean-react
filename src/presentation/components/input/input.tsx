import React, { useContext } from 'react'
import Styles from './input.scss'
import { FormContext } from '@/presentation/contexts'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error || 'Tudo certo!'
  }

  return (
    <div className={Styles.inputWrap}>
      {/* <input type="email" name="email" placeholder="Digite seu e-mail" /> */}
      <input { ...props } data-testid={`input__${props.name}`} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`input__${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
