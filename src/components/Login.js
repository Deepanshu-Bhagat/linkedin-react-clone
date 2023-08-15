import React, { useEffect } from 'react';
import LinkedinLogo from '../assets/login-logo.svg';
import HeroImg from '../assets/login-hero.svg';
import GoogleLogo from '../assets/google.svg';
import style from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInAPI } from '../store/login-actions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const googleSignIn = () => {
    dispatch(signInAPI());
  };
  useEffect(() => {
    if (user) {
      navigate('/home');
    } 
  }, [user, navigate]);

  return (
    <div className={style.container}>
      <nav>
        <a href='/'>
          <img src={LinkedinLogo} alt='linkedin-logo' />
        </a>
        <div>
          <a href='#' className={style.joinNow}>
            Join now
          </a>
          <a href='#' className={style.signin}>
            Sign in
          </a>
        </div>
      </nav>
      <section className={style.section}>
        <div className={style.hero}>
          <h1>Welcome to your professional community</h1>
          <img src={HeroImg} alt='hero-img' />
        </div>
        <div className={style.form}>
          <button className={style.google} onClick={googleSignIn}>
            <img src={GoogleLogo} alt='google-logo' />
            Sign in with Google
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
