import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({ type, errorMessage, name, register, rules, children, ...rest }: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputDiv}>
        <input type={type} className={styles.input} {...registerResult} {...rest} />
        {children ? <div className={styles.inputIcon}>{children}</div> : null}
      </div>
      <div className={styles.errorMessage}>{errorMessage}</div>
    </div>
  )
}
