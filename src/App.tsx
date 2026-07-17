import './App.css'
import { Route, Routes } from 'react-router'
import SiteLayout from './frontend/components/SiteLayout'
import Home from './frontend/pages/home'
import Cart from './frontend/pages/cart'
import Login from './frontend/pages/login'

function App() {

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
