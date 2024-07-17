import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Sidebar from './components/Sidebar'
import Footer from './components/footer'
import Home from './components/Home'
import Menu from './components/Menu'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import StartPage from './components/startpage'
import DataTable from './components/datatable'

function App() {

  return (
    <>
    <BrowserRouter>
    {/* <div className='wrapper'> */}
      <Routes>
      <Route path = '/' element = {<StartPage/>}/>
      <Route path = '/datatables' element = {<DataTable/>}/>

    </Routes>
    {/* </div> */}
    </BrowserRouter>
    
    
    </>
  )
}

export default App
