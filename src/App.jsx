import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Demo from './components/Demo/Demo';
import Home from './components/Home/Home';
import HomeHeader from './components/Home/Header/HomeHeader.jsx';
import DemoHeader from './components/Demo/DemoHeader.jsx';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Home/Profile/Profile.jsx';
import Write from './components/Home/Write/Write.jsx';
import SinglePost from './components/Common/Posts/SinglePost.jsx';
import EditPost from './components/Common/Posts/EditPost.jsx';
import FilterPosts from './components/Demo/FilterPosts.jsx';
import { Blog } from './context/context.jsx';

function App() {
  const { currentUser } = Blog();
  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <ToastContainer />
      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/demo" element={<Demo />} />}
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route path="/filter/:tag" element={<FilterPosts />} />
        <Route path="*" element={<Navigate to={!currentUser ? '/demo' : '/'} />} />
      </Routes>
    </>
  );
}

export default App;
