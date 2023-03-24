import React from 'react'
import Input from 'src/components/Input'
import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import PasswordToggle from 'src/components/Password'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import authApi from 'src/api/auth.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup.string().email('Wrong email format, please try again').required('Please enter your email'),
    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Password length is greater than 6 letters')
      .max(20, 'Password length is less than 20 letters')
  })

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      const response = await authApi.login(data)
      console.log(response.data)
      if (response.data.statusCode === 200) {
        toast('Login Successfully')
        setTimeout(() => {
          navigate('/profile')
        }, 1000)
      }
      return response.data.content
    } catch (error) {
      toast('Login failed, please try again')
    }
  })

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <svg
            style={{
              width: '50px',
              height: '50px'
            }}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-4 w-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <h2>Login</h2>
        </div>
        <div className={styles.loginForm}>
          <form onSubmit={onSubmit}>
            <div className={styles.formRow}>
              <div className={styles.label}>Email</div>
              <Input
                name='email'
                type='email'
                placeholder='example@gmail.com'
                register={register}
                errorMessage={errors.email?.message}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.label}>Password</div>
              <PasswordToggle
                placeholder='Enter your password'
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className={styles.btnSubmit} type='submit'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
