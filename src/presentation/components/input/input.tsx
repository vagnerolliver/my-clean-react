import React from 'react'
import Styles from './input.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      {/* <input type="email" name="email" placeholder="Digite seu e-mail" /> */}
      <input { ...props } />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default Input
