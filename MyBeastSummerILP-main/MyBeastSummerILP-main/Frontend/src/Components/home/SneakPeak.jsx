import React, { useEffect } from 'react';
import M from 'materialize-css'; // Import Materialize CSS library
import '../styles/sneakPeak.css';

import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';



const CardCarousel = () => {
  useEffect(() => {
    const carousel = document.querySelector('.carousel');
    const options = {
      padding: 0,
      numVisible: 3,
      onCycleTo: card => {
        const currentIndex = Array.from(carousel.children).indexOf(card);
        const centerIndex = Math.floor(options.numVisible / 2);
        const offset = currentIndex - centerIndex;
        carousel.style.transform = `translateX(-${offset * options.padding}px)`;
      },
    };

    const instance = M.Carousel.init(carousel, options);

    const autoplay = () => {
      instance.next();
      setTimeout(autoplay, 6500);
    };

    autoplay();

    return () => {
      instance.destroy();
    };
  }, []);


  return (
    <div className="carousel">
      <a className="carousel-item" href="#one"><div className='container'>
        <h4><b>Manager - Data Science & Analytics - CITI</b></h4>
        <h6><b>Bengaluru</b></h6>
        <p class="mohit" >Mathematics, 2016</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      {/* <a className="carousel-item" href="#two"><div className='container'>
        <h4><b>Associate - JP Morgan Chase</b></h4>
        <h6><b>Bangalore</b></h6>
        <p class="mohit" >Aerospace, 2018</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a> */}
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Senior Manager - Tesla</b></h4>
        <h6><b>San Carlos</b></h6>
        <p class="mohit" >Mechanical, 2010</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Display Hardware Tech Lead - Apple</b></h4>
        <h6><b>Cupertino, CA</b></h6>
        <p class="mohit" >Chemical, 2010</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Co-founder & CTO - Velocity</b></h4>
        <h6><b>Mumbai</b></h6>
        <p class="mohit" >Energy Science & Engineering, 2014</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Founder - Fynd</b></h4>
        <h6><b>Mumbai</b></h6>
        <p class="mohit" >Civil, 2008</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Chairman - Central Depository Services Limited</b></h4>
        <h6><b>Nagpur</b></h6>
        <p class="mohit" >Physics, 1976</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Vice President, Portfolio Management - Worldquant</b></h4>
        <h6><b>New York City</b></h6>
        <p class="mohit" >Computer Science Engineering, 2012</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Director - Product Development - BMC Software</b></h4>
        <h6><b>Mumbai</b></h6>
        <p class="mohit" >Metallurgical Engineering and Material Science, 1993</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Principal Consultant - Infosys</b></h4>
        <h6><b>Hyderabad</b></h6>
        <p class="mohit" >Chemical Engineering, 1994</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Director and Head - D2C eCommerce - PUMA India</b></h4>
        <h6><b>Mumbai</b></h6>
        <p class="mohit" >Chemical Engineering, 2006</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Manager - Paytm</b></h4>
        <h6><b>Noida</b></h6>
        <p class="mohit" >Chemical Engineering, 2016</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      {/* <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Consultant - McKinsey & Company</b></h4>
        <h6><b>Boston</b></h6>
        <p class="mohit" >Energy Science & Engineering, 2017</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a> */}
      {/* <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Senior Associate - BCG</b></h4>
        <h6><b>Mumbai</b></h6>
        <p class="mohit" >Chemical Engineering, 2018</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a> */}
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Senior Product Manager - LinkedIn</b></h4>
        <h6><b>Sunnyvale</b></h6>
        <p class="mohit" >Chemical Engineering, 2010</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      {/* <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Business Director - Groww</b></h4>
        <h6><b>Bangalore</b></h6>
        <p class="mohit" >Mechanical Engineering, 2018</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a> */}
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Senior Device Engineer - Samsung Semiconductor</b></h4>
        <h6><b>Stanford</b></h6>
        <p class="mohit" >Electrical Engineering, 2016</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
      <a className="carousel-item" href="#three"><div className='container'>
        <h4><b>Postdoctoral Fellow - Yale University</b></h4>
        <h6><b>New Haven</b></h6>
        <p class="mohit" >Metallurgical Engineering and Material Science, 2009</p>
        <Link to="/login"><button className="btn" style={{ marginTop: '20px' }}>Grab Mentorship Now!</button></Link></div></a>
    </div>
  );
};

export default CardCarousel;
