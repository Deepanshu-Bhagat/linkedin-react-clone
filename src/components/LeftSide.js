import React from 'react';
import style from './LeftSide.module.css';
import WidgetIcon from '../assets/widget-icon.svg';
import ItemIcon from '../assets/item-icon.svg';
import PlusIcon from '../assets/plus-icon.svg';
import { useSelector } from 'react-redux';

const Leftside = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.userInfo}>
          <div className={style.cardBackground}></div>
          <a>
            <div className={style.photo} />
            <div className={style.link}>
              Welcome, {user ? user.name : 'there!'}
            </div>
          </a>
          <a>
            <div className={style.photoText}>Add a photo</div>
          </a>
        </div>
        <div className={style.widget}>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src={WidgetIcon} alt='widget' />
          </a>
        </div>
        <a className={style.item}>
          <span>
            <img src={ItemIcon} alt='item-icon' />
            My Items
          </span>
        </a>
      </div>

      <div className={`${style.card} ${style.communityCard}`}>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src={PlusIcon} alt='plus-icon' />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </div>
    </div>
  );
};

export default Leftside;
