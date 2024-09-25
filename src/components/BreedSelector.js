import React from 'react';

const BreedSelector = ({ breeds, selectedBreeds, setSelectedBreeds }) => {
  const handleBreedChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedBreeds(value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="breed-select" className="block text-sm font-medium text-gray-700">
        Select Dog Breeds
      </label>
      <select
        id="breed-select"
        multiple
        value={selectedBreeds}
        onChange={handleBreedChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedSelector;