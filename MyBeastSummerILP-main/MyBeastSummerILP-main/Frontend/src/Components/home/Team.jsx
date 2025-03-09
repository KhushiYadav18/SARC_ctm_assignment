import React, { useState } from 'react';
import '../styles/Team.css';
import { Helmet } from 'react-helmet';
import garv from '../../assets/images/Team/garv.jpg';
import agrj from '../../assets/images/Team/agrajah.jpeg';

import kairabi from '../../assets/images/Team/Kairabi Ghosh.jpg';
import Shivendra from '../../assets/images/Team/Shivendra.jpg';
import Samyak from '../../assets/images/Team/Samyak Zade.jpg';
import Saksham from '../../assets/images/Team/Saksham.jpg';
import Neha from '../../assets/images/Team/Neha Pedgaonkar.jpg';
import Manoj_Singh from '../../assets/images/Team/Manoj_Singh.jpg';
import Maitreyee from '../../assets/images/Team/Maitreyee Tengshe_.png';
import Kartik from '../../assets/images/Team/Kartik Vaishnav.jpg';
import Joy from '../../assets/images/Team/Joy.jpg';
import Ishan_Grover from '../../assets/images/Team/Ishan_Grover.jpg';
import Harit_Gangwani from '../../assets/images/Team/Harit Gangwani.jpg';
import Daya from '../../assets/images/Team/Daya Swaroop Chavali_.jpg';
import Dhruv from '../../assets/images/Team/dhuv.jpeg';
import Bishal from '../../assets/images/Team/Bishal Prabhat.jpeg';
import Bhakti from '../../assets/images/Team/Bhakti Joshi.jpg';
import Ashlesha from '../../assets/images/Team/Ashlesha Shelke .jpg';
import Aryan_Kumar from '../../assets/images/Team/Aryan_Kumar.jpg';
import Anurag_Pachgade from '../../assets/images/Team/Anurag_Pachgade.jpg';
import Aditya_Singh from '../../assets/images/Team/Aditya Singh.png';
import Aditya_Aryan from '../../assets/images/Team/Aditya Aryan.jpg';


import '@fortawesome/fontawesome-free/css/all.min.css';

export const Team = () => {
    return (
        <body>
            <div className="center">
                <div className="team">
                    <Helmet>
                        <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
                    </Helmet>
                    <div className='text'>
                        TEAM
                    </div>
                </div>
            </div>

           
                <div className="split-screen">

                    <div className="left-half">
                        <div className="cards">
                            <div className='ctm'>
                                <img src={garv} alt="image" />
                            </div>
                            <span style={{color:"white", fontSize:"20px"}}>Garv Gupta</span>
                        <span style={{ color: "white", fontSize: "20px" }}>+91 99535 60809</span>
                        <span style={{ color: "white", fontSize: "20px" }}>Core Team Member</span>
                        </div>
                    </div>

                    <div className="right-half">
                        <div className="cards">
                            <div className='ctm'>
                                <img src={agrj} alt="image" />
                            </div>
                            <span style={{color:"white", fontSize:"20px"}}>Agrajah Bhobe</span>
                        <span style={{ color: "white", fontSize: "20px" }}>+91 83296 91276</span>
                        <span style={{ color: "white", fontSize: "20px" }}>Core Team Member</span>
                        </div>
                    </div>

                </div>

            <div className="coordis">
                <div className='text' style={{fontSize:"45px", marginBottom:"3%"}}>
                    HDA TEAM
                </div>
                    <div className="row">

                        <div className="profile profile1">
                            <img src={Shivendra} alt="image" />
                            <div className="title">Shivendra</div>
                        </div>

                    <div className="profile profile1">
                            <img src={Samyak} alt="image" />
                            <div className="title">Samyak</div>
                        </div>
                    <div className="profile profile1">
                            <img src={Saksham} alt="image" />
                            <div className="title">Saksham</div>
                        </div>
                    <div className="profile profile1">
                            <img src={Neha} alt="image" />
                            <div className="title">Neha</div>
                        </div>

                    <div className="profile profile1">
                            <img src={Manoj_Singh} alt="image" />
                            <div className="title">Manoj</div>
                        </div>
                    <div className="profile profile1">
                            <img src={Maitreyee} alt="image" />
                            <div className="title">Maitreyee</div>
                    </div>
                    <div className="profile profile1">
                        <img src={Dhruv} alt="image" />
                        <div className="title">Dhruv Gangrade</div>
                    </div>

                    </div>

                    <div className="row">
                        <div className="profile profile1">
                            <img src={Kartik} alt="image" />
                            <div className="title">Kartik</div>
                        </div>

                        <div className="profile profile1">
                            <img src={Joy} alt="image" />
                            <div className="title">Joy</div>
                        </div>

                        <div className="profile profile1">
                            <img src={Ishan_Grover} alt="image" />
                            <div className="title">Ishan</div>
                        </div>

                        <div className="profile profile1">
                            <img src={Harit_Gangwani} alt="image" />
                            <div className="title">Harit</div>
                        </div>

                        <div className="profile profile1">
                            <img src={Daya} alt="image" />
                            <div className="title">Daya</div>
                        </div>

                        <div className="profile profile1">
                            <img src={Bishal} alt="image" />
                            <div className="title">Bishal</div>
                        </div>
                        <div className="profile profile1">
                            <img src={kairabi} alt="image" />
                            <div className="title">Kairabi</div>
                        </div>

                       
                    </div>

                    <div className='row'>
                    <div className="profile">
                            <img src={Bhakti} alt="image" />
                            <div className="title">Bhakti</div>
                        </div>

                        <div className="profile">
                            <img src={Ashlesha} alt="image" />
                            <div className="title">Ashlesha</div>
                        </div>


                        <div className="profile">
                            <img src={Aryan_Kumar} alt="image" />
                            <div className="title">Aryan</div>
                        </div>

                        


                        <div className="profile">
                            <img src={Anurag_Pachgade} alt="image" />
                            <div className="title">Anurag</div>
                        </div>


                        <div className="profile">
                            <img src={Aditya_Singh} alt="image" />
                            <div className="title">Aditya Singh</div>
                        </div>

                        <div className="profile">
                            <img src={Aditya_Aryan} alt="image" />
                            <div className="title">Aditya Aryan</div>
                    </div>

                       


                    </div>
            </div>
            
            <footer className="footer">
                <div className="footer-content">
                    <p>Connect with us on</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/SARC.IITB/">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/student-alumni-relations-cell/">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/sarc_iitb/?hl=en">
                            <i className="fab fa-instagram"></i>
                        </a>
                        {/* Add more social media icons as needed */}
                    </div>
                    <p>Made with ❤️ by sarc</p>
                </div>
            </footer>
            

        </body>
    )
}