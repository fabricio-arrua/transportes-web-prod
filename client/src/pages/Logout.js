import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const cookies = new Cookies();

const override = css`
  display: block;
  margin: 0 auto;
`;

export default class Logout extends Component {

  cerrarSesion = () => {
    cookies.remove('usuario', {path: '/'});
    cookies.remove('nombre_completo', {path: '/'});
    cookies.remove('tipo', {path: '/'});
    cookies.remove('token', {path: '/'});

    window.location.href='./';
  }
    
  componentDidMount() { 
    this.cerrarSesion()
  }
    
  render() {
    return (
      <div className='row'>
        <div className="sweet-loading" style={{marginTop:'50vh',marginLeft:'50vh'}}>
            <ClipLoader color="#36D7B7" css={override} size={150} />
        </div>
      </div>

    )
  }
}