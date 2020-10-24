import React, {useEffect} from 'react'
import axios from "axios";

export default function Dashboard() {
  useEffect(() => {
    axios.get('/testUsers').then(response => {
      // console.log(response)
    })
  })
  return (
    <h1>Dahsboard</h1>
  )
}
