import React from 'react';

const UpcomingEvents = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Upcoming Events</h1>
      <div className="mt-4">
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <h2 className="text-2xl font-bold">Event 1</h2>
          <img src="event1.jpg" alt="Event 1" className="w-full h-48 object-cover rounded-lg mt-2" />
          <p className="mt-2">Description of Event 1.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Register</button>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <h2 className="text-2xl font-bold">Event 2</h2>
          <img src="event2.jpg" alt="Event 2" className="w-full h-48 object-cover rounded-lg mt-2" />
          <p className="mt-2">Description of Event 2.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Register</button>
        </div>
        {/* Add more events as needed */}
      </div>
    </div>
  );
};

export default UpcomingEvents;