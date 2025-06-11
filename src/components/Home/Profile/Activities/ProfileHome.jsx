import React from 'react';
import { Blog } from '../../../../context/context';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../Loading/Loading';
import PostCard from '../../../Common/Posts/PostCard';

const ProfileHome = ({ getUserData }) => {
  const { currentUser } = Blog();
  const { data, loading } = useFetch('posts');
  const userPost = data?.filter((post) => post.userId === getUserData?.userId);
  console.log(userPost)
  return (
    <div className="flex flex-col gap-5 mb-[4rem]">
      {userPost?.length === 0 && (
        <p className="text-gray-500">
          <span className="capitalize">{getUserData?.userName} has no posts</span>
        </p>
      )}
      {loading ? (
        <Loading />
      ) : (
        userPost?.map((post, i) => {
          return <PostCard post={post} key={i} />;
        })
      )}
    </div>
  );
};

export default ProfileHome;
