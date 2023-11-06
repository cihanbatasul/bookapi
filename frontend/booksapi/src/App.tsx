import './index.css'
import AnimatedRoutes from './router/router'
import { BrowserRouter as Router } from 'react-router-dom'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import store from './store/store'
import MobilePopUp from './components/nav/MobilePopUp'

import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './shadcncomponents/ui/toaster'

import NavWrapper from './components/nav/NavWrapper'
import { logoutUser } from './components/nav'
function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780)
  const [isMobilePopup, setIsMobilePopup] = useState(false)


  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <Provider store={store}>
        <Router>
          <NavWrapper isMobile={isMobile} setIsMobile={setIsMobile} setIsMobilePopUp={setIsMobilePopup} isMobilePopUp={isMobilePopup} />
          <Toaster />
          <AnimatePresence>
            {(isMobilePopup && isMobile) && <MobilePopUp signOutOnClick={logoutUser} />}
          </AnimatePresence>

          <AnimatedRoutes />
        </Router>

      </Provider>
    </ThemeProvider>

  )
}

export default App
