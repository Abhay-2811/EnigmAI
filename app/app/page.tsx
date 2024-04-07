"use client";

import OrgCard from "@/components/Orgcard";
import React, { useEffect, useState } from "react";
import { type org } from "@/types/globalTypes.types";
import { getOrgData } from "@/utils/tableland";


const App_page = () => {
  const [orgdata, setOrgdata] = useState<org[]>();
  
  useEffect(()=>{
    const getData = async()=>{
      const res = await getOrgData();
      const untrainedOrgs = res.filter(org => org.isTrained === 0);
      setOrgdata(untrainedOrgs);
    }
    getData()
  },[])
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 text-wrap">
        {orgdata?.map((org, index) => (
          <OrgCard org_data={org} key={index} type={'upload'}/>
        ))}
      </div>
    </div>
  );
};

export default App_page;
