import React, { useState } from 'react';
import { saveToLocalStorage } from '../utils/localStorage';
import { FaUser } from 'react-icons/fa'; // Font Awesome의 사람 아이콘 가져오기
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    saveToLocalStorage('user', { email, password });
    alert('Signed In Successfully!');
  };

  return (
    <div className="signin">
      <h1>Sign In</h1>
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleSignIn}>
        <FaUser /> {/* 사람 아이콘 추가 */}
        Sign In
      </button>
    </div>
  );
};

export default SignIn;