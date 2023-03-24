/* eslint-disable react/display-name */
import React, { forwardRef, InputHTMLAttributes, useState } from 'react'
import styles from './InputNumber.module.scss'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function (
  { errorMessage, className, onChange, value = '', ...rest },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(event)

      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={styles.input} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={styles.errorMessage}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
