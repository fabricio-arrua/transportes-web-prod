import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const MaybeShowNavBar = ({children}) => {
  const location = useLocation();

  const [showNavBar, setShowNavBar] = useState(false);


  useEffect(() => {

    if(location.pathname === '/' || location.pathname === '/logout' || cookies.get('tipo') === 'T') {
      setShowNavBar(false)
    } else {
      setShowNavBar(true)
    }
  }, [location])

  return (
    <div className='barraInicial' >{showNavBar && children}</div>
  )
}

export default MaybeShowNavBar