import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import BalanceComp from "./BalanceComp";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { address, isConnected } = useAccount();
  const path = usePathname()

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
    {
      title: "Chat",
      route: "/app/chat",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-between h-[80vh] p-[25px] w-[30vh] rounded-xl border-2 border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] text-center">
      <div>
        {" "}
        <a href="/">
          <Image
            priority
            src={logo}
            alt="EnigmAi Logo"
            width={200}
            className="my-8"
          />
        </a>
        <hr className="w-[80%] ml-5 border-sky-200" />
      </div>
      <div>
        {" "}
        {Sidebar_comps.map((comp, index) => (
          <div key={index} className="mb-[30px]">
            <Link href={comp.route} className={path == comp.route ? 'text-blue-200' : 'text-white'}>{comp.title}</Link>
          </div>
        ))}
      </div>
      <div className=" justify-end space-y-4">
        {isConnected && <BalanceComp address={address!} />}
        <ConnectButton showBalance={false} chainStatus={"none"} />
      </div>
    </div>
  );
};

export default Sidebar;
