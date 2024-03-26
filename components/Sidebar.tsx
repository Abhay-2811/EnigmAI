import React from "react";
import Link from "next/link";

const Sidebar = () => {
  const Sidebar_comps = [
    {
      title: "Contribute Data",
      route: "/app",
    },
    {
      title: "Upload Data",
      route: "/app/upload",
    },
    {
      title: "My Models",
      route: "/app/mymodels",
    },
    
  ];
  return (
    <div className="flex flex-col h-[80vh] p-[25px] w-[30vh] rounded-xl border-2 border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
      {Sidebar_comps.map((comp, index) => (
        <div key={index} className="mb-[30px]">
          <Link href={comp.route}>{comp.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
