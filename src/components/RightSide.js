import React from 'react';
import style from './RightSide.module.css';
import FeedIcon from '../assets/feed-icon.svg';
import RightIcon from '../assets/right-icon.svg';

const Rightside = () => {
  return (
    <div className={style.container}>
      <div className={style.followCard}>
        <div className={style.title}>
          <h2>Add to your feed</h2>
          <img src={FeedIcon} alt='feed' />
        </div>

        <ul  className={style.feedList}>
          <li>
            <a>
              <div className={style.avatar} />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <div className={style.avatar} />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </ul>

        <a className={style.recommendation}>
          View all recommendations
          <img src={RightIcon} alt='right' />
        </a>
      </div>
      <div className={`${style.followCard} ${style.bannerCard}`}>
        <img
          src='https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg'
          alt=''
        />
      </div>
    </div>
  );
};

export default Rightside;
