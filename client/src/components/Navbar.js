import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import '../css/NavbarAdmin.css';

//Icons
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';


const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 16%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: '0';
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Navbar = () => {

  const cookies = new Cookies();
  const usuario = cookies.get('nombre_completo');
  //onst showSidebar = () => setSidebar(!sidebar)

  return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars />
        </Link>
        <div className="user-profile-container">
          <FontAwesomeIcon icon={faUser} />
          <span>{usuario}</span>
        </div>
      </div>
      <div className="col-md-3">
      <SidebarNav>
        <SidebarWrap>
          <NavIcon to="/homeadmin">
            <FaIcons.FaBars/>
          </NavIcon>
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
      </div>
    </IconContext.Provider>
    </>
  );
};

export default Navbar;