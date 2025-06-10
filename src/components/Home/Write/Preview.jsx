import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import ReactQuill from 'react-quill';
import TagsInput from 'react-tagsinput';
import { toast } from 'react-toastify';
import { Blog } from '../../../Context/Context';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/firebase';

function Preview({ setPublish, description, title }) {
  const imageRef = useRef(null);
  const [imageBase64, setImageBase64] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState('');
  const { currentUser } = Blog();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState({
    title: title || '',
    photo: null,
  });

  useEffect(() => {
    if ((title, description)) {
      setPreview({ ...preview, title });
      setDesc(description);
    } else {
      setPreview({ ...preview, title: '' });
      setDesc('');
    }
  }, [title, description]);

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
      setImageUrl(reader.result);
      setPreview({ ...preview, photo: file });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (preview.title === '' || desc === '') {
        toast.error('All fields are required');
        return;
      }
      if (preview.title.length < 15) {
        toast.error('Title must be at least 15 characters long');
        return;
      }
      const postsRef = collection(db, 'posts');
      await addDoc(postsRef, {
        userId: currentUser?.uid,
        title: preview.title,
        desc: desc,
        tags: tags,
        createdAt: new Date(),
        pageViews: 0,
        image: imageBase64, // base64 string
      });
      toast.success('Post has been submitted successfully');
      navigate('/');
      setPublish(false);
      setPreview({ title: '', photo: null });
    } catch (error) {
      console.error('Error submitting the post:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="absolute inset-0 bg-white z-30">
      <div className="size my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute cursor-pointer right-[1rem]
         md:right-[5rem] top-[3rem] text-2xl"
        >
          <LiaTimesSolid />
        </span>
        {/* Preview the text */}
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h3>Story Preview</h3>
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              onClick={handleClick}
              className="w-full h-[200px] object-cover bg-gray-100 my-3 grid place-items-center
            cursor-pointer bg-cover bg-no-repeat"
            >
              {!imageUrl && <span className="text-gray-500">Click to add an image</span>}
            </div>
            <input
              onChange={handleImageChange}
              ref={imageRef}
              type="file"
              hidden
            />
            <input
              type="text"
              placeholder="Title"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={preview.title}
              onChange={(e) => setPreview({ ...preview, title: e.target.value })}
            />
            <ReactQuill
              theme="bubble"
              value={desc}
              onChange={setDesc}
              placeholder="Tell Your Story..."
              className="outline-none w-full border-b border-gray-300 py-2"
            />
            <p className="text-gray-500 pt-4 text-sm">
              <span className="font-bold">Note:</span> This is a preview of your story. You can add
              images, links, and format your text here.
            </p>
          </div>
          <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
            <h3 className="text-2xl">
              Publishing to: <span className="font-bold">Peempat Pinsang</span>
            </h3>
            <p>Add or change topics up to 5 so readers know what your story is about</p>
            <TagsInput value={tags} onChange={setTags} />
            <button onClick={handleSubmit} className="btn !bg-green-800 !w-fit !text-white">
              {loading ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Preview;
