import React, { useState } from 'react';
import { Blog } from '../../../context/context';
import moment from 'moment';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropDown from '../../../utils/DropDown';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
function Comment({ item: comment, postId }) {
  const [showDrop, setShowDrop] = useState(false);
  const { allUsers, currentUser } = Blog();
  const [more, setMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const getUserData = allUsers.find((user) => user.id === comment?.userId);
  const [editComment, setEditComment] = useState('');
  const { userId, commentText, created } = comment;

  const removeComment = async () => {
    try {
      const ref = doc(db, 'posts', postId, 'comments', comment?.id);
      await deleteDoc(ref);
      setShowDrop(false);
      toast.success('Comment removed successfully');
    } catch (error) {
      toast.error('Failed to remove comment');
    }
  };

  const editCommentHandle = () => {
    setIsEdit(true);
    setShowDrop(false);
    setEditComment(commentText);
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const ref = doc(db, 'posts', postId,'comments', comment.id);
      await updateDoc(ref, {
        commentText: editComment,
        created: Date.now(),
        userId: currentUser?.uid,
      });
      setEditComment('');
      setIsEdit(false);
      setShowDrop(false);
      toast.success('Comment updated successfully');
    } catch (error) {
      toast.error('Failed to update comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-b">
      {!isEdit ? (
        <>
          <div className="flex items-center gap-5 pt-[1rem]">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={getUserData?.userImg || '/profile.jpg'}
              alt="user-img"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm capitalize">{getUserData?.username}</h2>
                <p className="text-sm text-gray-400">{moment(created).fromNow()}</p>
              </div>
              <div className="relative">
                {currentUser && currentUser?.uid === userId && (
                  <>
                    <button
                      onClick={() => setShowDrop(!showDrop)}
                      className="text-2xl hover:opacity-70"
                    >
                      <BiDotsHorizontalRounded />
                    </button>
                    <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[10rem]">
                      <Button click={editCommentHandle} title="Edit this response" />
                      <Button click={removeComment} title="Delete" />
                    </DropDown>
                  </>
                )}
              </div>
            </div>
          </div>
          <p
            className="py-4 text-sm break-words whitespace-pre-line"
            style={{ wordBreak: 'break-word' }}
          >
            {more ? commentText : commentText.substring(0, 100)}
            {commentText.length > 100 && (
              <button onClick={() => setMore(!more)} className="text-blue-500 cursor-pointer">
                {more ? ' Show less' : '... Show more'}
              </button>
            )}
          </p>
        </>
      ) : (
        <div className="bg-white shadow-xl p-4">
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            placeholder="Write your update"
            className="w-full resize-none outline-none"
          ></textarea>
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setIsEdit(false)} className="w-fit text-sm">
              Cancel
            </button>
            <button 
            onClick={handleEdit}
            className="btn !text-white !bg-green-700 !rounded-full !text-xs">
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Comment;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className="p-4 hover:bg-gray-100 text-black/80 w-full text-sm text-left "
    >
      {title}
    </button>
  );
};
