import React from 'react';
import Modal from '../../../utils/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Auth = ({ modal, setModal }) => {
  const [createUser, setCreateUser] = useState(false);
  const [signRequest, setSignRequest] = useState('');
  const navigate = useNavigate();

  const hidden = modal ? 'visible opacity-100' : 'invisible opacity-0';

  const googleAuth = async () => {
    try {
      const createUser = await signInWithPopup(auth, provider);
      const newUser = createUser.user;

      const ref = doc(db, 'users', newUser.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: '',
        });
        navigate('/');
        toast.success('User have been Signed in');
      }
      setModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal modal={modal} setModal={setModal} hidden={hidden}>
      <section
        className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem]
        overflow-auto right-0 md:right-[10rem] bg-white shadow-md
        transition-all duration-500
        ${hidden}
        `}
      >
        <button
          onClick={() => setModal(false)}
          className="absolute top-8 right-8 text-2xl hover:opacity-50"
        >
          <LiaTimesSolid />
        </button>
        <div className="flex flex-col justify-center items-center gap-[3rem]">
          {signRequest === '' ? (
            <>
              <h2 className="text-2xl pt-[5rem]">{createUser ? 'Join Medium' : 'Welcome Back'}</h2>
              <div className="flex flex-col gap-2 w-fit mx-auto">
                <Button
                  click={googleAuth}
                  icon={<FcGoogle className="text-xl" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} With Google`}
                />
                <Button
                  icon={<MdFacebook className="text-xl" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} With Facebook`}
                />
                <Button
                  click={() => setSignRequest(createUser ? 'sign-up' : 'sign-in')}
                  icon={<AiOutlineMail className="text-xl" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} With Mail`}
                />
              </div>
              <p>
                {createUser ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => setCreateUser(!createUser)}
                  className="text-green-600 hover:text-green-700 font-bold ml-1"
                >
                  {createUser ? 'Sign In' : 'Create one'}
                </button>
              </p>
            </>
          ) : signRequest === 'sign-in' ? (
            <SignIn setSignRequest={setSignRequest} />
          ) : signRequest === 'sign-up' ? (
            <SignUp setSignRequest={setSignRequest} />
          ) : null}
          <p className="md:w-[30rem] mx-auto text-center text-sm mb-[3rem]">
            Click “Sign In” to agree to Medium’s Terms of Service and acknowledge that Medium’s
            Privacy Policy applies to you.
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default Auth;

const Button = ({ icon, text, click }) => {
  return (
    <button
      onClick={click}
      className="flex items-center gap-10 sm:w-[20rem] border border-black
    px-3 py-2 rounded-full"
    >
      {icon} {text}
    </button>
  );
};
