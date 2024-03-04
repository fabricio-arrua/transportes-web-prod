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
import { tecnicoUpdateValidations } from "../../../../validations/tecnicoUpdateValidations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

export default function UpdateTecnico() {
  const [uusuario, setUsuario] = useState('');
  const [eespecializacion, setEspecializacion] = useState('');
  const [nnombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setUsuario(localStorage.getItem('Usuario'))
    setEspecializacion(localStorage.getItem('Especializacion'));
    setNombre(localStorage.getItem('Nombre completo'))
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      usuario: uusuario,
      nombre: nnombre,
      especializacion: eespecializacion
    },
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/empleados/modificarTecnico`, {
        usuario: values.usuario,
        nombre: values.nombre,
        especializacion: values.especializacion
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Modificación realizada con éxito') {
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
    },
    validationSchema: tecnicoUpdateValidations
  })

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

      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-title">Modificar técnico</h2>
        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='usuario'>Usuario</label>
              <input
                type='text'
                readOnly ="readOnly"
                name='usuario'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario}>
              </input>
              {formik.touched.usuario && formik.errors.usuario ? <div className='error'>{formik.errors.usuario}</div> : null}
            </div>
          </div>
          <div className='col-6'>
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
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='especializacion'>Especialización</label>
              <input
                type='text'
                name='especializacion'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.especializacion}>
              </input>
              {formik.touched.especializacion && formik.errors.especializacion ? <div className='error'>{formik.errors.especializacion}</div> : null}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-1'>
            <button className='btnSubmit' type='submit'>Modificar</button>
          </div>
          <div className='col-2'>
            <Link to='/abm/modPassword'>
              <button className='btnSubmit'>Cambiar contraseña</button>
            </Link>
          </div>
        </div>
     
      </form>
      <Link to='/abm/abmtecnicos'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}