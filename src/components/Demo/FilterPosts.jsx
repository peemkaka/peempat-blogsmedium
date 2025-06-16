import React from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../../context/context';
import Loading from '../Loading/Loading';
import PostCard from '../Common/Posts/PostCard';

function FilterPosts() {
  const { postData, postLoading } = Blog();

  const { tag } = useParams();
  const filteredData = postData.filter((post) => post.tags.includes(tag));

  return (
    <section className="size my-[2rem]">
      <div>
        <h3 className="text-3xl pb-6 border-b border-black mb-[3rem]">
          {filteredData.length ? 'Your Filtered Posts' : 'There is no post with this tag'}
        </h3>
        {postLoading ? (
          <Loading />
        ) : (
          <div className="lg:max-w-[60%] flex flex-col gap-[2rem]">
            {filteredData && filteredData.map((post, i) => <PostCard post={post} key={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}

export default FilterPosts;
