"use client";
import UploadCard from "@/components/UploadCard";
import {
  addContributor,
  contributorExists,
  createTable,
  getCid,
} from "@/utils/tableland";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CircularProgress } from "@nextui-org/progress";

const Upload = () => {
  const { address } = useAccount();
  const [imgUris, setImgUris] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUploads = async () => {
      //check is contributor exists in db, if not create an entry
      if (!(await contributorExists(address!))) {
        await addContributor({ address: address!, cids: [] });
        setLoading(false);
        return;
      }
      const cids = await getCid(address!);
      cids.forEach((cid) => {
        setImgUris((oldVal: string[]) => [
          ...oldVal,
          `https://gateway.lighthouse.storage/ipfs/${cid}`,
        ]);
      });
      setLoading(false);
    };
    getUploads();
  }, [address]);
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center align-middle">
        <CircularProgress size={"lg"} aria-label="Loading..." />
        <p className="w-max-[50%] text-center mt-5">
          Note: New users have to wait few minutes before they can upload data,
          as upadting and syncing tableland tables takes time
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {imgUris.map((uris, index) => (
        <img src={uris} key={index} className="w-full" />
      ))}
      <UploadCard />
    </div>
  );
};

export default Upload;
