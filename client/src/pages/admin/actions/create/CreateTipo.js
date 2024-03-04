import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from 'formik';
import { tipoValidations } from "../../../../validations/tipoValidations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

const initialValues = {
  idTipo: '',
  descripcion: '',
  dimensiones: '',
  ejes: '',
  carga: '',
  combustible: ''
}


export default function CreateTipo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }
  }, [])

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/tipoCamiones/altaTipoCamion`, {
        idTipo: values.idTipo,
        descripcion: values.descripcion,
        dimensiones: values.dimensiones,
        ejes: values.ejes,
        carga: values.carga,
        combustible: values.combustible
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Alta realizada con éxito') {
            navigate('/abm/abmtipocamion')
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
    validationSchema: tipoValidations
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
        <h2 className="form-title">Registro de tipo camión</h2>
        <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='idTipo'>Id</label>
                <input
                  type='text'
                  name='idTipo'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idTipo}>
                </input>
                {formik.touched.idTipo && formik.errors.idTipo ? <div className='error'>{formik.errors.idTipo}</div> : null}
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
        <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='dimensiones'>Dimensiones</label>
                <input
                  type='text'
                  name='dimensiones'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dimensiones}>
                </input>
                {formik.touched.dimensiones && formik.errors.dimensiones ? <div className='error'>{formik.errors.dimensiones}</div> : null}
              </div>
            </div>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='ejes'>Cantidad de ejes</label>
                <input
                  type='number'
                  name='ejes'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ejes}>
                </input>
                {formik.touched.ejes && formik.errors.ejes ? <div className='error'>{formik.errors.ejes}</div> : null}
              </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='carga'>Capacidad de carga (Kgs)</label>
                <input
                  type='number'
                  name='carga'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.carga}>
                </input>
                {formik.touched.carga && formik.errors.carga ? <div className='error'>{formik.errors.carga}</div> : null}
              </div>
            </div>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='combustible'>Capacidad de combustible (Lts)</label>
                <input
                  type='number'
                  name='combustible'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.combustible}>
                </input>
                {formik.touched.combustible && formik.errors.combustible ? <div className='error'>{formik.errors.combustible}</div> : null}
              </div>
            </div>
        </div>
        <button className='btnSubmit' type='submit'>Crear</button>
      </form>
      <Link to='/abm/abmtipocamion'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}