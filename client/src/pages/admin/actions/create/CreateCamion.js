import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from 'formik';
import { camionValidations } from "../../../../validations/camionValidations";

const cookies = new Cookies();

const initialValues = {
  matricula: '',
  anio: '',
  marca: '',
  kilometros: '',
  idEstado: '',
  idTipoCamion: ''
}

export default function CreateCamion() {

  const navigate = useNavigate();
  const [optEstado, setOptEstado] = useState([]);
  const [optTipo, setOptTipo] = useState([]);

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/camiones/altaCamion`, {
        matricula:values.matricula,
        anio:values.anio,
        marca:values.marca,
        kilometros:values.kilometros,
        idEstado:values.idEstado,
        idTipoCamion:values.idTipoCamion
        },
          {
            headers: {
              Authorization: cookies.get('token'),
            },
          }).then((response) => {
            if (response.data.message === 'Alta realizada con éxito') {
              navigate('/abm/abmcamiones');
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
    },
    validationSchema:camionValidations
  })

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    axios.get(`http://107.22.75.115:4000/api/estadoCamiones/listadoEstadoCamion`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
      .then((response) => {
        if (response.data.listado){
          setOptEstado(response.data.listado);
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

    axios.get(`http://107.22.75.115:4000/api/tipoCamiones/listadoTipoCamion`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
    .then((response) => {
      if (response.data.listado){
        setOptTipo(response.data.listado);
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
  }, [])

  return (
    <div className="App">
      <Link to='/abm/abmcamiones' className="Btn">
        Volver
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

      <form onSubmit={formik.handleSubmit}>
      <h2 className="form-title">Registro de camiones</h2>

        <div className='form-control'>
          <label htmlFor='matricula'>Matrícula</label>
          <input 
            type='text' 
            name='matricula' 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.matricula}>
          </input>
          { formik.touched.matricula && formik.errors.matricula ? <div className='error'>{formik.errors.matricula}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='anio'>Año</label>
          <input 
            type='text' 
            name='anio' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.anio}>
          </input>
          { formik.touched.anio && formik.errors.anio ? <div className='error'>{formik.errors.anio}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='marca'>Marca</label>
          <input
            type='text'
            name='marca'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={formik.values.marca}>
          </input>
          { formik.touched.marca && formik.errors.marca ? <div className='error'>{formik.errors.marca}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='kilometros'>Kilometros</label>
          <input
            type='text'
            name='kilometros'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.kilometros}>
          </input>
          { formik.touched.kilometros && formik.errors.kilometros ? <div className='error'>{formik.errors.kilometros}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='idEstado'>Estado</label>
          <div className="dropdown">
            <select
            name='idEstado'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idEstado}
            >
            <option value="">Seleccione un estado</option>
            {optEstado.map((option) => (
              <option key={option.id_estado} value={option.id_estado}>
              {option.descripcion}
              </option>
            ))}
            </select>
          </div>
          { formik.touched.idEstado && formik.errors.idEstado ? <div className='error'>{formik.errors.idEstado}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='idTipoCamion'>Tipo</label>
          <div className="dropdown">
            <select
            name='idTipoCamion'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idTipoCamion}
            >
            <option value="">Seleccione un tipo</option>
            {optTipo.map((option) => (
              <option key={option.id_tipo} value={option.id_tipo}>
              {option.descripcion}
              </option>
            ))}
            </select>
          </div>
          { formik.touched.idTipoCamion && formik.errors.idTipoCamion ? <div className='error'>{formik.errors.idTipoCamion}</div> : null}
        </div>

        <button className='btnSubmit' type='submit'>Crear</button>
      </form>
    </div>
  )
}