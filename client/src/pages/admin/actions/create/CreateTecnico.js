import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from 'formik';
import { tecnicoValidations } from "../../../../validations/tecnicoValidations";

const cookies = new Cookies();

const initialValues = {
  usuario: '',
  contrasenia: '',
  nombre: '',
  especializacion: ''
}

export default function CreateTecnico() {
  const navigate = useNavigate();

  let especializaciones = [
    { label: "Electrónica", value: "electrónica" },
    { label: "Mecánica", value: "mecánica" },
    { label: "Estética", value: "estética" }
  ]

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }
  }, [])

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/empleados/altaTecnico`, {
        usuario: values.usuario,
        contrasenia: values.contrasenia,
        nombre: values.nombre,
        especializacion: values.especializacion
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Alta realizada con éxito') {
            navigate('/abm/abmtecnicos')
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
    validationSchema: tecnicoValidations
  })

  return (
    <div className="App">
      <Link to='/abm/abmtecnicos' className="Btn">
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
        <h2 className="form-title">Registro de tecnicos</h2>

        <div className='form-control'>
          <label htmlFor='usuario'>Usuario</label>
          <input
            type='text'
            name='usuario'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.usuario}>
          </input>
          {formik.touched.usuario && formik.errors.usuario ? <div className='error'>{formik.errors.usuario}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='contrasenia'>Contraseña</label>
          <input
            type='password'
            name='contrasenia'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contrasenia}>
          </input>
          {formik.touched.contrasenia && formik.errors.contrasenia ? <div className='error'>{formik.errors.contrasenia}</div> : null}
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
          <label htmlFor='especializacion'>Especialización</label>
          <div className="dropdown">
            <select
              name='especializacion'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.especializacion}
            >
              <option value="">Seleccione una especialización</option>
              {especializaciones.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.especializacion && formik.errors.especializacion ? <div className='error'>{formik.errors.especializacion}</div> : null}
        </div>

        <button className='btnSubmit' type='submit'>Crear</button>
      </form>
    </div>
  )
}