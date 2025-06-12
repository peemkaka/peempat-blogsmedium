import React, { useEffect, useState } from 'react';
import { Blog } from '../../../context/context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../../hooks/useSingleFetch';
import { useLocation } from 'react-router-dom';

function FollowBtn({ userId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { currentUser } = Blog();
  const { data, loading } = useSingleFetch({
    collectionName: 'users',
    id: currentUser?.uid,
    subCollectionName: 'follows',
  });

  useEffect(() => {
    setIsFollowing(data?.findIndex((item) => item.id === userId) !== -1);
  }, [data, currentUser?.id]);
  const handleFollow = async () => {
    try {
      if (currentUser) {
        const followRef = doc(db, 'users', currentUser?.uid, 'follows', userId);
        const followerRef = doc(db, 'users', userId, 'followers', currentUser?.uid);

        if (isFollowing) {
          await deleteDoc(followRef);
          await deleteDoc(followerRef);
          toast.success('You have unfollowed this user');
          setIsFollowing(false);
        } else {
          await setDoc(followRef, {
            userId: userId,
          });
          await setDoc(followerRef, {
            userId: userId,
          });
          toast.success('You are now following this user');
          setIsFollowing(true);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const { pathname } = useLocation();
  return (
    <button
      onClick={handleFollow}
      className={`${pathname === '/' ? 'border border-black' : ''} px-3 py-[0.2rem] rounded-full
     ${isFollowing ? 'text-gray-500 border-none' : ''}
    `}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}

export default FollowBtn;
