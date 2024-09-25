import React from 'react';

const ImageGallery = ({ images, favoriteImages, toggleFavorite }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-500">No images to display.</p>
      </div>
    );
  }

  const handleDownload = (imageUrl) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // Extract filename from URL or use a default name
        const fileName = imageUrl.split('/').pop() || 'dog-image.jpg';
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('An error occurred while downloading the image.'));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
          <img src={image} alt="Dog" className="w-full h-64 object-cover" />
          <button
            onClick={() => toggleFavorite(image)}
            className="absolute top-2 right-2 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {favoriteImages.includes(image) ? '❤️' : '🤍'}
          </button>
          <button
            onClick={() => handleDownload(image)}
            className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;