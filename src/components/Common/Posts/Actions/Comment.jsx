import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { Blog } from '../../../../context/context';

function Comment() {
  const { setShowComment, commentLength } = Blog();
  return (
    <button
      onClick={() => setShowComment(true)}
      className="flex items-center gap-1 text-sm py-[0.5rem]"
    >
      <FaRegComment className="text-xl" />
      <span>{commentLength}</span>
    </button>
  );
}

export default Comment;
