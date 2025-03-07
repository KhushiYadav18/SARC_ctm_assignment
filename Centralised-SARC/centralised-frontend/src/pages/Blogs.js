import React from 'react';

const Blogs = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Blogs</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Blog Post 1</h2>
        <p className="mt-2">Content of Blog Post 1.</p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Blog Post 2</h2>
        <p className="mt-2">Content of Blog Post 2.</p>
      </div>
      {/* Add more blog posts as needed */}
    </div>
  );
};

export default Blogs;