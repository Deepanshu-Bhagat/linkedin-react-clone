import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Main from './Main';
import style from './Home.module.css';

const Home = () => { 
  return (
    <div className={style.container}>

      <section className={style.section}>
        <h5>
          <a>Hiring in a hurry? - </a>
        </h5>
        <p>
          Find talented pros in record time with Upwork and keep business
          moving.
        </p>
      </section>
      <div className={style.layout}>
        <LeftSide />
        <Main />
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
