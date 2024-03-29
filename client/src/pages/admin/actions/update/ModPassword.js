import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

export default function ModPassword() {
  const [usuario, setUsuario] = useState('');
	const [contrasenia, setContrasenia] = useState('');
  const [contrasenia2, setContrasenia2] = useState('');

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
      ).then((response) => {
        if (response.data.message === 'Contraseña cambiada con éxito') {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            navigate('/homeadmin')
          }, 2000);
        } else {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
    } else {
      toast.error('Las contraseñas no coinciden, vuelva a intentarlo.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Form>
        <h2 className="form-title">Modificar contraseña</h2>
        <div className='row'>
          <div className='col-6'>
            <Form.Field>
              <div className='form-control'>
                <label>Usuario</label>
                <input placeholder='Usuario' readOnly ="readOnly" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>  
              </div>
              </Form.Field>
          </div>
          <div className='col-6'>
            <Form.Field>
              <div className='form-control'>
                <label>Nueva contraseña</label>
                <input placeholder='Nueva contraseña' type='password' value={contrasenia} onChange={(e) => setContrasenia(e.target.value)}/>              
              </div>
              </Form.Field>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
          <Form.Field>
            <div className='form-control'>
              <label>Confirmar contraseña</label>
              <input placeholder='Confirmar contraseña' type='password' value={contrasenia2} onChange={(e) => setContrasenia2(e.target.value)}/>
            </div>
           </Form.Field>
          </div>
        </div>
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