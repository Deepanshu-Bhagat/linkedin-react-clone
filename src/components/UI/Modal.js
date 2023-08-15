import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postArticleAPI } from '../../store/article-actions';
import ReactPlayer from 'react-player';

import style from './Modal.module.css';
import CloseBtn from '../../assets/closeBtn.svg';
import UserIcon from '../../assets/user.svg';
import PhotoIcon from '../../assets/share-img.svg';
import VideoIcon from '../../assets/share-video.svg';
import Comment from '../../assets/share-comment.svg';

const Modal = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [editorText, setEditorText] = useState('');
  const [shareImg, setShareImg] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const [assetArea, setAssetArea] = useState('');

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;

    const payload = {
      image: shareImg,
      video: videoLink,
      description: editorText,
      timeStamp: new Date(Date.now()),
      user: user,
    };
    dispatch(postArticleAPI(payload)); 
    closeModalHandler(e);
  };

  const imageUploadHandler = (e) => {
    const image = e.target.files[0];
    if (!image) {
      alert(`couldn't upload an video`);
      return;
    }
    setShareImg(image);
  };
  const videoUploadHandler = (e) => {
    const video = e.target.files[0];
    if (!video || video.size > 20000000) {
      alert(`Couldn't upload, video size should be < 20mb`);
      return;
    }
    setVideoLink(video);
  };

  const changeAssetArea = (area) => {
    setShareImg(null);
    setVideoLink(null);
    setAssetArea(area);
  };

  const editorTextHandler = (e) => {
    setEditorText(e.target.value);
  };

  const closeModalHandler = (e) => {
    if (e.target !== e.currentTarget) return;
    setEditorText('');
    setShareImg(null);
    setVideoLink(null);
    setAssetArea('');
    props.onClose();
  };
  return (
    <div className={style.container} onClick={closeModalHandler}>
      <div className={style.content}>
        <div className={style.header}>
          <h2>Create a post</h2>
          <button onClick={closeModalHandler}>
            <img src={CloseBtn} alt='close-btn' />
          </button>
        </div>
        <div className={style.sharedContent}>
          <div className={style.userInfo}>
            {user ? (
              <img src={user.image} alt='user' />
            ) : (
              <img src={UserIcon} alt='user' />
            )}
            <span>{user ? user.name : 'Name'}</span>
          </div>
          <div className={style.editor}>
            <textarea
              value={editorText}
              placeholder='What do you, want to talk about!'
              onChange={editorTextHandler}
            />
            <div className={style.uploadContent}>
              {assetArea === 'image' && (
                <>
                  <p>
                    <label
                      htmlFor='image'
                      style={{
                        color: '#00478d',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Upload an image
                    </label>
                  </p>
                  <input
                    type='file'
                    name='image'
                    id='image'
                    accept='image/gif, image/jpeg, image/jpg, image/png'
                    style={{ display: 'none' }}
                    onChange={imageUploadHandler}
                  />
                  {shareImg && (
                    <img src={URL.createObjectURL(shareImg)} alt='shared-img' />
                  )}
                </>
              )}
              {assetArea === 'video' && (
                <>
                  <p>
                    <label
                      htmlFor='video'
                      style={{
                        color: '#00478d',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Upload a video
                    </label>
                  </p>
                  <input
                    type='file'
                    name='video'
                    id='video'
                    accept='video/*'
                    onChange={videoUploadHandler}
                    style={{ display: 'none' }}
                  />
                  {videoLink && (
                    <ReactPlayer
                      url={URL.createObjectURL(videoLink)}
                      width={'100%'}
                      controls={true}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={style.shareCreation}>
          <div className={style.attachAssets}>
            <button
              className={style.assetBtn}
              onClick={() => changeAssetArea('image')}
            >
              <img src={PhotoIcon} alt='share-img' />
            </button>
            <button
              className={style.assetBtn}
              onClick={() => changeAssetArea('video')}
            >
              <img src={VideoIcon} alt='share-video' />
            </button>
          </div>

          <div className={style.shareComment}>
            <button className={style.assetBtn}>
              <img src={Comment} alt='share-comment' />
              Anyone
            </button>
          </div>

          <button
            className={style.postBtn}
            disabled={
              !shareImg && !videoLink ? true : false //!editorText.trim() &&
            }
            onClick={(e) => {
              postArticle(e);
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
