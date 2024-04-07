"use client";
import { mint_100_token } from "@/utils/contractInteractions";
import { Button, CircularProgress } from "@nextui-org/react";
import React, { useState } from "react";
import { useAccount } from "wagmi";

const Page = () => {
  const { address } = useAccount();
  const [status, setStatus] = useState<"mint" | "loading" | "success">("mint");
  const [hash, setHash] = useState<string | undefined>();

  const mintTokens = async () => {
    setStatus("loading");
    const hash = await mint_100_token(address!);
    setHash(hash);
    setStatus("success");
  };
  return (
    <div className="flex flex-col items-center justify-between mt-8">
      <h1 className=" text-lg mb-8">Mint FREE $EAI for testing</h1>
      <Button
        color="primary"
        variant="bordered"
        onClick={mintTokens}
        isDisabled={status != "mint"}
        className="mb-4"
      >
        {status == "mint" && `Mint 100 $EAI`}
        {status == "loading" && (
          <CircularProgress size="sm" aria-label="loading..." />
        )}
        {status == "success" && `✔️ Minted`}
      </Button>
      <h1 className=" text-xs">Note: Minting takes few seconds!</h1>
      {hash && (
        <a
          href={`https://calibration.filfox.info/en/message/${hash}`}
          target="_blank"
          className="text-md underline"
        >
          View Transaction
        </a>
      )}
    </div>
  );
};

export default Page;
