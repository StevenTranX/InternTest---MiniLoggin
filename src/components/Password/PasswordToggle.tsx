import { IconEyeClose, IconEyeOpen } from '../icon'
import React, { Fragment, useState } from 'react'
import Input from '../Input/Input'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  placeholder: string
  register?: UseFormRegister<any>
  errorMessage?: string
}

const PasswordToggle = ({ placeholder, register, errorMessage }: Props) => {
  const [togglePassword, setTogglePassword] = useState(false)
  return (
    <Fragment>
      <Input
        register={register}
        type={togglePassword ? 'text' : 'password'}
        name='password'
        placeholder={placeholder || 'Enter your password'}
        errorMessage={errorMessage}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  )
}

export default PasswordToggle
