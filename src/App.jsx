
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Demo from './components/Demo/Demo'
import Home from './components/Home/Home'
import HomeHeader from './components/Home/HomeHeader.jsx';
import DemoHeader from './components/Demo/DemoHeader.jsx';
import { Blog } from './context/context.jsx';

function App() {
  const {currentUser} = Blog();
  return (
    <>
    {currentUser? <HomeHeader/> : <DemoHeader/>}
    <Routes>
      {currentUser && <Route path="/" element={<Home />} />}
      {!currentUser && <Route path="/demo" element={<Demo />} />}
      <Route path="*" element={<Navigate to={!currentUser ? "/demo" : "/"}/>} />
    </Routes>
    </>
  )
}

export default App
