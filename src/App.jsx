
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Demo from './components/Demo/Demo'
import Home from './components/Home/Home'
import HomeHeader from './components/Home/Header/HomeHeader.jsx';
import DemoHeader from './components/Demo/DemoHeader.jsx';
import { ToastContainer } from 'react-toastify';
import { Blog } from './Context/Context.jsx';
import Profile from './components/Home/Profile/Profile.jsx';
import Write from './components/Home/Write/Write.jsx';

function App() {
  const {currentUser} = Blog();
  return (
    <>
    {currentUser? <HomeHeader/> : <DemoHeader/>}
    <ToastContainer/>
    <Routes>
      {currentUser && <Route path="/" element={<Home />} />}
      {!currentUser && <Route path="/demo" element={<Demo />} />}
      <Route path='/profile/:userId' element={<Profile/>}/>
      <Route path='/write' element={<Write/>}/>
      <Route path="*" element={<Navigate to={!currentUser ? "/demo" : "/"}/>} />
    </Routes>
    </>
  )
}

export default App
