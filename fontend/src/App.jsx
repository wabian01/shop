
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './components/Signup'
import Admin from './pages/Admin'
import Detail from './components/Detail'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  )
}

export default App