import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/misBtns.css';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik, FormikProvider } from 'formik';
import { solicitudesValidations } from "../../validations/solicitudesValidations";

const cookies = new Cookies();

const initialValues = {
  idMantenimiento: '',
  producto: '',
  cantidad: ''
}


function SolicitudDeMateriales() {

  const navigate = useNavigate();
  const [optMantenimientos, setOptMantenimientos] = useState([]);

  useEffect(() => {
    if (cookies.get('tipo') !== 'T') {
      window.location.href = '/';
    }

    console.log(cookies.get('token'));

    //FALTA QUE DIEGO DEFINA LA URL CORRECTA
    axios.get(`http://107.22.75.115:4000/api/mantenimientos/listarMantenimiento`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
      .then((response) => {
        if (response.data.listado) {
          setOptMantenimientos(response.data.listado);
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

  const formik = useFormik({
    initialValues,
    onSubmit: values => {

      axios.post(`http://107.22.75.115:4000/api/solicitudMateriales/altaSolicitud`, {
        idMantenimiento: values.idMantenimiento,
        producto: values.producto,
        cantidad: values.cantidad
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Alta de solicitud realizada con éxito') {
            navigate('/hometecnico');
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
    validationSchema: solicitudesValidations
  })

  return (
    <div className="App">
      <Link to='/hometecnico' className="Btn">
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

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="form-title">Solicitud de materiales</h2>

          <div className='form-control'>
            <label htmlFor='idMantenimiento'>Mantenimiento</label>
            <div className="dropdown">
              <select
                name='idMantenimiento'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idMantenimiento}
              >
                <option value="">Seleccione un mantenimiento</option>
                {optMantenimientos.map((option) => (
                  <option key={option.id_mantenimiento} value={option.id_mantenimiento}>
                    Id:{option.id_mantenimiento} / Obervación:{option.observaciones} / Matricula:{option.matricula}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.idMantenimiento && formik.errors.idMantenimiento ? <div className='error'>{formik.errors.idMantenimiento}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='producto'>Producto</label>
            <input
              type='text'
              name='producto'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.producto}>
            </input>
            {formik.touched.producto && formik.errors.producto ? <div className='error'>{formik.errors.producto}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='cantidad'>Cantidad</label>
            <input
              type='number'
              name='cantidad'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cantidad}>
            </input>
            {formik.touched.cantidad && formik.errors.cantidad ? <div className='error'>{formik.errors.cantidad}</div> : null}
          </div>

          <button className='btnSubmit' type='submit'>Crear</button>
        </form>
      </FormikProvider>
    </div>
  )
}

export default SolicitudDeMateriales