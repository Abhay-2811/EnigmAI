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
  costPerPrompt: number,
  walletClient: WalletClient
) {
  const [account] = await walletClient.getAddresses();
  const hash = await walletClient.deployContract({
    abi: Org_contractData.abi,
    bytecode: Org_contractData.bytecode as `0x${string}`,
    account,
    args: [
      org_name,
      parseUnits(String(costPerPrompt), 18),
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

export async function contract_trainModel(
  contractAddress: `0x${string}`,
  walletClient: WalletClient
) {
  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: Org_contractData.abi,
    functionName: "trainModel",
    chain: filecoinCalibration,
    account: walletClient.account?.address as `0x${string}`,
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
}

export async function mint_100_token(address: `0x${string}`) {
  const hash = await viemWalletClient.writeContract({
    address: Token_contractData.contractAddress as `0x${string}`,
    abi: Token_contractData.abi,
    functionName: "mint",
    args: [address, parseUnits("100", 18)],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
}
export async function creditUsage(contractAddress: `0x${string}`, address: `0x${string}`) {
  const hash = await viemWalletClient.writeContract({
    address: contractAddress as `0x${string}`,
    abi: Org_contractData.abi,
    functionName: "creditUsage",
    args: [address],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
}

export async function getPromptCredits(
  contractAddress: `0x${string}`,
  walletClient: WalletClient,
  amount: number
) {
  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: Org_contractData.abi,
    functionName: "getPromptCredit",
    args: [amount],
    chain: filecoinCalibration,
    account: walletClient.account?.address as `0x${string}`,
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
}

export async function allowContract(
  contractAddress: `0x${string}`,
  walletClient: WalletClient
) {
  const hash = await walletClient.writeContract({
    address: Token_contractData.contractAddress as `0x${string}`,
    abi: Token_contractData.abi,
    functionName: "approve",
    args: [contractAddress, parseUnits("100", 18)],
    chain: filecoinCalibration,
    account: walletClient.account?.address as `0x${string}`,
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
}

export async function getUserCredits(
  address: `0x${string}`,
  contractAddress: `0x${string}`
) {
  const credits = await publicClient.readContract({
    address: contractAddress,
    abi: Org_contractData.abi,
    functionName: "credits",
    args: [address],
  });
  return credits;
}


export async function getCPP(contractAddress: `0x${string}`){
  const cpp = await publicClient.readContract({
    address: contractAddress,
    abi:Org_contractData.abi,
    functionName:'cost_per_prompt'
  }) as bigint;
  return formatUnits(cpp, 18);
}