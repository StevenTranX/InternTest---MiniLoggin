import React from 'react'
import styles from '../../App.module.scss'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function Welcome() {
  return (
    <>
      <div className={styles.logo}>
        <img
          className={styles.logoImage}
          src='https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Emblem.png'
          alt='logo'
        />
      </div>
      <h4 className={styles.welcome}>Welcome to StevenDev</h4>
      <p className={styles.logoContent}>Log in with your account to continue</p>
      <div className={styles.btnContainer}>
        <Link to={path.login}>
          <button className={styles.btnLogin}>Login</button>
        </Link>

        <button disabled className={styles.btnSignup}>
          Sign Up
        </button>
      </div>
    </>
  )
}
