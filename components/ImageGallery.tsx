"use client";
import React, { useEffect, useState } from "react";
import ImageWithSelection from "./ImageWithSelection";

type image = { id: number; src: string; alt: string };

// props: cids -> urls of images
const ImageGallery = ({ images }: { images: image[] }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageClick = (imageSrc: string) => {
    console.log(selectedImages.includes(imageSrc));
    if (selectedImages.includes(imageSrc)) {
      setSelectedImages((oldVal) => oldVal.filter((src) => src !== imageSrc));
    } else {
      setSelectedImages((oldVal) => [...oldVal, imageSrc]);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-8">
      {images.map((image) => (
        <ImageWithSelection
          key={image.id}
          src={image.src}
          alt={image.alt}
          selected={selectedImages.includes(image.src)}
          onClick={() => handleImageClick(image.src)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
