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
import { choferUpdateValidations } from "../../../../validations/choferUpdateValidations";

const cookies = new Cookies();

export default function UpdateChofer() {
  const [uusuario, setUsuario] = useState('');
  const [llicencia, setLicencia] = useState('');
  const [ttelefono, setTelefono] = useState('');
  const [nnombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setUsuario(localStorage.getItem('Usuario'))
    setLicencia(localStorage.getItem('Licencia'));
    setTelefono(localStorage.getItem('Telefono'));
    setNombre(localStorage.getItem('Nombre completo'))
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      usuario: uusuario,
      nombre: nnombre,
      licencia: llicencia,
      telefono: ttelefono
    },
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/empleados/modificarChofer`, {
        usuario: values.usuario,
        nombre: values.nombre,
        licencia: values.licencia,
        telefono: values.telefono
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Modificación realizada con éxito') {
            navigate('/abm/abmchoferes')
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
    validationSchema: choferUpdateValidations
  })

  return (
    <div>
      <Link to='/abm/abmchoferes'>
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
        <h2 className="form-title">Modificar chofer</h2>

        <div className='form-control'>
          <label htmlFor='usuario'>Usuario</label>
          <input
            type='text'
            readonly="readonly"
            name='usuario'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.usuario}>
          </input>
          {formik.touched.usuario && formik.errors.usuario ? <div className='error'>{formik.errors.usuario}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='nombre'>Nombre completo</label>
          <input
            type='text'
            name='nombre'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombre}>
          </input>
          {formik.touched.nombre && formik.errors.nombre ? <div className='error'>{formik.errors.nombre}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='licencia'>Licencia</label>
          <input
            type='text'
            name='licencia'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.licencia}>
          </input>
          {formik.touched.licencia && formik.errors.licencia ? <div className='error'>{formik.errors.licencia}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='telefono'>Teléfono</label>
          <input
            type='text'
            name='telefono'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telefono}>
          </input>
          {formik.touched.telefono && formik.errors.telefono ? <div className='error'>{formik.errors.telefono}</div> : null}
        </div>

        <button className='btnSubmit' type='submit'>Modificar</button>
        &nbsp;
        <Link to='/abm/modPassword'>
          <button className='btnSubmit'>Cambiar contraseña</button>
        </Link>
      </form>
    </div>
  )
}