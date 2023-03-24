import styles from './App.module.scss'
import useRouteElements from './useRouteElements'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  return (
    <div className={styles.layout}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          {routeElements}
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default App
