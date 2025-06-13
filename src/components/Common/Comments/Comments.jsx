import React, { useEffect, useState } from 'react';
import Modal from '../../../utils/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { Blog } from '../../../context/context';
import { toast } from 'react-toastify';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import useSingleFetch from '../../../hooks/useSingleFetch';
import Loading from '../../Loading/Loading';
import Comment from './Comment';

function Comments({ postId }) {
  const { currentUser, allUsers, showComment, setShowComment ,setCommentLength,commentLength} = Blog();
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [commentData, setCommentata] = useState([]);

  const getUserData = allUsers.find((user) => user.id === currentUser?.uid);

  const { data, loading } = postId
    ? useSingleFetch({ collectionName: 'posts', id: postId, subCollectionName: 'comments' })
    : { data: [] };
  const writeComment = async () => {
    try {
      if (comment === '') {
        toast.error('The input must be filled.');
        return;
      }
      const commentRef = doc(collection(db, 'posts', postId, 'comments')); // สร้าง doc ใหม่ใน collection comments
      await setDoc(commentRef, {
        commentText: comment,
        created: Date.now(),
        userId: currentUser?.uid,
      });
      toast.success('Comment written successfully');
      setComment('');
    } catch (error) {
      toast.error('An error occurred while writing the comment: ' + error.message);
    }
  };

  useEffect(() => {
    if (data) {
      setCommentLength(data.length);
    }
  }, [data]);
  return (
    <Modal setModal={setShowComment} showModal={showComment}>
      <section
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadow-xl p-5
        overflow-y-auto transition-all duration-500 ease-in-out ${showComment ? 'translate-x-0' : 'translate-x-[23rem]'}
        `}
      >
        {/*header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Responses({commentLength})</h3>
          <button onClick={() => setShowComment(false)} className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        {/* comment form */}
        {currentUser && (
          <div className="shadow-xl p-3 my-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <img
                className="w-[2rem] h-[2rem] object-cover rounded-full"
                src={getUserData?.userImg || '/profile.png'}
                alt="user-img"
              />
              <h3 className="capitalize text-sm">{getUserData?.username}</h3>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full outline-none resize-none text-sm border px-2 pt-4"
              name=""
              id=""
              placeholder="What are your thoughts?"
              cols="10"
              rows="2"
            ></textarea>
            <div className="flex items-center justify-end gap-4 mt-[1rem]">
              <button onClick={() => setComment('')} className="text-sm">
                Cancel
              </button>
              <button
                onClick={writeComment}
                className="btn !text-xs !bg-green-700  !text-white !rounded-full"
              >
                Response
              </button>
            </div>
          </div>
        )}
        {data && data?.length === 0 ? (
          <p>This post ha not comments</p>
        ) : (
          <div className="border-t py-4 mt-8 flex flex-col gap-8">
            {data.map((item, i) =>
              loading ? <Loading /> : <Comment postId={postId} item={item} key={i} />
            )}
          </div>
        )}
      </section>
    </Modal>
  );
}

export default Comments;
