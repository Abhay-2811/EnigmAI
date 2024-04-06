import React, { useEffect, useState } from "react";
import Image from "next/image";
import { tokenbalance } from "@/utils/contractInteractions";
import Link from "next/link";
const BalanceComp = ({ address }: { address: `0x${string}` }) => {
  const [userBalance, setUserBalance] = useState<string>();
  useEffect(() => {
    const getBalance = async () => {
      const balance = await tokenbalance(address);
      setUserBalance(balance);
    };
    getBalance();
  }, [address]);
  return (
    <Link href={"/app/token"}>
      {" "}
      <div className="flex items-center space-x-4 bg-[#1A1B22] h-{64px} p-1 rounded-lg px-3 transition hover:scale-105 duration-300">
        <Image
          src="/enigmai-logo.svg"
          width={30}
          height={30}
          alt="token logo"
          className="bg-black rounded-full"
        />
        <div>{userBalance} $EAI </div>
      </div>
    </Link>
  );
};

export default BalanceComp;
