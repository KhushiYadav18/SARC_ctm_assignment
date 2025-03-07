import React from 'react';

const Gallery = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <img src="image1.jpg" alt="Gallery 1" className="w-full h-48 object-cover rounded-lg" />
        <img src="image2.jpg" alt="Gallery 2" className="w-full h-48 object-cover rounded-lg" />
        <img src="image3.jpg" alt="Gallery 3" className="w-full h-48 object-cover rounded-lg" />
        {/* Add more images as needed */}
      </div>
    </div>
  );
};

export default Gallery;