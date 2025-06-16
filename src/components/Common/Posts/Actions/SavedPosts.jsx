import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { CiSaveDown2 } from 'react-icons/ci';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';
import { Blog } from '../../../../context/context';
import useSingleFetch from '../../../../hooks/useSingleFetch';

function SavedPosts({ post }) {
  const [isSaved, setIsSaved] = useState(false);
  const { currentUser ,setAuthModal} = Blog();
  const { data, loading } = useSingleFetch({
    collectionName: 'users',
    id: post?.userId,
    subCollectionName: 'savedPosts',
  });

  useEffect(() => {
    setIsSaved(data?.some((item) => item.id === post?.id));
  }, [data, post?.id]);

  const handleSave = async () => {
    try {
      if (currentUser) {
        const saveRef = doc(db, 'users', currentUser?.uid, 'savedPosts', post?.id);
        if (isSaved) {
          await deleteDoc(saveRef);
          toast.success('Post has been unsaved successfully!');
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          toast.success('Post has been saved successfully!');
        }
      }else{
        setAuthModal(true);
      }
    } catch (error) {
      toast.error('Error saving post:', error);
    }
  };
  return (
    <>
      <button onClick={handleSave} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-event-none
            ${isSaved ? 'text-yellow-600' : ''}`}
        />
      </button>
    </>
  );
}

export default SavedPosts;
