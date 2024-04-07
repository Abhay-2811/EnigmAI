"use client";
import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { updateCids } from "@/utils/tableland";
import { useAccount } from "wagmi";
import { CircularProgress } from "@nextui-org/react";

const UploadCard = () => {
  const { address } = useAccount();
  const lh_apikey = process.env.NEXT_PUBLIC_LH_API_KEY as string;
  const [loading, setLoading] = useState<boolean>();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files?.length == 0) {
      return;
    }
    setLoading(true);
    const _files = Array.from(e.target.files!);

    const cids: string[] = [];
    _files.forEach(async (file) => {
      const { data } = await lighthouse.uploadBuffer(file, lh_apikey);
      cids.push(data.Hash);
    });

    await updateCids(address!, cids);
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 p-4  border-dashed rounded-lg cursor-pointer bg-inherit  border-gray-600 hover:border-gray-500 hover:bg-gray-900"
      >
        { loading ? <CircularProgress size="lg" aria-label="loading..."/> : 
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <>
              {" "}
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-5 text-sm text-gray-400 text-center">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG & JPG (SIZE 5000x5000)
              </p>
            </>
          </div>
        }
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleUpload}
          multiple
        />
      </label>
    </div>
  );
};

export default UploadCard;
