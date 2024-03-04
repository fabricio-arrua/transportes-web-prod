import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from 'formik';
import { estadoValidations } from "../../../../validations/estadoValidations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

const initialValues = {
  idEstado: '',
  descripcion: ''
}

export default function CreateEstado() {
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }
  }, [])

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/estadoCamiones/altaEstadoCamion`, {
        idEstado: values.idEstado,
        descripcion: values.descripcion
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Alta realizada con éxito') {
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
    validationSchema: estadoValidations
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
        <h2 className="form-title">Registro de estado camión</h2>

        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='idEstado'>Id</label>
              <input
                type='text'
                name='idEstado'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idEstado}>
              </input>
              {formik.touched.idEstado && formik.errors.idEstado ? <div className='error'>{formik.errors.idEstado}</div> : null}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='descripcion'>Descripción</label>
              <input
                type='text'
                name='descripcion'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.descripcion}>
              </input>
              {formik.touched.descripcion && formik.errors.descripcion ? <div className='error'>{formik.errors.descripcion}</div> : null}
            </div>
          </div>
        </div>
        <button className='btnSubmit' type='submit'>Crear</button>
      </form>
      <Link to='/abm/abmestadocamion'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}