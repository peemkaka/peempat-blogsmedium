import React, { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import Input from '../../../utils/Input';

const SignIn = ({ setSignRequest }) => {
  const navigate = useNavigate();
  // ข้อมูลฟอร์มสำหรับการเข้าสู่ระบบ
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ตรวจสอบว่าฟิลด์อีเมลและรหัสผ่านไม่ว่างเปล่า
    if (form[('email', 'password')] === '') {
      toast.error('All fields are required!!!');
    }
    try {
      // ใช้ Firebase Authentication เพื่อเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน
      // signInWithEmailAndPassword เป็นฟังก์ชันที่ใช้สำหรับการเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน
      // auth เป็นตัวแทนของ Firebase Authentication ที่ถูกสร้างขึ้นในไฟล์ firebase.js
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/');
      toast.success('User has been logged in ');
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign in with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a magic link to your
        inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <button
          className={`px-4 py-1 text-sm rounded-full bg-green-700
      hover:bg-green-800 text-white w-fit mx-auto
      ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Sign In
        </button>
      </form>
      <button
        onClick={() => setSignRequest('')}
        className="mt-5 text-sm text-green-600 hover:text-green-700
    flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All sign In Options
      </button>
    </div>
  );
};

export default SignIn;
