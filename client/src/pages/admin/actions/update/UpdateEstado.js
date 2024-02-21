import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
//Notificaciones
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//Formik & Yup
import { useFormik } from 'formik';
import { estadoValidations } from "../../../../validations/estadoValidations";

const cookies = new Cookies();

export default function UpdateEstado() {
  const [iidEstado, setId] = useState('');
  const [ddescripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setId(localStorage.getItem('Id'))
    setDescripcion(localStorage.getItem('Desc'));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idEstado: iidEstado,
      descripcion: ddescripcion
    },
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/estadoCamiones/modificarEstadoCamion`, {
        idEstado: values.idEstado,
        descripcion: values.descripcion
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Modificación realizada con éxito') {
            navigate('/abm/abmestadocamion')
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
    validationSchema: estadoValidations
  })

  return (
    <div>
      <Link to='/abm/abmestadocamion'>
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

      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-title">Modificar estado de camiones</h2>

        <div className='form-control'>
          <label htmlFor='idEstado'>Id</label>
          <input
            type='text'
            readonly="readonly"
            name='idEstado'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idEstado}>
          </input>
          {formik.touched.idEstado && formik.errors.idEstado ? <div className='error'>{formik.errors.idEstado}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='descripcion'>Descripción</label>
          <input 
            type='text' 
            name='descripcion' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.descripcion}>
          </input>
          { formik.touched.descripcion && formik.errors.descripcion ? <div className='error'>{formik.errors.descripcion}</div> : null}
        </div>

        <button className='btnSubmit' type='submit'>Modificar</button>
      </form>
    </div>
  )
}