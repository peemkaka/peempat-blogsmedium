import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import DropDown from '../../../../utils/DropDown';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../../../../context/context';
import { db } from '../../../../firebase/firebase';
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';

function Actions({ title, desc, postId }) {
  const { setUpdatedData, currentUser } = Blog();
  const [showDrop, setShowDrop] = useState(false);

  const handleclick = () => {
    setShowDrop(!showDrop);
  };

  const handleUpdate = () => {
    navigatie(`/editPost/${postId}`);
    setUpdatedData({ title, description: desc });
    setShowDrop(false);
  };

  const navigatie = useNavigate();

  const handleDelete = async () => {
    try {
      const ref = doc(db, 'posts', postId);
      const likeRef = doc(db, 'posts', postId, 'likes', currentUser.uid);
      const commentRef = doc(db, 'posts', postId, 'comments', currentUser.uid);
      const saveRef = doc(db, 'users', currentUser.uid, 'savedPosts', postId);
      await deleteDoc(ref);
      await deleteDoc(likeRef);
      await deleteDoc(commentRef);
      await deleteDoc(saveRef);
      toast.success('Post has been deleted');
      navigatie('/');
      setShowDrop(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="relative">
      <button>
        <BsThreeDots onClick={handleclick} className="text-xl flex justify-center items-center" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size={'w-[7rem]'}>
        <Button click={handleUpdate} title="Edit Story" />
        <Button click={handleDelete} title="Delete Story" />
      </DropDown>
    </div>
  );
}

export default Actions;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left
        ${title === 'Delete Story' ? 'text-red-600' : 'text-black/60'}`}
    >
      {title}
    </button>
  );
};
