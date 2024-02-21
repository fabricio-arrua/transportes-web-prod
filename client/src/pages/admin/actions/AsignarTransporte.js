import { Button, Form } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';

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
        console.log(error.response);
      });

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamion`, {
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
        console.log(error.response);
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
        navigate('/listadochoferessintransporte')
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
      if (error.response) {
        console.log(error.response.data + 'error.response.data');
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(error.response.status + 'error.response.status');
        toast.error('Error comuniquese con sistemas', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(error.response.header + 'error.response.header');
        toast.error(error.response.headers, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (error.request) {
        console.log(error.request + 'error.request');
        toast.error(error.request, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.log(error.message + 'error.message');
        toast.error(error.message, {
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
      console.log(error.config + 'error.config');
      toast.error(error.config, {
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
    <div>
      <Link to='/listadochoferessintransporte'>
        <button className='Btn'>Volver</button>
      </Link>

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

      <Form className="create-form">
        <Form.Field>
          <label>Usuario</label>
          <input placeholder='Usuario' readonly="readonly" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </Form.Field>
        <Form.Field>
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
        </Form.Field>
        <Form.Field>
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
        </Form.Field>
        <Button type='submit' onClick={updateAPIData}>Asignar</Button>
      </Form>
    </div>
  )
}