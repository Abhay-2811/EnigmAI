"use client";
import {
  addContributor,
  contributorExists,
  getCid,
  getModelFilter,
  updateContributions,
} from "@/utils/tableland";
import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button, ButtonGroup } from "@nextui-org/button";
import { org } from "@/types/globalTypes.types";
import ImageWithSelection from "@/components/ImageWithSelection";
type image = { id: number; src: string; alt: string };

const Contribute = ({ params }: { params: { id: number } }) => {
  const { address } = useAccount();
  const [images, setImages] = useState<image[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleImageClick = (imageSrc: string) => {
    console.log(selectedImages.includes(imageSrc));
    if (selectedImages.includes(imageSrc)) {
      setSelectedImages((oldVal) => oldVal.filter((src) => src !== imageSrc));
    } else {
      setSelectedImages((oldVal) => [...oldVal, imageSrc]);
    }
  };

  useEffect(() => {
    const getUploads = async () => {
      //check is contributor exists in db, if not create an entry
      if (!(await contributorExists(address!))) {
        await addContributor({ address: address!, cids: [] });
        setLoading(false);
        return;
      }
      const cids = await getCid(address!);
      cids.forEach((cid, index) => {
        console.log(cid, index);
        setImages((oldVal: image[]) => [
          ...oldVal,
          {
            id: index,
            src: `https://gateway.lighthouse.storage/ipfs/${cid}`,
            alt: `Image ${index}`,
          },
        ]);
      });
      setLoading(false);
    };
    getUploads();
  }, [address, params.id]);

  const commitData = async () => {
    //update contrubutions on table land
    setButtonLoading(true);
    await updateContributions(params.id, selectedImages);
    setButtonLoading(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center align-middle">
        <CircularProgress size={"lg"} aria-label="Loading..." />
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-8">
      <h1 className=" text-3xl">Select Images to Contribute</h1>
      <div className="grid grid-cols-3 gap-8">
        {images?.map((image) => (
          <ImageWithSelection
            key={image.id}
            src={image.src}
            alt={image.alt}
            selected={selectedImages.includes(image.src)}
            onClick={() => handleImageClick(image.src)}
          />
        ))}
      </div>
      <div className="max-w-[50%]">
        <Button
          color="primary"
          variant="ghost"
          size={"lg"}
          onClick={commitData}
        >
          {buttonLoading ? <CircularProgress size="sm" /> : "Commit Data"}
        </Button>
      </div>
    </div>
  );
};

export default Contribute;
