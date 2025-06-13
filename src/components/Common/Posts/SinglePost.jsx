import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import Loading from '../../Loading/Loading';
import { Blog } from '../../../context/context';
import FollowBtn from '../../Home/UserToFollow/FollowBtn';
import { readTime } from '../../../utils/helper';
import moment from 'moment';
import SavedPosts from './Actions/SavedPosts';
import Actions from './Actions/Actions';
import Like from './Actions/Like';
import Comment from './Actions/Comment';
import SharePost from './Actions/SharePost';
import Recommended from './Recommended';
import Comments from '../Comments/Comments';

function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = Blog();
  const { title, desc, created, image, userImg, userId, username } = post;
  const navivate = useNavigate();
  // Fetch the post data using postId
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postRef = doc(db, 'posts', postId);
        const getPost = await getDoc(postRef);
        if (getPost.exists()) {
          const postData = getPost.data();
          if (postData?.userId) {
            const userRef = doc(db, 'users', postData.userId);
            const getUser = await getDoc(userRef);

            if (getUser.exists()) {
              const userData = getUser.data();
              setPost({ ...postData, ...userData, id: postId });
            }
          }
        }
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId, post?.userId]);

  console.log('SinglePost', post);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                onClick={() => navivate(`/profile/${userId}`)}
                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
                src={userImg}
                alt="user-img"
              />
              <div>
                <div className="capitalize">
                  <span>{username}</span>
                  {currentUser?.uid !== userId && <FollowBtn userId={userId} />}
                </div>
                <p className="text-sm text-gray-500 ">
                  {readTime({ ___html: desc })} min read .<span>{moment(created).fromNow()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-t border-gray-200">
              <div className="flex items-center gap-5">
                <Like postId={postId}/>
                <Comment />
              </div>
              <div className="flex items-center pt-2 gap-5">
                {post && <SavedPosts post={post} />}
                <SharePost />
                {currentUser?.uid === userId && <Actions postId={postId} />}
              </div>
            </div>
            <div className="mt-[3rem]">
              <img className="w-full h-[400px] object-cover" src={image} alt="post-img" />
            </div>
            <div className="mt-6" dangerouslySetInnerHTML={{ __html: desc }} />
          </section>
          {post && <Recommended post={post} />}
          <Comments postId={postId}/>
        </>
      )}
    </>
  );
}

export default SinglePost;
