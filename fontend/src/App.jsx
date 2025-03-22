
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './components/Signup'
import Admin from './pages/Admin'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  )
}

export default App