import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";
import { GoPasskeyFill } from "react-icons/go";

export const SidebarDataTecnico = [
    {
      title: 'Home',
      path: '/hometecnico',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Mantenimientos',
      path: '/abmmantenimiento',
      icon: <GiIcons.GiMechanicGarage />,
      cName: 'nav-text'
    },
    {
      title: 'Solicitud de materiales',
      path: '/solicitudmateriales',
      icon: <TbIcons.TbShoppingCartPlus />,
      cName: 'nav-text'
    },
    {
      title: 'Cambiar Contraseña',
      path: '/cambiarcontraseña',
      icon: <GoPasskeyFill />,
      cName: 'nav-text'
    },
    {
      title: 'Cerrar sesión',
      path: '/logout',
      icon: <TbIcons.TbLogout2 />,
      cName: 'nav-text'
    },
]