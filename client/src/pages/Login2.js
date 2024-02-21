import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../css/Login2.css'

export default function Login2() {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [navAdmin, setNavAdmin] = useState(false);
  const [navTec, setNavTec] = useState(false);
  const [msgError, setMsgError] = useState('');
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations
    axios
      .post("http://107.22.75.115:4000/api/empleados/logueo", { usuario, contrasenia })
      .then(response => {
        if (response.data.message === 'Datos ingresados correctos') {
          cookies.set('usuario', response.data.usuario.usuario, {path: '/'});
          cookies.set('nombre_completo', response.data.usuario.nombre_completo, {path: '/'});
          cookies.set('tipo', response.data.usuario.Tipo, {path: '/'})
          cookies.set('token', response.data.token, {path: '/'})
          
          if (response.data.usuario.Tipo === 'A'){
            setNavAdmin(!navAdmin);
          }
          else if(response.data.usuario.Tipo === 'T'){
            setNavTec(!navTec);
          }
        } else {
          setMsgError("El usuario o la contraseña no son correctos.");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    if(navAdmin){
      navigate('/homeadmin');
    } else if (navTec) {
      navigate('/hometecnico');
    }
  });

  return (
    <div className="login-box">
      <label className="texto-error">{msgError}</label>
      <h2>Iniciar sesión</h2>
      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="usuario"
            id="usuario"
            required=""
            placeholder='Ingrese su usuario'
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            />
          <label for="usuario">Usuario</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="contrasenia"
            id="contrasenia"
            placeholder='*********'
            required=""
            value={contrasenia}
            onChange={e => setContrasenia(e.target.value)}
            />
          <label for="contrasenia">Contraseña</label>
        </div>
        <button type="submit" href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Ingresar
        </button>
      </form>
    </div>
  )
}