import React, { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebase';
import Input from '../../../utils/Input';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SignUp = ({ setSignRequest, setModal }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form[('username', 'email', 'password', 'rePassword')] === '') {
      toast.error('All fields are required');
    } else if (form['password'] !== form['rePassword']) {
      toast.error('Your passwords are not matching!!');
      return;
    } else {
      setLoading(true);
      try {
        // ใช้ Firebase Authentication เพื่อสร้างผู้ใช้ใหม่ด้วยอีเมลและรหัสผ่าน
        const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

        const ref = doc(db, 'users', user.uid);
        const userDoc = await getDoc(ref);

        // เช็คว่าผู้ใช้มีอยู่ใน Firestore หรือไม่
        // ถ้าไม่มีให้สร้างเอกสารใหม่ใน Firestore
        if (!userDoc.exists()) {
          await setDoc(ref, {
            userId: user.uid,
            username: form.username,
            email: form.email,
            userImg: '',
            bio: '',
            created: Date.now(),
          });
          navigate('/');
          toast.success('New Account has been Created');
          setModal(false);
          setLoading(false);
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('This email is already registered. Please use a different email.');
        } else {
          toast.error(error.message);
        }
        setLoading(false); // ให้แก้ไข form ต่อได้
      }
    }
  };
  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign Up with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a magic link to your
        inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input form={form} setForm={setForm} type="text" title="username" />
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <Input form={form} setForm={setForm} type="password" title="rePassword" />
        <button
          className={`px-4 py-1 text-sm rounded-full bg-green-700
      hover:bg-green-800 text-white w-fit mx-auto
      ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Sign Up
        </button>
      </form>
      <button
        onClick={() => setSignRequest('')}
        className="mt-5 text-sm text-green-600 hover:text-green-700
    flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All sign up Options
      </button>
    </div>
  );
};

export default SignUp;
