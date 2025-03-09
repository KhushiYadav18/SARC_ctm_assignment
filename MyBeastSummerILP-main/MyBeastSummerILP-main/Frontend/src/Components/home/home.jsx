import { useEffect, useState } from 'react';
import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/home.module.css';
import LazyLoad from 'react-lazyload';
import CardCarousel from './SneakPeak';
import asmpTrailerMp4 from '../../assets/videos/ASMPkatrailer.mp4';
import asmpTrailerWebm from '../../assets/videos/ASMPkaTrailer.webm';

import { Team } from './Team';
import FAQs from './Faqs';
import NavBar from '../navBar';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import homepagemain from './homepagemain.png';
import homepagerel from './homepagerel.png';


function Home() {

  return (
    <>
      <div className={styles.home}>
        <div className={styles.mainSection}>

          <div className={styles.homeleft}>
            <h1 className={styles.ilpheading}>
              Industrial <br /> Learning <br /> Program
            </h1>
          </div>

          <div  className={styles.homeright}>
            <img  src={homepagemain} alt="" />
          </div>

        </div>

       {
        localStorage.getItem('accessToken') === null && (<div style={{width:"100vw", display:"flex", justifyContent:"center", marginTop:"-5vh"}}>
        <a href="/register"><button style={{backgroundColor:"#003936", border:"1px solid white", width:"150px"}}>Register Now</button></a>
      </div>)
       }

          <div className={styles.about}>
            <h1 className={styles.whatilp}>What is ILP</h1>
            <p>The Industrial Learning Program is one of the initiatives of the Student Alumni Relations Cell aimed at providing the students with opportunities to use their academic expertise in solving real life problems offered by the distinguished IIT-B Alumni. This year ILP brings 30+ Projects in its Summer Iteration. This is a unique opportunity for students to get real industrial exposure in several core and non core fields. Alumni from various sectors float projects/problems to be solved by the students with their knowledge and expertise. The selected students get rewarded by the alumni via certificates and stipend for the winter internships provided.</p>
            <p>Here is the rule book which includes the procedure for signing up for the program and the rewards/penalties. <a href=" https://docs.google.com/document/d/1-k4IWNJPfoR92IOb3pqOBUyEuOg5DxLqtbCmKpUS3vA/edit?usp=drivesdk">ILP RuleBook</a> </p>
          </div>


        <div id='faqs' className={styles.Faqs}>
          <FAQs />
        </div>



        <div id='team' className={styles.team}>
          <Team />
        </div>

      </div></>
  );
}

export default Home;
