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

export default function Input({
  type,
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm',
  children,
  ...rest
}: Props) {
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
