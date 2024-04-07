"use client";
import ImageGallery from "@/components/ImageGallery";
import { addContributor, contributorExists, getCid, getModelFilter } from "@/utils/tableland";
import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button, ButtonGroup } from "@nextui-org/button";
import { org } from "@/types/globalTypes.types";
type image = { id: number; src: string; alt: string };

const Contribute = ({ params }: { params: { id: number } }) => {
  const { address } = useAccount();
  const [images, setImages] = useState<image[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState<org>();
  
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
      const res = await getModelFilter(`id=${params.id}`);
      setOrgData(res[0]);
      setLoading(false);
      console.log(images);
    };
    getUploads();
  }, [address]);

  const commitData = async()=>{
    
  }

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
      <ImageGallery images={images} />
      <div className="max-w-[50%]">
        <Button color="primary" variant="ghost" size={"lg"} onClick={commitData}>
          Commit Data
        </Button>
      </div>
    </div>
  );
};

export default Contribute;
