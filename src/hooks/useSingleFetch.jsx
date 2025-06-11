import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

function useSingleFetch({ collectionName, id, subCollectionName }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSingleData = () => {
      const postRef = query(collection(db, collectionName, id, subCollectionName));
      onSnapshot(postRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      setLoading(false);
    };
    getSingleData();
  }, [db,id]);
  return {
    data,
    loading,
  };
}

export default useSingleFetch;
