import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";


export const SidebarData = [
    {
      title: 'Home',
      path: '/homeadmin',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Administración',
      /*path: '/abm',*/
      icon: <BsIcons.BsClipboard2DataFill />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'Camiones',
          path: '/abm/abmcamiones',
          icon: <BsIcons.BsTruck />,
        },
        {
          title: 'Choferes',
          path: '/abm/abmchoferes',
          icon: <TbIcons.TbSteeringWheel />,
        },
        {
          title: 'Clientes',
          path: '/abm/abmclientes',
          icon: <AiIcons.AiOutlineUserSwitch />,
        },
        {
          title: 'Estado Camion',
          path: '/abm/abmestadocamion',
          icon: <TbIcons.TbStatusChange />,
        },
        {
          title: 'Tecnicos',
          path: '/abm/abmtecnicos',
          icon: <GiIcons.GiMechanicGarage />,
        },
        {
          title: 'Tipo Camion',
          path: '/abm/abmtipocamion',
          icon: <TbIcons.TbVersions />,
        },
        {
          title: 'Transportes',
          path: '/abm/abmtransportes',
          icon: <BsIcons.BsBoxes />,
        },
      ]
    },
    {
      title: 'Reportes',
      /*path: '/list',*/
      icon: <BsIcons.BsList />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'Choferes Sin Transporte',
          path: '/listadochoferessintransporte',
          icon: <TbIcons.TbSteeringWheel />,
        },
        {
          title: 'Clientes',
          path: '/listadoclientes',
          icon: <AiIcons.AiOutlineUserSwitch />,
        },
        {
          title: 'Gastos de Transportes Finalizados',
          path: '/listadogastos',
          icon: <MdIcons.MdAttachMoney />,
        },
        {
          title: 'Transportes No Realizados',
          path: '/listadotransportesnorealizados',
          icon: <TbIcons.TbBoxOff />,
        },
        {
          title: 'Mantenimientos',
          path: '/listadomantenimientos',
          icon: <GiIcons.GiMechanicGarage />,
        },
      ]
    },
    {
      title: 'Cambiar Contraseña',
      path: '/cambiarcontraseñaadmin',
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