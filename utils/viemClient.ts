import { createPublicClient, http } from 'viem'
import { filecoinCalibration } from 'viem/chains'
import { Wallet, getDefaultProvider } from 'ethers'

export const publicClient = createPublicClient({
  chain: filecoinCalibration,
  transport: http()
})

export function get_pk_walletClient () {
  const owner = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY as string)
  const provider = getDefaultProvider(
    'https://api.calibration.node.glif.io/rpc/v1'
  )
  const signer = owner.connect(provider)
  return signer
}