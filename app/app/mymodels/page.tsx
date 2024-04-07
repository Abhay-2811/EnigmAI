"use client";

import React, { useEffect, useState } from "react";
import type { org } from "@/types/globalTypes.types";
import CreateModelForm from "@/components/CreateModelForm";
import { useAccount, useWalletClient } from "wagmi";
import { getModelFilter } from "@/utils/tableland";
import UploadCard from "@/components/UploadCard";
import OrgCard from "@/components/Orgcard";
import { WalletClient } from "viem";
import { filecoinCalibration } from "viem/chains";
const MyModels = () => {
  const [toggleCreate, setToggleCreate] = useState<Boolean>(false);
  const { address } = useAccount();
  const [orgData, setOrgData] = useState<org[]>();

  useEffect(() => {
    const getData = async () => {
      const results: org[] = await getModelFilter(`Owner_add='${address}'`);
      setOrgData(results);
    };
    getData();
  }, [address]);

  const { data: wc } = useWalletClient({
    chainId: filecoinCalibration.id,
  });
  if (toggleCreate) {
    return (
      <div>
        <CreateModelForm wc={wc!}/>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-6">
      {orgData?.map((data, index) => (
        <OrgCard org_data={data} key={index} type={'models'} wc={wc!}/>
      ))}
      <div
        className=" flex flex-col h-auto border border-green-500 rounded-md p-5 cursor-pointer justify-center items-center space-y-5"
        onClick={() => setToggleCreate((oldSt) => !oldSt)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          id="create"
          width="100"
          height="100"
          fill="currentColor"
        >
          <path d="M30 48h4V38h10v-4H34V24h-4v10H20v4h10z"></path>
          <path d="M2 8v48h60V8H2zm58 46H4V18h56v36z"></path>
        </svg>
        <h1 className="text-lg">Create</h1>
      </div>
    </div>
  );
};

export default MyModels;
