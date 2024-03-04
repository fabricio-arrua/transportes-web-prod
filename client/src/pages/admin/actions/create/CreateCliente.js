import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from 'formik';
import { clienteValidations } from "../../../../validations/clienteValidations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

const initialValues = {
  documento: '',
  nombreCompleto: '',
  direccion: '',
  telefono: ''
}

export default function CreateCliente() {
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }
  }, [])

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/clientes/altaCliente`, {
        documento: values.documento,
        nombreCompleto: values.nombreCompleto,
        direccion: values.direccion,
        telefono: values.telefono
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Alta realizada con éxito') {
            navigate('/abm/abmclientes')
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
    validationSchema: clienteValidations
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
        <h2 className="form-title">Registro de clientes</h2>

        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='documento'>Documento</label>
              <input
                type='text'
                name='documento'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.documento}>
              </input>
              {formik.touched.documento && formik.errors.documento ? <div className='error'>{formik.errors.documento}</div> : null}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='nombreCompleto'>Nombre Completo</label>
              <input
                type='text'
                name='nombreCompleto'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombreCompleto}>
              </input>
              {formik.touched.nombreCompleto && formik.errors.nombreCompleto ? <div className='error'>{formik.errors.nombreCompleto}</div> : null}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='direccion'>Dirección</label>
              <input
                type='text'
                name='direccion'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.direccion}>
              </input>
              {formik.touched.direccion && formik.errors.direccion ? <div className='error'>{formik.errors.direccion}</div> : null}
            </div>
          </div>
          <div className='col-6'>
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
          </div>
        </div>
        <button className='btnSubmit' type='submit'>Crear</button>
      </form>
      <Link to='/abm/abmclientes'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}