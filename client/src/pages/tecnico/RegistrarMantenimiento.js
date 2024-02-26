import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/misBtns.css';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useFormik, Field, FormikProvider } from 'formik';
import { mantenimientoValidations } from "../../validations/mantenimientoValidations";
//Dates
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
//import 'react-datepicker/dist/react-datepicker.css';

const cookies = new Cookies();

const initialValues = {
  fecha: '',
  costo: '',
  observacion: '',
  matricula: ''
}

function RegistrarMantenimiento() {

  const navigate = useNavigate();
  const [optMatricula, setOptMatricula] = useState([]);
  const [idTecnico, setTecnico] = useState([]);

  
  useEffect(() => {
    if (cookies.get('tipo') !== 'T') {
      window.location.href = '/';
    }

    setTecnico(cookies.get('usuario'));

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamionesMantenimiento`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
    .then((response) => {
      if (response.data.listado){
        setOptMatricula(response.data.listado);
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
      const date = format(values.fecha, 'yyyy-MM-dd');

      axios.post(`http://107.22.75.115:4000/api/mantenimientos/registroMantenimiento`, {
        fecha:date,
        costo:values.costo,
        observacion:values.observacion,
        matricula:values.matricula,
        idTecnico
        },
          {
            headers: {
              Authorization: cookies.get('token'),
            },
          }).then((response) => {
            if (response.data.message === 'Registro de mantenimiento realizado con éxito') {
              navigate('/abmmantenimiento');
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
    validationSchema:mantenimientoValidations
  })

  return (
    <div className="App">
      <Link to='/abmmantenimiento' className="Btn">
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
          <h2 className="form-title">Registro de mantenimiento</h2>

          <div className='form-control'>
            <label htmlFor="fecha">Fecha</label>
            <Field name="fecha">
              {({ field, form }) => (
                <DatePicker
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  id="fecha"
                  {...field}
                  selected={field.value}
                  onChange={(fecha) => form.setFieldValue(field.name, fecha)}
                />
              )}
            </Field>
            {formik.touched.fecha && formik.errors.fecha ? <div className='error'>{formik.errors.fecha}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='costo'>Costo</label>
            <input
              type='number'
              name='costo'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.costo}>
            </input>
            {formik.touched.costo && formik.errors.costo ? <div className='error'>{formik.errors.costo}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='observacion'>Observación</label>
            <input
              type='text'
              name='observacion'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.observacion}>
            </input>
            {formik.touched.observacion && formik.errors.observacion ? <div className='error'>{formik.errors.observacion}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='matricula'>Matrícula</label>
            <div className="dropdown">
              <select
                name='matricula'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.matricula}
              >
                <option value="">Seleccione una matrícula</option>
                {optMatricula.map((option) => (
                  <option key={option.matricula} value={option.matricula}>
                    {option.matricula}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.matricula && formik.errors.matricula ? <div className='error'>{formik.errors.matricula}</div> : null}
          </div>

          <button className='btnSubmit' type='submit'>Crear</button>
        </form>
      </FormikProvider>
    </div>
  )
}

export default RegistrarMantenimiento