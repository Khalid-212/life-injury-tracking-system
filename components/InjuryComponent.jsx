import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_INJURIES } from '../graphql/queries'

function InjuryComponent() {
  const {data} = useQuery(get_All_Users)
  console.log("data here"+ data)
  return (
    <div>
      here
    </div>
  )
}

export default InjuryComponent
