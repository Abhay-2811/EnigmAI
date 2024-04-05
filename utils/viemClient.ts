import { WalletClient, createPublicClient, http, parseUnits } from "viem";
import { filecoinCalibration } from "viem/chains";
import { Wallet, getDefaultProvider } from "ethers";
import Org_contractData from "@/contract/artifacts/enigmai_org.json";
import Token_contractData from "@/contract/artifacts/enigmai.json";
export const publicClient = createPublicClient({
  chain: filecoinCalibration,
  transport: http(),
});

export function get_pk_walletClient() {
  const owner = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY as string);
  const provider = getDefaultProvider(
    "https://api.calibration.node.glif.io/rpc/v1"
  );
  const signer = owner.connect(provider);
  return signer;
}

export async function deployOrgContract(
  org_name: string,
  reward: number,
  walletClient: WalletClient
) {
  const [account] = await walletClient.getAddresses();
  const hash = await walletClient.deployContract({
    abi: Org_contractData.abi,
    bytecode: Org_contractData.bytecode as `0x${string}`,
    account,
    args: [
      org_name,
      parseUnits(String(reward), 18),
      Token_contractData.contractAddress,
    ],
    chain: filecoinCalibration,
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.contractAddress;
}
