import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Blog } from '../../../context/context';

function EditPost() {
  const { updatedData, setTitle, setDescription, title, description } = Blog();

  useEffect(() => {
    if (updatedData) {
      setTitle(updatedData.title || '');
      setDescription(updatedData.description || '');
    }
  }, []);

  return (
    <section className="write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
      <input
        type="text"
        placeholder="Title..."
        className="text-4xl outline-none w-full"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <ReactQuill
        placeholder="Description..."
        className="!text-[4rem] !my-3"
        theme="bubble"
        onChange={(value) => setDescription(value)}
        value={description}
      />
    </section>
  );
}

export default EditPost;
