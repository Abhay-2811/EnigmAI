"use client";

import OrgCard from "@/components/Orgcard";
import React from "react";
import type { org } from "@/tyoes/globalTypes.types";

const org_data: org[] = [
  {
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgA",
    description: "CNN model with expected accuracy 90.3%",
    isTrained: false,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
  },
  {
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgB",
    description: "CNN model with expected accuracy 90.3%",
    isTrained: false,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
  },
  {
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgC",
    description: "CNN model with expected accuracy 90.3%",
    isTrained: false,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
  },
  {
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgD",
    description: "CNN model with expected accuracy 90.3%",
    isTrained: false,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
  },
];

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
