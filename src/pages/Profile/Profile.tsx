import React, { useEffect, useState } from 'react'
import Input from 'src/components/Input'
import styles from './Profile.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputNumber from 'src/components/InputNumber'
import DateSelect from 'src/components/DatePicker/DateSelect'
import { getProfileFromLS, setProfileToLS } from 'src/utils/auth'
import authApi from 'src/api/auth.api'
import { toast } from 'react-toastify'

export default function Profile() {
  const [profile, setProfile] = useState(getProfileFromLS())

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema = yup.object().shape({
    email: yup.string().email('Wrong email format, please try again').required('Please enter your email'),
    name: yup
      .string()
      .required('Please enter your fullname')
      .min(6, 'Full name must be greater than 6 letters')
      .max(20, 'Full name must be less than 20 letters'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid')
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    trigger,
    setValue
  } = useForm({
    defaultValues: {
      id: 0,
      name: '',
      birthday: new Date(1900, 0, 1),
      email: '',
      phone: ''
    },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (profile) {
      setValue('id', profile.id)
      setValue('name', profile.name)
      setValue('email', profile.email)
      setValue('phone', profile.phone)
      setValue('birthday', profile?.birthday ? new Date(profile.birthday) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await authApi.updateUser(data)
      if (response.data.statusCode === 200) {
        toast('Update Successfully')
      }
      console.log(response.data.content)
      setProfileToLS(response.data.content)
      return response.data.content
    } catch (error) {
      console.log(error)
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
          <h2>User profile</h2>
        </div>
        <div className={styles.loginForm}>
          <form onSubmit={onSubmit}>
            <div className={styles.formRow}>
              <div className={styles.label}>Full name</div>
              <Input
                name='name'
                type='text'
                register={register}
                errorMessage={errors.name?.message}
                placeholder='Enter your full name'
              />
            </div>
            <div className={styles.formRow}>
              <Controller
                control={control}
                name='birthday'
                render={({ field }) => (
                  <DateSelect errorMessage={errors.birthday?.message} value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.label}>Email</div>
              <Input
                name='email'
                placeholder='Enter your email'
                register={register}
                errorMessage={errors.email?.message}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.label}>Phone</div>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='Enter your phone number'
                      errorMessage={errors.phone?.message}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        trigger('phone')
                      }}
                    />
                  )
                }}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className={styles.btnSubmit} type='submit'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
