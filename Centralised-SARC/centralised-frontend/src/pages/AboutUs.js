import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">About Us</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Our Origin</h2>
        <p className="mt-2">SARC was established in 2005 with the aim of bridging the gap between students and alumni.</p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Our Vision</h2>
        <p className="mt-2">To create a strong network of alumni and students for mutual growth and development.</p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Our History</h2>
        <p className="mt-2">Over the years, SARC has organized numerous events and initiatives to foster relationships.</p>
      </div>
    </div>
  );
};

export default AboutUs;