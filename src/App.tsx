import './App.css'
import { Route, Routes } from 'react-router'
import SiteLayout from './frontend/components/SiteLayout'
import Home from './frontend/pages/home'
import Cart from './frontend/pages/cart'
import Login from './frontend/pages/login'
import ProductDetails from './frontend/pages/productDetails'
import NotFound from './frontend/pages/notFound'
import SignUp from './frontend/pages/signup'

function App() {

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
