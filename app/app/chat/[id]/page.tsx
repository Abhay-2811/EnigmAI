
'use client'
import Chat from '@/components/Chat'
import { org } from '@/types/globalTypes.types'
import { getModelFilter, getOrgData } from '@/utils/tableland'
import React, { useEffect, useState } from 'react'
import { WalletClient } from 'viem'
import { filecoinCalibration } from 'viem/chains'
import { useWalletClient } from 'wagmi'

const Page = ({ params }: { params: { id: number } }) => {
  const { data: wc } = useWalletClient({
    chainId: filecoinCalibration.id,
  });

  return (
    <div>
        <Chat id={params.id} wc={wc!}/>
    </div>
  )
}

export default Page