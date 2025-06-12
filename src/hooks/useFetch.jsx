import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = () => {
      let postRef;
      if (collectionName === 'users') {
        postRef = query(collection(db, collectionName));
      } else {
        postRef = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      }
      onSnapshot(postRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      setLoading(false);
    };
    getUsers();
  }, []);
  return {
    data,
    loading,
  };
};

export default useFetch;
