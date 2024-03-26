import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

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
    <div className="flex flex-col h-[80vh] p-[25px] w-[30vh] rounded-xl border-2 border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] text-center">
      <Image
        priority
        src={logo}
        alt="EnigmAi Logo"
        width={200}
        className="my-8"
      />
      <hr className="mb-[30px] w-[80%] ml-5 border-sky-200" />
      {Sidebar_comps.map((comp, index) => (
        <div key={index} className="mb-[30px]">
          <Link href={comp.route}>{comp.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
