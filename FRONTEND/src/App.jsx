import {Routes, Route} from 'react-router-dom'
import {Box}  from '@chakra-ui/react'
import NavBar from './Components/Navbar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import CartPage from './pages/CartPage'


function App() {
  return (
    <Box minH={"100vh"}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </Box>

  );
}

export default App
