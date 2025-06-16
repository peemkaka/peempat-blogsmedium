import React from 'react';
import { Blog } from '../../context/context';
import { BsGraphUpArrow } from 'react-icons/bs';
import moment from 'moment';
import { readTime } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const { postData } = Blog();
  const trendingPosts = postData && postData?.sort((a, b) => b.pageviews - a.pageviews);
  return (
    <section className="border-b border-gray-600">
      <div className="size py-[2rem]">
        <div className="flex items-center gap-3 font-semibold">
          <span>
            <BsGraphUpArrow />
          </span>
          <h2>Trending on Medium</h2>
        </div>
        <div className="grid grid-cols-card gap-3">
          {trendingPosts?.slice(0, 6).map((trend, i) => (
            <Trend key={i} trend={trend} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;

const Trend = ({ trend, index }) => {
  const navigate = useNavigate();

  return (
    <main className="flex gap-4 w-full">
      <span className="text-gray-400 text-4xl mt-4">{index + 1}</span>
      <div className="py-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-75">
            <img
              className="w-[1.3rem] h-[1.3rem] object-cover rounded-full"
              src={trend.image}
              alt="user-image"
            />
            <h2 className="font-semibold text-sm capitalize">{trend?.username}</h2>
          </div>
        </div>
        <div
          className="flex flex-col gap-4 cursor-pointer hover:opacity-75"
          onClick={() => navigate(`/post/${trend?.id}`)}
        >
          <p className="w-full md:w-[18rem] text-md font-bold line-clamp-2">{trend.title}</p>
          <p className="text-gray-500 text-xs">
            {trend.createdAt?.toDate
              ? moment(trend.createdAt.toDate()).format('MMM YY')
              : moment(new Date(trend.createdAt)).isValid()
                ? moment(new Date(trend.createdAt)).format('MMM YY')
                : ''}
            {` ${readTime(trend.desc)} min read`}
          </p>
        </div>
      </div>
    </main>
  );
};
