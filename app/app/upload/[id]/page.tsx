import React from 'react'

const Contribute = ({ params }: { params: { id: number } }) => {
  return (
    <div>{params.id}</div>
  )
}

export default Contribute