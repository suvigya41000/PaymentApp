import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Send from './pages/Send'
import { Suspense, useEffect, useState } from 'react'
import { Me } from './pages/me'
import { Drop } from './components/DropDown'
import { Profile } from './pages/Profile'
function App() {
  
  return (
    <BrowserRouter >
      <Routes> 
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Me/></Suspense>}/>
        <Route path='/dashboard' element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>}/>
        <Route path='/signin' element={<Suspense fallback={<div>Loading...</div>}><Signin/></Suspense>}/>
        <Route path='/signup' element={<Suspense fallback={<div>Loading...</div>}><Signup/></Suspense>}/>
        <Route path='/send' element={<Suspense fallback={<div>Loading...</div>}><Send/></Suspense>}/>
        <Route path='/profile' element={<Suspense fallback={<div>Loading...</div>}><Profile/></Suspense>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
