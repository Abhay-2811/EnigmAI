import {
  WalletClient,
  createPublicClient,
  createWalletClient,
  formatUnits,
  http,
  parseUnits,
} from "viem";
import { filecoinCalibration } from "viem/chains";
import { Wallet, getDefaultProvider } from "ethers";
import Org_contractData from "@/contract/artifacts/enigmai_org.json";
import Token_contractData from "@/contract/artifacts/enigmai.json";
import { privateKeyToAccount } from "viem/accounts";
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

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
);

const viemWalletClient = createWalletClient({
  account,
  chain: filecoinCalibration,
  transport: http(),
});

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

export async function contract_commit_data(
  user_address: `0x${string}`,
  contract_address: `0x${string}`,
  data: string[]
) {
  const hash = await viemWalletClient.writeContract({
    address: contract_address,
    abi: Org_contractData.abi,
    functionName: "commitData",
    args: [user_address, data.length],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
}

export async function tokenbalance(address: `0x${string}`) {
  const balance: string = (await publicClient.readContract({
    address: Token_contractData.contractAddress as `0x${string}`,
    abi: Token_contractData.abi,
    functionName: "balanceOf",
    args: [address],
  })) as string;
  return formatUnits(BigInt(balance), 18);
}
