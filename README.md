# Welcome to my Test Result

First of all, I would like to say Thank you for letting me a chance to develop myself.

I've completed the tasks that you assigned. Furthermore, I also code the full functionality of an ordinary Login Form.

## The functions included in this Mini Login Form

- Using Typescript
- Routing by React-Router-Dom v6
- Scss module for UI styling
- Form control by React-Hook-Form, Validation by Yup

- Toasting notifications with React-toastify
- JWT Authentication for Login function. I " borrowed" some Apis from one of my projects - `Fiverr clone`.
- User Profile is automatically filled in the Form when user successfully logged in
- The user profile also can be updated

> Please feel free to test my mini application using

> > email : steven95@gmail.com
> > password : steven95@gmail.com

## JWT authentication flow

When user clicked on Login button at Welcome page, user will be redirected to Login Page.

1.  When user logged in successfully, server will send a response with accessToken
2.  I stored this accessToken in both local state and localStorage of brower because we can access localState much faster from localStorage
3.  To do step 2, I used interceptors technique from axios

```tsx
this.instance.interceptors.response.use((response) => {
  const { url } = response.config
  if (url === '/auth/signin') {
    // I checked if user is signing in or not
    const data = response.data.content
    this.accessToken = data.token
    // if yes, save accessToken to LocalStorage and local state
    setAccessTokenToLS(this.accessToken)
    setProfileToLS(response.data.content.user)
  }
  return response
})
```

4. When I already have accessToken, I have to attached this accessToken to headers of the request

```tsx
this.instance.interceptors.request.use(
  (config) => {
    if (this.accessToken && config.headers) {
      // if accessToken is existed, attach accessToken to headers before it's sent to server
      config.headers.Authorization = this.accessToken
      return config
    }
    return config
  },
  (error) => Promise.reject(error)
)
```

5. From now on, I can freely access to functions that required Authorization like updating profile, pay some products....
