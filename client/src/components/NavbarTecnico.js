import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarDataTecnico } from './SidebarDataTecnico';
import '../css/NavbarTecnico.css';
import { IconContext } from 'react-icons';

function NavbarTecnico() {
  const [sidebar, setSidebar] = useState(true);

  //onst showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
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