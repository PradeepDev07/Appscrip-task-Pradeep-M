
import {BrowserRouter,Routes, Route} from  "react-router-dom"
import Navbar from './components/Navbar/Navbar.jsx'
import Home from "./pages/Home/Home.jsx"
import Shop from "./pages/Shop/Shop.jsx"
import SingleProductPage from "./pages/SingleProduct/SingleProductPage.jsx"
import FavoritePage from "./pages/FavoritePage/FavoritePage.jsx"
import { StoreProvider } from './context/store.jsx'
import LoginForm from "./pages/LoginForm/LoginForm.jsx"

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About Page future update</h1>} />
          <Route path="/contact" element={<h1>Contact Page future update</h1>} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/skill" element={<h1>Skill Page future update</h1>} />
          <Route path="/stories" element={<h1>Stories Page future update</h1>} />
          <Route path="/contact-us" element={<h1>Contact Us Page future update</h1>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<h1>Sign Up Page future update</h1>} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/cart" element={<h1>Cart Page future update</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App