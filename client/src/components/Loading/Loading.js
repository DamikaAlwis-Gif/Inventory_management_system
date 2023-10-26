import React from 'react'
import image from "../../Images/giphy.gif"
const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: '100vh' }}>
  <img src={image} style={{ width: "100px" }} alt="Centered Image" />
</div>

  )
}

export default Loading