import {Routes, Route} from 'react-router-dom'
import {Box}  from '@chakra-ui/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './Components/Navbar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'


function App() {
  return (
    <Box minH={"100vh"}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
       
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>

  );
}

export default App
