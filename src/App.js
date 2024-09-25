import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BreedSelector from './components/BreedSelector';
import ImageGallery from './components/ImageGallery';

const API_BASE_URL = 'https://dog.ceo/api';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [favoriteImages, setFavoriteImages] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // New state for active tab
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreeds.length > 0) {
      fetchImages();
    } else {
      setImages([]);
    }
  }, [selectedBreeds]);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/breeds/list/all`);
      const breedList = Object.keys(response.data.message);
      setBreeds(breedList);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const imagePromises = selectedBreeds.map(breed =>
        axios.get(`${API_BASE_URL}/breed/${breed}/images/random/3`)
      );
      const imageResults = await Promise.all(imagePromises);
      const allImages = imageResults.flatMap(result => result.data.message);
      setImages(allImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const toggleFavorite = (imageUrl) => {
    setFavoriteImages(prevFavorites => 
      prevFavorites.includes(imageUrl)
        ? prevFavorites.filter(url => url !== imageUrl)
        : [...prevFavorites, imageUrl]
    );
  };

  const toggleBreed = (breed) => {
    setSelectedBreeds(prev =>
      prev.includes(breed)
        ? prev.filter(b => b !== breed)
        : [...prev, breed]
    );
  };

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8 px-4 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold mb-4">Dog Breed Gallery</h1>
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Select Dog Breeds</h2>
        <div className="max-h-40 overflow-y-auto bg-white p-4 rounded-lg shadow-inner">
          {filteredBreeds.map(breed => (
            <button
              key={breed}
              onClick={() => toggleBreed(breed)}
              className={`mr-2 mb-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                selectedBreeds.includes(breed)
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {breed}
            </button>
          ))}
        </div>
      </div>

      <div className="flex mb-6">
        <button
          className={`mr-4 px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Dogs
        </button>
        <button
          className={`px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${
            activeTab === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>

      {/* Conditional rendering based on active tab */}
      {activeTab === 'all' ? (
        <ImageGallery 
          images={images} 
          favoriteImages={favoriteImages}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <ImageGallery 
          images={favoriteImages} 
          favoriteImages={favoriteImages}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;