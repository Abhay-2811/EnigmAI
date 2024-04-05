import React from "react";
import type { org } from "@/types/globalTypes.types";
import Link from "next/link";
const OrgCard: React.FC<{ org_data: org }> = ({ org_data }) => {
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
      <p className="text-sm mt-5 mb-5 max-h-[30%] break-words text-ellipsis overflow-y-scroll">
        {org_data.description} dasdnkasdnas klasndl ddsad klsdsa dls a dkas das
        dask alsk dalsk dalskd sal dals ds dlas dsald askd aslkd aslkd as d
        aslkd as asdnkasdnas klasndl ddsad klsdsa dls a dkas das dask alsk dalsk
        dalskd sal dals ds dlas dsald askd aslkd aslkd as d aslkd as asdnkasdnas
        klasndl ddsad klsdsa dls a dkas das dask alsk dalsk dalskd sal dals ds
        dlas dsald askd aslkd aslkd as d aslkd as asdnkasdnas klasndl ddsad
        klsdsa dls a dkas das dask alsk dalsk dalskd sal dals ds dlas dsald askd
        aslkd aslkd as d aslkd as
      </p>
      {org_data.isTrained ? (
        <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Use Model
        </button>
      ) : (
        <div className="flex">
          <button className="relative mt-3 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
            <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0" onClick={()=>{}}>
              <Link href={`/app/upload/${org_data.id}`}>
                Upload Data
                </Link>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default OrgCard;
