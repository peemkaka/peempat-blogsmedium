import React from 'react';
import useFetch from '../../../hooks/useFetch';
import { readTime } from '../../../utils/helper';
import moment from 'moment';
import SavedPosts from './Actions/SavedPosts';
import Loading from '../../Loading/Loading';
import Actions from './Actions/Actions';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../../../context/context';

function PostCard({ post }) {
  const { currentUser } = Blog();
  const { title, desc, created, image, id: postId, userId } = post; // เปลี่ยน postImg เป็น image
  const { data, loading } = useFetch('users');
  const getUserData = data && data.find((user) => user.id === userId);

  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/post/${postId}`);
  };  

  console.log('post',postId)

  return (
    <section>
      <div onClick={handlePostClick} className="flex flex-col sm:flex-row gap-4 cursor-pointer">
        {loading && <Loading />}
        <div className="flex-[2.5]">
          <p className="pb-2 font-semibold capitalize">{getUserData?.username}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">{title}</h2>
          <div
            className="py-1 text-gray-500 line-clamp-3 leading-5"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          {/* แสดงรูป */}
        </div>
        <div className="flex-[1]">
          {image && <img src={image} alt="post" className="w-[53rem] h-[9rem] object-cover" />}
        </div>
      </div>
      <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-600">
          {readTime({ ___html: desc })} min read . {moment(created).format('MMM DD')}
        </p>
        <div className="flex items-center gap-3">
          <SavedPosts post={post} getUserData={getUserData} />
          {currentUser?.uid === userId && <Actions title={title} desc={desc} postId={postId} />}
        </div>
      </div>
    </section>
  );
}

export default PostCard;
