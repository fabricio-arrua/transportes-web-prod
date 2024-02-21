import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Logout extends Component {

  cerrarSesion = () => {
    cookies.remove('usuario', {path: '/'});
    cookies.remove('nombre_completo', {path: '/'});
    cookies.remove('tipo', {path: '/'});
    cookies.remove('token', {path: '/'});

    window.location.href='./';
  }
    
  componentDidMount() { 
    /*if(cookies.get('tipo') !== 'A'){
      window.location.href='./';
    }*/

    this.cerrarSesion()
  }
    
  render() {
    return (
      <div>
        ADIOS!
      </div>
    )
  }
}