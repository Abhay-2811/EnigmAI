import { org } from "@/types/globalTypes.types";
import { allowContract, getCPP, getPromptCredits, getUserCredits } from "@/utils/contractInteractions";
import { getModelFilter } from "@/utils/tableland";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { WalletClient } from "viem";
import { filecoinCalibration } from "viem/chains";
import { useAccount } from "wagmi";

const Chat = ({ id, wc }: { id: number, wc: WalletClient }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "", text: "" },
  ]);

  const { address } = useAccount();

  const [inputValue, setInputValue] = useState<string>("");
  const [orgData, setOrgData] = useState<org>();
  const [credits, setCredits] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [cpp, setCpp] = useState<number>();

  useEffect(() => {
    const getData = async () => {
      const res = await getModelFilter(`id=${id}`);
      setOrgData(res[0]);
      const credits: number = (await getUserCredits(
        address!,
        res[0].org_add as `0x${string}`
      )) as number;
      setCredits(credits);
      const costPerPrompt = await getCPP(res[0]?.org_add as `0x${string}`);
      setCpp(Number(costPerPrompt));
      console.log(cpp);
      setLoading(false);
    };
    getData();
  }, []);

  const handleMessageSend = () => {
    if(credits == 0){
      window.alert("Not Enough Credits, BUY some!!");
      return;
    }
    setMessages((oldmsgs) => [
      ...oldmsgs,
      { sender: "user", text: inputValue },
    ]);
    setMessages((oldmsgs) => [...oldmsgs, { sender: "res", text: "hello" }]);
    // Process the input here using your function for processing prompts
    setInputValue("");
  };

  const handleBuyCr = async()=>{
    await allowContract(orgData?.org_add as `0x${string}`, wc!);
    await getPromptCredits(orgData?.org_add as `0x${string}`, wc!, 10);
    window.alert("Credit Transfer Complete!")
  }

  if (loading) {
    return <CircularProgress size="lg" aria-label="loading..." />;
  }

  return (
    <div className="flex flex-col h-[70vh] justify-between bg-inherit p-4">
      <div className="flex-1 overflow-hidden hover:overflow-y-auto h-[80%]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-green-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-l-lg"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-lg">
          {Number(credits)} credits
        </button>
        <button
          onClick={handleBuyCr}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Buy 10 cr for {(cpp ?? 0) * 10} $EAI
        </button>
        <button
          onClick={handleMessageSend}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
