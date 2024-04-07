import React from "react";
import type { org } from "@/types/globalTypes.types";
import Link from "next/link";
import { contract_trainModel } from "@/utils/contractInteractions";
import { filecoinCalibration } from "viem/chains";
import { WalletClient } from "viem";
import { updateIsTrained } from "@/utils/tableland";
import Image from "next/image";
const OrgCard: React.FC<{
  org_data: org;
  type: "upload" | "models" | "chat";
  wc?: WalletClient
}> = ({ org_data, type, wc }) => {

  const trainModel = async () => {
    console.log("Train Model");
    // call contract function
    // send out bacalhau job
    // update table
    const [receipt] = await Promise.all([
      await contract_trainModel(org_data.org_add as `0x${string}`, wc!),
      await updateIsTrained(org_data.org_add as `0x${string}`), //add bacalhau job after this
    ]);
  };
  return (
    <div className=" flex flex-col h-[40vh] border rounded-md p-5 space-y-5">
      <h2 className=" font-semibold text-lg truncate">{org_data.org_name}</h2>
      <p className=" text-sm text-gray-400 truncate underline">
        <a
          href={`https://calibration.filfox.info/en/address/${org_data.org_add}`}
          target="_blank"
        >
          {org_data.org_add}
        </a>
      </p>
      <p className="text-sm mt-5 mb-5 h-[30%] break-words overflow-clip overflow-ellipsis hover:overflow-y-scroll scroll-m-unit-0">
        {org_data.description}
      </p>

      {type == "upload" && (
        <div className="flex">
          <button className="relative mt-3 inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
            <span
              className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0"
              onClick={() => {}}
            >
              <Link href={`/app/upload/${org_data.id}`}>Upload Data</Link>
            </span>
          </button>
        </div>
      )}

      {type == "models" && (
        <div className="flex">
          {" "}
          <button
            className={`border mt-3 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
              org_data.isTrained == 0
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-green-400 text-black"
            }  border-gray-600  hover:border-gray-600 focus:ring-gray-700`}
            disabled={Boolean(org_data.isTrained)}
            onClick={trainModel}
          >
            {org_data.isTrained == 0 ? "Train Model" : "✔️  " + "Model Trained"}
          </button>
        </div>
      )}

      {type == "chat" && (
        <div className="flex">
          <div>
            <span>Cost Per Prompt:</span>
            <Image
              src="/enigmai-logo.svg"
              width={30}
              height={30}
              alt="token logo"
              className="bg-black rounded-full"
            />
            <div>{org_data.costPerPrompt} $EAI </div>
          </div>
          <button className="relative mt-3 inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-green-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
            <span
              className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0"
              onClick={() => {}}
            >
              <Link href={`/app/chat/${org_data.id}`}>💬 Use Model</Link>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default OrgCard;
