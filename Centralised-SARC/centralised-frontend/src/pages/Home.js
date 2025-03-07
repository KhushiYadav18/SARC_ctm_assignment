import React, { useEffect, useState } from 'react';
import apiclient from '../apiclient/apiclient';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiclient.get('chatbot/')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-100">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-400">Welcome to SARC</h1>
        <p className="mt-2 text-gray-400">Connecting Alumni and Students for Lifelong Relationships</p>
      </header>

      {/* Chatbot Response Section */}
      {data && (
        <section className="mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Chatbot Response</h2>
          <div className="space-y-4">
            <p className="text-gray-300"><strong>Message:</strong> {data.message}</p>
            <p className="text-gray-300"><strong>Event:</strong> {data.data.event}</p>
            <p className="text-gray-300"><strong>Date:</strong> {data.data.date}</p>
            <p className="text-gray-300"><strong>Location:</strong> {data.data.location}</p>
          </div>
        </section>
      )}

      {/* Stats/Highlights Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Stats & Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-lg font-semibold text-blue-400">500+ Alumni</p>
            <p className="text-gray-400">Connected through SARC</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-lg font-semibold text-blue-400">100+ Events</p>
            <p className="text-gray-400">Organized successfully</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-lg font-semibold text-blue-400">20+ Years</p>
            <p className="text-gray-400">Of fostering relationships</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Upcoming Events</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {data?.events?.map((event, index) => (
            <div key={index} className="flex-shrink-0 w-64 bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={event.image} alt={event.name} className="w-full h-32 object-cover rounded-lg" />
              <p className="mt-2 font-semibold text-blue-400">{event.name}</p>
              <p className="text-sm text-gray-400">{event.description}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Register
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Esteemed Alumni Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Esteemed Alumni</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {data?.alumni?.map((alumnus, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={alumnus.image} alt={alumnus.name} className="w-full h-32 object-cover rounded-lg" />
              <p className="mt-2 font-semibold text-blue-400">{alumnus.name}</p>
              <p className="text-sm text-gray-400">Class of {alumnus.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <p className="italic text-gray-300">"{testimonial.quote}"</p>
              <p className="mt-2 font-semibold text-blue-400">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Contact Us</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-gray-400">Follow us on social media:</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Facebook</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Twitter</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;