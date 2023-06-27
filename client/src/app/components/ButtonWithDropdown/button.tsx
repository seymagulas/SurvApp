import React, { useState } from 'react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';

const ButtonWithDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center items-center space-x-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md px-4 py-2 focus:outline-none"
        onClick={toggleDropdown}
      >
        <span>Create Survey</span>
        <DotsHorizontalIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute -right-52 -top-2.5 mt-2 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Dropdown menu content */}
        </div>
      )}
    </div>
  );
};

export default ButtonWithDropdown;
