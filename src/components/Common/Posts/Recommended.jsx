import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import { readTime } from '../../../utils/helper';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Recommended({ post: singlePost }) {
  const { data } = useFetch('posts');
  const [commonTags, setCommonTags] = useState([]);

  useEffect(() => {
    let recommendedPost = [];
    data &&
      data.forEach((post) => {
        if (post.id === singlePost?.id) return;
        const postTag = post?.tags || [];
        const commonTags = postTag.filter((tag) => singlePost?.tags?.includes(tag));
        if (commonTags.length > 0) {
          recommendedPost.push({ ...post, commonTags });
        }
      });
    recommendedPost.sort(() => Math.random() * -0.5);
    const minRecommendation = 4;
    const slicePost = recommendedPost.slice(0, minRecommendation);
    setCommonTags(slicePost);
  }, [data, singlePost]);
  return (
    <section className="bg-gray-100">
      <div className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]">
        <h2 className="text-xl font-bold">Recommended from Medium</h2>
        {commonTags.length === 0 ? (
          <p>No recommended posts found based on your preference</p>
        ) : (
          <div className="grid grid-cols-card gap-[2rem] my-[3rem]">
            {commonTags.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Recommended;

const Post = ({ post }) => {
  const navigate = useNavigate();

  const { title, desc, createdAt, image, id: postId, userId } = post;
  const { data } = useFetch('users');
  console.log('data', data);
  const user = data && data.find((user) => user?.id === userId);
  console.log('user', user);
  const username = user?.username || 'Unknown';
  const userImg = user?.userImg || '/profile.jpg';
  return (
    <div onClick={() => navigate(`/post/${postId}`)} className="w-full cursor-pointer ">
      <img className="w-full h-[200px] object-cover" src={image} alt="postImg" />
      <div className="flex items-center gap-1 py-1">
        <img className="w-[2rem] h-[2rem] object-cover rounded-full" src={userImg} alt="userImg" />
        <h3 className="text-sm capitalize">{username}</h3>
      </div>
      <h2 className="font-extrabold leading-5 line-clamp-2">{title}</h2>
      <div
        className="line-clamp-2 my-3 text-gray-500 leading-5"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <p className="text-sm text-gray-600">
        {readTime({ __html: desc })} min read .
        <span className="ml-3">
          {createdAt?.toDate() ? moment(createdAt.toDate()).format('MMM DD') : ''}
        </span>
      </p>
    </div>
  );
};
