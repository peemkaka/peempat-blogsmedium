import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../../utils/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

function EditProfile({ editModal, setEditModal, getUserData }) {
  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: '',
    userImg: '',
    bio: '',
  });

  const btn = 'border border-green-600 py-2 px-5 rounded-full text-green-600';

  const openFile = () => {
    imgRef.current.click();
  };

  // if there is data inside our database
  useEffect(() => {
    if (getUserData) {
      setForm(getUserData);
    } else {
      setForm({
        username: '',
        userImg: '',
        bio: '',
      });
    }
  }, []);

  // เพิ่มฟังก์ชันแปลงไฟล์เป็น base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl(reader.result); // base64 string
      setForm({ ...form, userImg: reader.result }); // เก็บ base64 ใน form.userImg
    };
    reader.readAsDataURL(file);
  };

  const saveForm = async () => {
    if (form['username'] === '' || form['bio'] === '') {
      toast.error('All inputs are required !!!');
      return;
    }
    setLoading(true);

    // ใช้ base64 จาก form.userImg ถ้ามี, ถ้าไม่มีใช้ของเดิม
    let imageUrl = form.userImg || getUserData?.userImg || '/profile.jpg';

    try {
      const defRef = doc(db, 'users', getUserData?.userId);
      await updateDoc(defRef, {
        bio: form.bio,
        username: form.username,
        userImg: imageUrl,
        userId: getUserData?.userId,
      });
      setLoading(false);
      setEditModal(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      setLoading(false);
      return;
    }
  };

  return (
    <Modal modal={editModal} setModal={setEditModal}>
      <div
        className="center w-[95%] md:w-[45rem] bg-white mx-auto shadow-xl
      my-[1rem] z-20 mb-[3rem] p-[2rem]
      "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Profile Information</h2>
          <button onClick={() => setEditModal(false)} className="text-xl text-gray-500">
            <LiaTimesSolid />
          </button>
        </div>
        <section className="mt-6">
          <p className="pb-3 text-sm text-gray-500">Photo</p>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem]">
              <img
                className="min-h-[5rem] min-w-[5rem] 
                    object-cover border border-gray-4
                    rounded-full"
                src={imgUrl || form.userImg || '/profile.jpg'}
                alt="profile-img"
              />
              <input
                onChange={handleImageChange}
                accept="image/jpg, image/png, image/jpeg"
                ref={imgRef}
                type="file"
                hidden
              />
            </div>
            <div>
              <div className="flex gap-4 text-sm">
                <button onClick={openFile} className="text-green-600">
                  Update
                </button>
              </div>
              <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                Recommended size: 400x400 pixels. Maximum file size: 2MB. Supported formats: JPG,
                PNG.
              </p>
            </div>
          </div>
        </section>
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor="">
            Name*
          </label>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
            type="text"
            placeholder="username..."
            name=""
            id=""
            className="p-1 border-b border-black w-full outline-none"
            maxLength={50}
          />
          <p className="text-sm text-gray-600 pt-2">
            Your name will be displayed on your profile and in search results.
          </p>
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor="">
              Bio*
            </label>
            <input
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              type="text"
              placeholder="bio..."
              name=""
              id=""
              className="p-1 border-b border-black w-full outline-none"
              maxLength={50}
            />
            <p className="text-sm text-gray-600 pt-2">
              A short description about yourself. This will be displayed on your profile.
            </p>
          </section>
        </section>
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button onClick={() => setEditModal(false)} className={btn}>Cancel</button>
          <button onClick={saveForm} className={`${btn} bg-green-800 text-white`}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfile;
