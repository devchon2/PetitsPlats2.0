import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/About' element={<About />} />
      </Routes>
    </>
  )
}

