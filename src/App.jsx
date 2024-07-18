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
import DataTable from './components/Bookings'
import Alldatatable from './components/alldatatable'
import AllBookings from './components/alldatatable'
import Bookings from './components/Bookings'
import Allusers from './components/Users'
import Allforms from './components/allforms'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path = '/' element = {<StartPage/>}/>
      <Route path = '/datatables' element = {<Alldatatable/>}/>
      <Route path = '/allbookings' element = {<Bookings/>}/>
      <Route path = '/allusers' element = {<Allusers/>}/>
      <Route path = '/allforms' element = {<Allforms/>}/>
    </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
