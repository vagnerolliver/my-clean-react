import React from 'react'
import Styles from './formStatus.scss'
import Spinner from '@/presentation/components/spinner/spinner'

const formStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Erro</span>
    </div>
  )
}

export default formStatus
