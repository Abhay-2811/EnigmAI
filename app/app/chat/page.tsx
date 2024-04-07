"use client";
import OrgCard from "@/components/Orgcard";
import { org } from "@/types/globalTypes.types";
import { getOrgData } from "@/utils/tableland";
import { useEffect, useState } from "react";

import React from "react";
import { WalletClient } from "viem";
import { filecoinCalibration } from "viem/chains";
import { useWalletClient } from "wagmi";

const Page = () => {
  const [orgdata, setOrgdata] = useState<org[]>();
  const { data: wc } = useWalletClient({
    chainId: filecoinCalibration.id,
  });
  useEffect(() => {
    const getData = async () => {
      const res = await getOrgData();
      const trainedOrgs = res.filter((org) => org.isTrained === 1);
      setOrgdata(trainedOrgs);
    };
    getData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 text-wrap">
        {orgdata?.map((org, index) => (
          <OrgCard org_data={org} key={index} type={"chat"} wc={wc!} />
        ))}
      </div>
    </div>
  );
};

export default Page;
