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
import { tipoValidations } from "../../../../validations/tipoValidations";

const cookies = new Cookies();

export default function UpdateTipo() {
  const [iidTipo, setId] = useState('');
  const [ddescripcion, setDescripcion] = useState('');
  const [ddimensiones, setDemensiones] = useState('');
  const [eejes, setEjes] = useState('');
  const [ccarga, setCarga] = useState('');
  const [ccombustible, setCombustible] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setId(localStorage.getItem('Id'))
    setDescripcion(localStorage.getItem('Desc'));
    setDemensiones(localStorage.getItem('Dimensiones'));
    setEjes(localStorage.getItem('Ejes'));
    setCarga(localStorage.getItem('Carga'));
    setCombustible(localStorage.getItem('Combustible'));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idTipo: iidTipo,
      descripcion: ddescripcion,
      dimensiones: ddimensiones,
      ejes: eejes,
      carga: ccarga,
      combustible: ccombustible
    },
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/tipoCamiones/modificarTipoCamion`, {
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
          if (response.data.message === 'Modificación realizada con éxito') {
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
    validationSchema: tipoValidations
  })

  return (
    <div>
      <Link to='/abm/abmtipocamion'>
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
        <h2 className="form-title">Modificar tipo de camiones</h2>

        <div className='form-control'>
          <label htmlFor='idTipo'>Id</label>
          <input
            type='text'
            readonly="readonly"
            name='idTipo'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idTipo}>
          </input>
          {formik.touched.idTipo && formik.errors.idTipo ? <div className='error'>{formik.errors.idTipo}</div> : null}
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

        <div className='form-control'>
          <label htmlFor='dimensiones'>Dimensiones</label>
          <input 
            type='text' 
            name='dimensiones' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dimensiones}>
          </input>
          { formik.touched.dimensiones && formik.errors.dimensiones ? <div className='error'>{formik.errors.dimensiones}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='ejes'>Cantidad de ejes</label>
          <input 
            type='number' 
            name='ejes' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ejes}>
          </input>
          { formik.touched.ejes && formik.errors.ejes ? <div className='error'>{formik.errors.ejes}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='carga'>Capacidad de carga (Kgs)</label>
          <input 
            type='number' 
            name='carga' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.carga}>
          </input>
          { formik.touched.carga && formik.errors.carga ? <div className='error'>{formik.errors.carga}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='combustible'>Capacidad de combustible (Lts)</label>
          <input 
            type='number' 
            name='combustible' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.combustible}>
          </input>
          { formik.touched.combustible && formik.errors.combustible ? <div className='error'>{formik.errors.combustible}</div> : null}
        </div>

        <button className='btnSubmit' type='submit'>Modificar</button>
      </form>
    </div>
  )
}