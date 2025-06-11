import React, { useState } from 'react';
import ProfileHome from './Activities/ProfileHome';
import ProfileLists from './Activities/ProfileLists';
import ProfileAbout from './Activities/ProfileAbout';
import Modal from '../../../utils/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { discoverActions } from '../../../data';
import { IoSettingsSharp } from 'react-icons/io5';
import EditProfile from './EditProfile';
import { Blog } from '../../../context/context';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const Profile = () => {
  const { allUsers } = Blog();
  const { userId } = useParams();

  const activites = [
    {
      title: 'Home',
      comp: ProfileHome,
    },
    {
      title: 'Lists',
      comp: ProfileLists,
    },
    {
      title: 'About',
      comp: ProfileAbout,
    },
  ];

  const [currentActive, setCurrentActive] = useState(activites[0]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { data, loading } = useFetch('users');
  const getUserData = data && data.find((user) => user.id === userId);

  return (
    <section className="size flex gap-[4rem] relative">
      {/*user activites*/}
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">{getUserData?.username}</h2>
          <p className="text-gray-500 text-xs sm:text-sm">Followers (2)</p>
          <p className="text-gray-500 text-xs sm:text-sm">Followings (2)</p>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
          {activites.map((item, i) => (
            <div key={i} className="cursor-pointer py-[0.5rem] ">
              <button
                onClick={() => setCurrentActive(item)}
                className={`${item.title === currentActive.title ? 'border-b border-gray-500' : ''}`}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp getUserData={getUserData} setEditModal={setEditModal} />
      </div>
      <button
        onClick={() => setModal(true)}
        className="fixed top-1/2 right-0 -translate-y-1/2 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
      >
        <IoSettingsSharp />
      </button>
      {/*user details*/}
      <Modal modal={modal} setModal={setModal}>
        <div
          className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed right-0 bottom-0 top-0 w-[18rem] md:relative bg-white
            ${modal ? 'translate-x-0' : 'translate-x-[100%] md:translate-x-0'}
            transition-all duration-500`}
        >
          {/* icons to close out modal */}
          <div className="pb-4 text-right">
            <button className="inline-block md:hidden" onClick={() => setModal(false)}>
              <LiaTimesSolid />
            </button>
          </div>
          {/* profile details */}
          <div className="sticky top-7 flex flex-col justify-between">
            <img
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
              src="/profile.jpg"
              alt="profileImg"
            />
            <h2 className="py-2 font-bold capitalize">{getUserData?.username || 'Has no user'}</h2>
            <p className="text-gray-500 first-letter:uppercase text-sm">
              {getUserData?.bio || 'Users Has no bio'}
            </p>
            <button
              onClick={() => setEditModal(true)}
              className="text-green-700 pt-6 text-sm w-fit"
            >
              Edit Profile
            </button>
            {/* nav */}
            <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
              {discoverActions.map((item) => (
                <button key={item} className="text-xs text-black1 ">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      {editModal && (
        <EditProfile getUserData={getUserData} editModal={editModal} setEditModal={setEditModal} />
      )}
    </section>
  );
};

export default Profile;
