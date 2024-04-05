'use client'
import Sidebar from "../../components/Sidebar";
import { Poppins } from "next/font/google";
import { useAccount } from "wagmi";
const poppins = Poppins({ weight: "500", subsets: ["devanagari"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className={`flex mt-[10vh] ml-[40px] ${poppins.className}`}>
        <div className="justify-start mr-[40px]">
          <Sidebar />
        </div>
        <div className="flex flex-col items-center justify-center h-[80vh] p-[25px] w-[75%] overflow-scroll rounded-xl border border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
        <h1 className=" text-lg">Connect Wallet to Proceed</h1>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex mt-[10vh] ml-[40px] ${poppins.className}`}>
      <div className="justify-start mr-[40px]">
        <Sidebar />
      </div>
      <div className="flex flex-col h-[80vh] p-[25px] w-[75%] overflow-scroll rounded-xl border border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
        {children}
      </div>
    </div>
  );
}
