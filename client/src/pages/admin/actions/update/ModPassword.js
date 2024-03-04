import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

export default function ModPassword() {
  const [usuario, setUsuario] = useState('');
	const [contrasenia, setContrasenia] = useState('');
  const [contrasenia2, setContrasenia2] = useState('');
  const [msgError, setMsgError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    setUsuario(localStorage.getItem('Usuario'))
  }, []);

  const updateAPIData = () => {
    if(contrasenia === contrasenia2) {
      axios.post(`http://107.22.75.115:4000/api/empleados/ModificarContrasenia`, {
        usuario,
        contrasenia
      },
      {
        headers: {
          Authorization: cookies.get('token'), 
        },
      }
      ).then(() => {
        navigate('/abm/abmchoferes')
      })
    } else {
      setMsgError("Las contraseñas no coinciden, vuelva a intentarlo.");
    }
  }

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>Usuario</label>
          <input placeholder='Usuario' readOnly ="readOnly" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Nueva contraseña</label>
          <input placeholder='Nueva contraseña' type='password' value={contrasenia} onChange={(e) => setContrasenia(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Confirmar contraseña</label>
          <input placeholder='Confirmar contraseña' type='password' value={contrasenia2} onChange={(e) => setContrasenia2(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <span className="texto-error">{msgError}</span>
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Modificar</Button>
      </Form>
      <Link to='/abm/abmchoferes'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}