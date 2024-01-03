import { useState } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom';
import Users from './Users';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* public Route */}
          <Route path='/' element={<Users />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  )
}

export default App
