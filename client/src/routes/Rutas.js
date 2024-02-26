import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/Rutas.css'
import 'semantic-ui-css/semantic.min.css'

//pages
import Login2 from '../pages/Login2';
import Logout from '../pages/Logout';
//pages-admin
import HomeAdmin from '../pages/admin/HomeAdmin';
import ABMChoferes from '../pages/admin/abm/ABMChoferes';
import ABMTecnicos from '../pages/admin/abm/ABMTecnicos';
import ABMCamiones from '../pages/admin/abm/ABMCamiones';
import ABMClientes from '../pages/admin/abm/ABMClientes';
import ABMEstadoCamion from '../pages/admin/abm/ABMEstadoCamion';
import ABMTipoCamion from '../pages/admin/abm/ABMTipoCamion';
import ABMTransportes from '../pages/admin/abm/ABMTransportes';
import ListadoChoferesSinTransporte from '../pages/admin/list/ListadoChoferesSinTransporte';
import ListadoDeClientes from '../pages/admin/list/ListadoDeClientes';
import ListadoDeGastos from '../pages/admin/list/ListadoDeGastos';
import ListadoTransportesNoRealizados from '../pages/admin/list/ListadoTransportesNoRealizados';
import ListadoSolicitudesMaterial from '../pages/admin/list/ListadoSolicitudesMaterial';
import ListadoMantenimientos from '../pages/admin/list/ListadoMantenimientos';
//pages-admin/actions
//create
import CreateChofer from '../pages/admin/actions/create/CreateChofer'
import CreateCamion from '../pages/admin/actions/create/CreateCamion'
import CreateCliente from '../pages/admin/actions/create/CreateCliente'
import CreateEstado from '../pages/admin/actions/create/CreateEstado'
import CreateTipo from '../pages/admin/actions/create/CreateTipo'
import CreateTecnico from '../pages/admin/actions/create/CreateTecnico'
import CreateTransporte from '../pages/admin/actions/create/CreateTransporte'
//update
import UpdateChofer from '../pages/admin/actions/update/UpdateChofer'
import UpdateCamion from '../pages/admin/actions/update/UpdateCamion'
import UpdateCliente from '../pages/admin/actions/update/UpdateCliente'
import UpdateEstado from '../pages/admin/actions/update/UpdateEstado'
import UpdateTipo from '../pages/admin/actions/update/UpdateTipo'
import UpdateTecnico from '../pages/admin/actions/update/UpdateTecnico'
import UpdateTransporte from '../pages/admin/actions/update/UpdateTransporte'
import ModPassword from '../pages/admin/actions/update/ModPassword'
import AsignarTransporte from '../pages/admin/actions/AsignarTransporte'
import CambiarContraseñaAdmin from '../pages/admin/actions/CambiarContraseñaAdmin'

//pages-tecnico
import HomeTecnico from '../pages/tecnico/HomeTecnico';
import ABMMantenimiento from '../pages/tecnico/ABMMantenimiento';
import UpdateMantenimiento from '../pages/tecnico/UpdateMantenimiento';
import RegistrarMantenimiento from '../pages/tecnico/RegistrarMantenimiento';
import SolicitudDeMateriales from '../pages/tecnico/SolicitudDeMateriales';
import CambiarContraseña from '../pages/tecnico/CambiarContraseña';

//components
import NavbarAdmin from '../components/Navbar';
import NavbarTecnico from '../components/NavbarTecnico';
import MaybeShowNavBar from '../components/MaybeShowNavBar';
import MaybeShowNavBarTecnico from '../components/MaybeShowNavBarTecnico';


function Rutas () {
  return (
    <div className='contanier' >
      <BrowserRouter>
      <MaybeShowNavBar>
        <NavbarAdmin />
      </MaybeShowNavBar>
      <MaybeShowNavBarTecnico>
        <NavbarTecnico />
      </MaybeShowNavBarTecnico>
      <div className="main">
        <Routes>
          <Route exact path='/' Component={Login2}/>
          <Route exact path='/homeadmin' Component={HomeAdmin}/>
          <Route exact path='/abm/modPassword' Component={ModPassword}/>
          <Route exact path='/abm/abmchoferes' Component={ABMChoferes}/>
          <Route exact path='/abm/abmchoferes/CreateChofer' Component={CreateChofer}/>
          <Route exact path='/abm/abmchoferes/UpdateChofer' Component={UpdateChofer}/>
          <Route exact path='/abm/abmtecnicos' Component={ABMTecnicos}/>
          <Route exact path='/abm/abmtecnicos/CreateTecnico' Component={CreateTecnico}/>
          <Route exact path='/abm/abmtecnicos/UpdateTecnico' Component={UpdateTecnico}/>
          <Route exact path='/abm/abmcamiones' Component={ABMCamiones}/>
          <Route exact path='/abm/abmcamiones/CreateCamion' Component={CreateCamion}/>
          <Route exact path='/abm/abmcamiones/UpdateCamion' Component={UpdateCamion}/>
          <Route exact path='/abm/abmclientes' Component={ABMClientes}/>
          <Route exact path='/abm/abmclientes/CreateCliente' Component={CreateCliente}/>
          <Route exact path='/abm/abmclientes/UpdateCliente' Component={UpdateCliente}/>          
          <Route exact path='/abm/abmestadocamion' Component={ABMEstadoCamion}/>
          <Route exact path='/abm/abmestadocamion/CreateEstado' Component={CreateEstado}/>
          <Route exact path='/abm/abmestadocamion/UpdateEstado' Component={UpdateEstado}/>
          <Route exact path='/abm/abmtipocamion' Component={ABMTipoCamion}/>
          <Route exact path='/abm/abmtipocamion/CreateTipo' Component={CreateTipo}/>
          <Route exact path='/abm/abmtipocamion/UpdateTipo' Component={UpdateTipo}/>
          <Route exact path='/abm/abmtransportes' Component={ABMTransportes}/>
          <Route exact path='/abm/abmtransportes/CreateTransporte' Component={CreateTransporte}/>
          <Route exact path='/abm/abmtransportes/UpdateTransporte' Component={UpdateTransporte}/>
          <Route exact path='/listadochoferessintransporte' Component={ListadoChoferesSinTransporte}/>
          <Route exact path='/asignartransporte' Component={AsignarTransporte}/>
          <Route exact path='/listadoclientes' Component={ListadoDeClientes}/>
          <Route exact path='/listadogastos' Component={ListadoDeGastos}/>
          <Route exact path='/listadotransportesnorealizados' Component={ListadoTransportesNoRealizados}/>
          <Route exact path='/listadosolicitudesmaterial' Component={ListadoSolicitudesMaterial}/>
          <Route exact path='/listadomantenimientos' Component={ListadoMantenimientos}/>
          <Route exact path='/hometecnico' Component={HomeTecnico}/>
          <Route exact path='/abmmantenimiento' Component={ABMMantenimiento}/>
          <Route exact path='/updatemantenimiento' Component={UpdateMantenimiento}/>
          <Route exact path='/registrarmantenimiento' Component={RegistrarMantenimiento}/>
          <Route exact path='/solicitudmateriales' Component={SolicitudDeMateriales}/>
          <Route exact path='/cambiarcontraseña' Component={CambiarContraseña}/>
          <Route exact path='/cambiarcontraseñaadmin' Component={CambiarContraseñaAdmin}/>
          <Route exact path='/logout' Component={Logout}/>
        </Routes>
      </div>
      <div className='footer'>
        <div className='copyright'>
          © 2024 Transportes FED. Todos los derechos reservados.
        </div>
      </div>
    </BrowserRouter>
    </div>   
  );
}

export default Rutas;
