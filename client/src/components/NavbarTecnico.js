import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarDataTecnico } from './SidebarDataTecnico';
import '../css/NavbarTecnico.css';
import { IconContext } from 'react-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

function NavbarTecnico() {
  const cookies = new Cookies();
  const usuario = cookies.get('nombre_completo');

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars />
          </Link>
          <div className="user-profile-container">
            <FontAwesomeIcon icon={faUser} />
            <span>{usuario}</span>
          </div>
        </div>
        <nav className='nav-menu active'>
          <ul className='nav-menu-items' >
            <li className='navbar-toggle'>
            <Link to='/hometecnico' className='menu-bars'>
              <FaIcons.FaBars />
            </Link>
            </li>
            {SidebarDataTecnico.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavbarTecnico;