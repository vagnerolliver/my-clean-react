import React, { useContext } from 'react'
import Styles from './submitButton.scss'
import { FormContext } from '@/presentation/contexts'

type Props = {
  text: String
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext)
  return (
    <button data-testid="submitButton" className={Styles.submit} type="submit" disabled={state.isFormInvalid}>{text}</button>
  )
}

export default SubmitButton
