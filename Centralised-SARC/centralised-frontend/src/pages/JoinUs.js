import React from 'react';

const JoinUs = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Join Us</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <form className="mt-2">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg mb-2" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded-lg mb-2" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Login</button>
        </form>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Register</h2>
        <form className="mt-2">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded-lg mb-2" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg mb-2" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded-lg mb-2" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Register</button>
        </form>
      </div>
    </div>
  );
};

export default JoinUs;