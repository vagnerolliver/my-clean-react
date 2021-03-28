import React, { useContext } from 'react'
import Styles from './formStatus.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import { FormContext } from '@/presentation/contexts'

const formStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)
  return (
    <div data-testid="form-status__error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default formStatus
