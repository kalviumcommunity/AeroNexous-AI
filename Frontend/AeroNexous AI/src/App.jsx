import { useState } from 'react'

import { Routes,Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AIChat from './components/AIChat'

import Login from './components/Login'
import Profile from './components/Profile'
import About from './components/About'
import Contact from './components/Contact'


function App() {
  

  return (
    <>
    
   
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/Chat' element={<AIChat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
  
        
      
      </Routes>
    </>
  )
}

export default App
