import Sidebar from "../components/Sidebar";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: '500', subsets: ["devanagari"] })

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className={`flex mt-[10vh] ml-[40px] ${poppins.className}`}>
            <div className="justify-start mr-[40px]"><Sidebar /></div>
            <div className="flex flex-col h-[80vh] border p-[25px] w-[75%] rounded-xl">{children}</div>

        </div>

    );
}
