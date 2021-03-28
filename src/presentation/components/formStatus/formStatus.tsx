import React, { useContext } from 'react'
import Styles from './formStatus.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import { FormContext } from '@/presentation/contexts'

const formStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext)
  return (
    <div data-testid="form-status__error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}

export default formStatus
