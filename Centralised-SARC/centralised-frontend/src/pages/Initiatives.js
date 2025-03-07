import React from 'react';

const Initiatives = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Initiatives</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Event 1</h2>
        <p className="mt-2">Description of Event 1.</p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Event 2</h2>
        <p className="mt-2">Description of Event 2.</p>
      </div>
      {/* Add more events as needed */}
    </div>
  );
};

export default Initiatives;