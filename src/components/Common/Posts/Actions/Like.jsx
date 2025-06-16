import React, { useEffect, useState } from 'react';
import { PiHandsClappingDuotone } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { Blog } from '../../../../context/context';
import useSingleFetch from '../../../../hooks/useSingleFetch';
function Like({ postId }) {
  if (!postId) return null; // ป้องกัน error

  const [isLiked, setIsLiked] = useState(false);
  const { currentUser, setAuthModal, authModal } = Blog();
  const { data } = postId
    ? useSingleFetch({ collectionName: 'posts', id: postId, subCollectionName: 'likes' })
    : { data: [] };

  useEffect(() => {
    setIsLiked(data && data.findIndex((item) => item.id === currentUser?.uid) !== -1);
  }, [data, currentUser]);


  const handleLike = async () => {
    try {
      if (currentUser) {
        const likeRef = doc(db, 'posts', postId, 'likes', currentUser.uid);
        if (isLiked) {
          await deleteDoc(likeRef);
        } else {
          await setDoc(likeRef, { userId: currentUser.uid });
          toast.success('Post Liked');
        }
      } else {
        setAuthModal(true);
      }
    } catch (error) {
      toast.error('An Error Occurred: ' + error.message);
    }
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-1 text-sm py-[0.5rem]">
      <PiHandsClappingDuotone className={`text-xl ${isLiked ? 'text-black' : 'text-gray-500'}`} />
      <span>{data?.length}</span>
    </button>
  );
}

export default Like;
