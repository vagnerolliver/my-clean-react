import React, { useContext } from 'react'
import Styles from './formStatus.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import { FormContext } from '@/presentation/contexts'

const formStatus: React.FC = () => {
  const { state: { isLoading, mainError } } = useContext(FormContext)
  return (
    <div data-testid="form-status__error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span data-testid="form-status__main-error" className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default formStatus
