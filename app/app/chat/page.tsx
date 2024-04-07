"use client";
import OrgCard from "@/components/Orgcard";
import { org } from "@/types/globalTypes.types";
import { getOrgData } from "@/utils/tableland";
import { useEffect, useState } from "react";

import React from 'react'

const page = () => {
    const [orgdata, setOrgdata] = useState<org[]>();
  
    useEffect(()=>{
      const getData = async()=>{
        const res = await getOrgData();
        const trainedOrgs = res.filter(org => org.isTrained === 1);
        setOrgdata(trainedOrgs);
      }
      getData()
    },[])
    return (
      <div>
        <div className="grid grid-cols-3 gap-6 text-wrap">
          {orgdata?.map((org, index) => (
            <OrgCard org_data={org} key={index} type={'chat'}/>
          ))}
        </div>
      </div>
    );
}

export default page
