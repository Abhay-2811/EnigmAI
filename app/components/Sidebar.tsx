import React from "react";
import Link from "next/link";
const Sidebar = () => {
    const Sidebar_comps = [
        {
            title: "Contribute Data to DAOs",
            route: "/app",
        },
        {
            title: "Upload Data",
            route: "/app/upload",
        },
    ];
    return (
        <div className="flex flex-col h-[80vh] border p-[25px] w-[30vh] rounded-xl ">
            {Sidebar_comps.map((comp, index) => (
                <div key={index} className="mb-[30px]">
                    <Link href={comp.route}>{comp.title}</Link>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
