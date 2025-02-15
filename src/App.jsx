
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from  "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Header from './components/Header'
import { ToastContainer}  from 'react-toastify';


function App() {

  return (
    <>
    <ToastContainer />
    <Header/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App
