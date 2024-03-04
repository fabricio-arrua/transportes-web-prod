import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

export default function AsignarTransporte() {
  const [usuario, setUsuario] = useState('');
  const [id_transporte, setTransporte] = useState('');
  const [matricula, setMatricula] = useState('');
  const [optTransporte, setOptTransporte] = useState([]);
  const [optMatricula, setOptMatricula] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setUsuario(localStorage.getItem('Usuario'))

    axios.get(`http://107.22.75.115:4000/api/transportes/listadoTransporteSinChofer`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
      .then((response) => {
        if (response.data.listado) {
          setOptTransporte(response.data.listado);
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
      .catch((error) => {
        toast.error('Error, comuniquese con sistemas', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      });

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamionesDisponibles`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
      .then((response) => {
        if (response.data.listado) {
          setOptMatricula(response.data.listado);
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
      .catch((error) => {
        toast.error('Error, comuniquese con sistemas', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      });
  }, []);

  const updateAPIData = () => {
    axios.post(`http://107.22.75.115:4000/api/transportes/asignarTransporte`, {
      idTransporte: id_transporte,
      idChofer: usuario,
      idCamion: matricula
    },
      {
        headers: {
          Authorization: cookies.get('token'),
        },
      }
    ).then((response) => {
      if (response.data.message === 'Se asignó el chofer al transporte exitosamente') {
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
          navigate('/listadochoferessintransporte');
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
    }).catch(function (error) {
      toast.error('Error, comuniquese con sistemas', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  }

  return (
    <div className="App">

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
      <h2 className="form-title">Asignar Transporte</h2>
        <Form.Field>
        <div className='form-control'>
          <label>Usuario</label>
          <input placeholder='Usuario' readOnly ="readOnly" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>

        </Form.Field>
        <Form.Field>
        <div className='form-control'>
          <label>Transporte</label>
            <div className="dropdown">
              <select
                value={id_transporte}
                onChange={(e) => setTransporte(e.target.value)}
              >
                <option value="">Seleccione un Transporte</option>
                {optTransporte.map((option) => (
                  <option key={option.id_transporte} value={option.id_transporte}>
                    Origen:{option.origen} / Destino:{option.destino} / Cliente:{option.documentoCliente}
                  </option>
                ))}
              </select>
            </div>
        </div>

        </Form.Field>
        <Form.Field>
          <div className='form-control'>
            <label>Matrícula</label>
            <div className="dropdown">
              <select
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              >
                <option value="">Seleccione un camión</option>
                {optMatricula.map((option) => (
                  <option key={option.matricula} value={option.matricula}>
                    Matrícula:{option.matricula} / Marca:{option.marca} / Tipo:{option.id_tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>     
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Asignar</Button>
      </Form>
      <Link to='/listadochoferessintransporte'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}