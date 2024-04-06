// components/ImageWithSelection.js

import React from "react";

const ImageWithSelection = ({
  src,
  alt,
  selected,
  onClick,
}: {
  src: string;
  alt: string;
  selected: boolean;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-fill rounded-lg bg-black opacity-50 hover:opacity-100"
        onClick={onClick}
      />
      {selected && (
        <div className="absolute top-2 right-2">
          <div className="rounded-full h-8 w-8 bg-white opacity-75 flex items-center justify-center border-2 border-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={onClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWithSelection;
