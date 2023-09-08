import React from 'react'
import { useLocation } from 'react-router-dom';

const ShowNavBar = ({children}) => {
    const location = useLocation();
  return (

    <>
        {location.pathname === "/" || location.pathname === "/register" || location.pathname === "/login" ? null : children}
    </>
  )
}

export default ShowNavBar