import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Welcome />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/profile',
      element: <Profile />
    }
  ])
  return routeElements
}
