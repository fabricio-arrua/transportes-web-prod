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
import { clienteValidations } from "../../../../validations/clienteValidations";

const cookies = new Cookies();

export default function UpdateCliente() {
  const [ddocumento, setDocumento] = useState('');
  const [nnombre, setNombre] = useState('');
  const [ddireccion, setDireccion] = useState('');
  const [ttelefono, setTelefono] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setDocumento(localStorage.getItem('Documento'))
    setNombre(localStorage.getItem('Nombre'));
    setDireccion(localStorage.getItem('Direccion'));
    setTelefono(localStorage.getItem('Telefono'));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      documento: ddocumento,
      nombreCompleto: nnombre,
      direccion: ddireccion,
      telefono: ttelefono
    },
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/clientes/modificarCliente`, {
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
          if (response.data.message === 'Modificación realizada con éxito') {
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
    validationSchema: clienteValidations
  })


  return (
    <div>
      <Link to='/abm/abmclientes'>
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
        <h2 className="form-title">Modificar cliente</h2>

        <div className='form-control'>
          <label htmlFor='documento'>Documento</label>
          <input
            type='text'
            readonly="readonly"
            name='documento'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.documento}>
          </input>
          {formik.touched.documento && formik.errors.documento ? <div className='error'>{formik.errors.documento}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='nombreCompleto'>Nombre completo</label>
          <input 
            type='text' 
            name='nombreCompleto' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombreCompleto}>
          </input>
          { formik.touched.nombreCompleto && formik.errors.nombreCompleto ? <div className='error'>{formik.errors.nombreCompleto}</div> : null}
        </div>

        <div className='form-control'>
          <label htmlFor='direccion'>Dirección</label>
          <input 
            type='text' 
            name='direccion' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.direccion}>
          </input>
          { formik.touched.direccion && formik.errors.direccion ? <div className='error'>{formik.errors.direccion}</div> : null}
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
          { formik.touched.telefono && formik.errors.telefono ? <div className='error'>{formik.errors.telefono}</div> : null}
        </div>

        <button className='btnSubmit' type='submit'>Modificar</button>
      </form>
    </div>
  )
}