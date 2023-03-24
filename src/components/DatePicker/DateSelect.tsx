import React, { useState } from 'react'
import styles from './DatePicker.module.scss'
import range from 'lodash/range'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1900
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className={styles.dateContainer}>
      <div className={styles.title}>Date of birth</div>
      <div className=''>
        <div className={styles.inputWrapper}>
          <select onChange={handleChange} name='date' className={styles.select} value={value?.getDate() || date.date}>
            <option disabled> Day</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            className={styles.select}
            value={value?.getMonth() || date.month}
          >
            <option disabled> Month</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            className={styles.select}
            value={value?.getFullYear() || date.year}
          >
            <option disabled> Year</option>
            {range(1900, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>{errorMessage}</div>
    </div>
  )
}
