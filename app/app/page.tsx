"use client";

import OrgCard from "@/components/Orgcard";
import React from "react";
import { org_data, type org } from "@/types/globalTypes.types";


const App_page = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 text-wrap">
        {org_data.map((org, index) => (
          <OrgCard org_data={org} key={index} />
        ))}
      </div>
    </div>
  );
};

export default App_page;
