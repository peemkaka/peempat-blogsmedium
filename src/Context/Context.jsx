import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { auth, db } from '../firebase/firebase';
import Loading from '../components/Loading/Loading';
import { collection, onSnapshot, query } from 'firebase/firestore';
import useFetch from '../hooks/useFetch';

const BlogContext = createContext();
const Context = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState(0);

  const [updatedData, setUpdatedData] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [publish, setPublish] = useState(false);

  const {data:postData,loading:postLoading} = useFetch('posts');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const getUsers = () => {
      const postRef = query(collection(db, 'users'));
      onSnapshot(postRef, (snapshot) => {
        setAllUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getUsers();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        publish,
        setPublish,
        showComment,
        setShowComment,
        commentLength,
        setCommentLength,
        updatedData,
        setUpdatedData,
        title,
        setTitle,
        description,
        setDescription,
        postData,
        postLoading,
      }}
    >
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
};

export default Context;

export const Blog = () => useContext(BlogContext);
