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
  // ข้อมูลที่ใช้ใน Context API

  // ใช้สำหรับจัดการสถานะของ modal สำหรับการเข้าสู่ระบบ
  const [authModal, setAuthModal] = useState(false);
  // ใช้สำหรับจัดการสถานะการเข้าสู่ระบบของผู้ใช้
  const [currentUser, setCurrentUser] = useState(false);

  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState(0);

  // ใช้สำหรับจัดการข้อมูลที่อัพเดตในบทความ
  // เช่น เมื่อผู้ใช้แก้ไขบทความแล้วต้องการอัพเดตข้อมูล
  // จะเก็บข้อมูลที่อัพเดตไว้ใน state นี้
  const [updatedData, setUpdatedData] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // ใช้สำหรับจัดการสถานะการเผยแพร่บทความ
  // ถ้า publish เป็น true แสดงว่าผู้ใช้ต้องการเผยแพร่
  const [publish, setPublish] = useState(false);

  const { data: postData, loading: postLoading } = useFetch('posts');

  useEffect(() => {
    // ตรวจสอบสถานะการเข้าสู่ระบบของผู้ใช้
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // ถ้า user มีค่า แสดงว่าผู้ใช้ได้เข้าสู่ระบบแล้ว
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    // เมื่อ component ถูก unmount จะทำการยกเลิกการติดตามสถานะการเข้าสู่ระบบ
    // เพื่อป้องกัน memory leak
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจาก Firestore
    const getUsers = () => {
      const postRef = query(collection(db, 'users'));
      onSnapshot(postRef, (snapshot) => {
        // เมื่อมีการเปลี่ยนแปลงข้อมูลใน collection 'users'
        // จะทำการอัพเดตข้อมูลผู้ใช้ทั้งหมด
        // และเก็บไว้ใน state allUsers
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
        authModal,
        setAuthModal,
      }}
    >
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
};

export default Context;

export const Blog = () => useContext(BlogContext);
