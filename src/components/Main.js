import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArticleAPI } from '../store/article-actions';
import ReactPlayer from 'react-player';
import Modal from './UI/Modal';

import style from './Main.module.css';
import UserIcon from '../assets/user.svg';
import PhotoIcon from '../assets/gallery.png';
import VideoIcon from '../assets/video.png';
import EventIcon from '../assets/calendar.png';
import Article from '../assets/article.png';
import Ellipsis from '../assets/ellipsis.svg';
import LikeImg from '../assets/like.svg';
import Clapping from '../assets/clapping.svg';
import Like from '../assets/like-icon.svg';
import Share from '../assets/share.svg';
import Comment from '../assets/comments.svg';
import Send from '../assets/send.svg';
import Spinner from '../assets/spinner.svg';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.article.loading);
  const articles = useSelector((state) => state.article.articles);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getArticleAPI());
  }, [dispatch]);

  const showModalHandler = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={style.container}>
      <div className={`${style.shareBox} ${style.commonCard}`}>
        <div>
          {user && user.image ? (
            <img src={user.image} alt='user-icon' />
          ) : (
            <img src={UserIcon} alt='user-icon' />
          )}
          <button disabled={loading} onClick={showModalHandler}>
            Start a Post
          </button>
        </div>

        <div>
          <button>
            <img src={PhotoIcon} alt='photoIcon' />
            <span>Photo</span>
          </button>
          <button>
            <img src={VideoIcon} alt='video-icon' />
            <span>Video</span>
          </button>
          <button>
            <img src={EventIcon} alt='event-icon' />
            <span>Event</span>
          </button>
          <button>
            <img src={Article} alt='article-icon' />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {articles.length === 0 ? (
        <p
          style={{
            fontSize: '1.6rem',
            fontWeight: '600',
            color: '#005db9',
            margin: '3rem ',
            textAlign: 'center',
          }}
        >
          Add your First Post
        </p>
      ) : (
        <div className={style.content}>
          {loading && (
            <img src={Spinner} alt='loading' className={style.spinner} />
          )}

          {articles.length > 0 &&
            articles.map((article) => (
              <div
                key={article.id}
                className={`${style.commonCard} ${style.article}`}
              >
                <div className={style.sharedActor}>
                  <a>
                    <img src={article.actor.image} alt='user-img' />
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      <span>
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <img src={Ellipsis} alt='' />
                  </button>
                </div>
                <div className={style.description}>{article.description}</div>

                <div className={style.sharedImg}>
                  <a>
                    {article.shareImg && !article.video && (
                      <img src={article.shareImg} alt='' />
                    )}
                    {article.video && !article.shareImg && (
                      <ReactPlayer
                        url={article.video}
                        width={'100%'}
                        controls={true}
                      />
                    )}
                  </a>
                </div>

                <ul className={style.socialCounts}>
                  <li>
                    <button>
                      <img src={LikeImg} alt='like' />
                      <img src={Clapping} alt='clapping' />
                      <span>75</span>
                    </button>
                  </li>
                  <li>
                    <a>{article.comments} comments</a>
                  </li>
                </ul>

                <div className={style.socialActions}>
                  <button>
                    <img src={Like} alt='like-icon' />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src={Comment} alt='comment-icon' />
                    <span>Comment</span>
                  </button>
                  <button>
                    <img src={Share} alt='share-icon' />
                    <span>Share</span>
                  </button>
                  <button>
                    <img src={Send} alt='send-icon' />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {showModal && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Main;
