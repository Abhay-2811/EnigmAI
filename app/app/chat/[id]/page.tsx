
'use client'
import Chat from '@/components/Chat'
import { org } from '@/types/globalTypes.types'
import { getModelFilter, getOrgData } from '@/utils/tableland'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { id: number } }) => {

  return (
    <div>
        <Chat id={params.id}/>
    </div>
  )
}

export default page