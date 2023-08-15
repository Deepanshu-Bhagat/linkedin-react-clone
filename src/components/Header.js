import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAPI } from '../store/login-actions';
import { useNavigate } from 'react-router-dom';

import style from './Header.module.css';
import HomeLogo from '../assets/home-logo.svg';
import SerchIcon from '../assets/search-icon.svg';
import NavHome from '../assets/nav-home.svg';
import NetworkLogo from '../assets/nav-network.svg';
import JobLogo from '../assets/nav-jobs.svg';
import MessageLogo from '../assets/nav-messaging.svg';
import NotificationLogo from '../assets/nav-notifications.svg';
import User from '../assets/user.svg';
import Dropdown from '../assets/down-icon.svg';
import WorkLogo from '../assets/nav-work.svg';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const signOut = () => {
    dispatch(signOutAPI());
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <span className={style.logo}>
          <a href='/home'>
            <img src={HomeLogo} alt='home-logo' />
          </a>
        </span>
        <div className={style.search}>
          <div>
            <input type='text' placeholder='Search' />
          </div>
          <div className={style.searchIcon}>
            <img src={SerchIcon} alt='serch-icon' />
          </div>
        </div>
        <nav className={style.nav}>
          <ul className={style.navListWrap}>
            <li className={`${style.navList} ${style.active}`}>
              <a>
                <img src={NavHome} alt='nav-home' />
                <span>Home</span>
              </a>
            </li>
            <li className={style.navList}>
              <a>
                <img src={NetworkLogo} alt='network-logo' />
                <span>My Network</span>
              </a>
            </li>
            <li className={style.navList}>
              <a>
                <img src={JobLogo} alt='job-logo' />
                <span>Jobs</span>
              </a>
            </li>
            <li className={style.navList}>
              <a>
                <img src={MessageLogo} alt='message-logo' />
                <span>Messaging</span>
              </a>
            </li>
            <li className={style.navList}>
              <a>
                <img src={NotificationLogo} alt='notifiation' />
                <span>Notifications</span>
              </a>
            </li>
            <li className={`${style.navList} ${style.user}`}>
              <a>
                {user && user.image ? (
                  <img src={user.image} alt={user.name} />
                ) : (
                  <img src={User} alt='user-logo' />
                )}

                <span>
                  Me
                  <img
                    src={Dropdown}
                    alt='dropdown'
                    className={style.dropdownImg}
                  />
                </span>
              </a>
              <div className={style.signOut}>
                <a onClick={signOut}>Sign Out</a>
              </div>
            </li>
            <li className={`${style.navList} ${style.user} ${style.work}`}>
              <a>
                <img src={WorkLogo} alt='work-logo' />
                <span>
                  Work
                  <img src={Dropdown} alt='dropdown' />
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
