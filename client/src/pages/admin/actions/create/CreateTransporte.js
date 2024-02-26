import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css';
import Cookies from 'universal-cookie';
//Dates
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
//Notificaciones
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//Formik & Yup
import { useFormik, Field, FormikProvider } from 'formik';
import { transporteValidations } from "../../../../validations/transporteValidations";

const cookies = new Cookies();

const initialValues = {
  fechaInicio: '',
  kmRecorridos: '',
  origen: '',
  destino: '',
  matricula: '',
  cliente: '',
  idChofer: ''
}

export default function CreateTransporte() {

  const [optMatricula, setOptMatricula] = useState([]);
  const [optCliente, setOptCliente] = useState([]);
  const [optChofer, setOptChofer] = useState([]);
  const [idAdmin, setAdmin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setAdmin(cookies.get('usuario'));

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamionesDisponibles`, {
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

    axios.get(`http://107.22.75.115:4000/api/clientes/listarCliente`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
    .then((response) => {
      if (response.data.listado){
        setOptCliente(response.data.listado);
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

    axios.get(`http://107.22.75.115:4000/api/empleados/listadoChofer`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
    .then((response) => {
      if (response.data.listado){
        setOptChofer(response.data.listado);
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
      const fecha = format(values.fechaInicio, 'yyyy-MM-dd HH:mm:ss');

      console.log("llega hasta aca");

      if (values.idChofer === '') {
        axios.post(`http://107.22.75.115:4000/api/transportes/altaTransporteSinChofer`, {
          fechaInicio: fecha,
          kmRecorridos: values.kmRecorridos,
          origen: values.origen,
          destino: values.destino,
          matricula: values.matricula,
          cliente: values.cliente,
          idAdmin
        },
          {
            headers: {
              Authorization: cookies.get('token'),
            },
          })
          .then((response) => {
            if (response.data.message === 'Alta realizada con éxito') {
              navigate('/abm/abmtransportes')
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
      } else {
        axios.post(`http://107.22.75.115:4000/api/transportes/altaTransporteConChofer`, {
          fechaInicio: fecha,
          kmRecorridos: values.kmRecorridos,
          origen: values.origen,
          destino: values.destino,
          matricula: values.matricula,
          cliente: values.cliente,
          idChofer: values.idChofer,
          idAdmin
        },
          {
            headers: {
              Authorization: cookies.get('token'),
            },
          }).then((response) => {
            if (response.data.message === 'Alta realizada con éxito') {
              navigate('/abm/abmtransportes')
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
      }
    },
    validationSchema: transporteValidations
  })

  return (
    <div className="App">
      <Link to='/abm/abmtransportes' className="Btn">
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
          <h2 className="form-title">Registro de transportes</h2>

          <div className='form-control'>
            <label htmlFor="fechaInicio">Fecha/Hora Inicio</label>
            <Field name="fechaInicio">
              {({ field, form }) => (
                <DatePicker
                  showTimeSelect
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                  id="fechaInicio"
                  {...field}
                  selected={field.value}
                  onChange={(fechaInicio) => form.setFieldValue(field.name, fechaInicio)}
                />
              )}
            </Field>
            {formik.touched.fechaInicio && formik.errors.fechaInicio ? <div className='error'>{formik.errors.fechaInicio}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='kmRecorridos'>Kms a recorrer</label>
            <input
              type='text'
              name='kmRecorridos'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.kmRecorridos}>
            </input>
            {formik.touched.kmRecorridos && formik.errors.kmRecorridos ? <div className='error'>{formik.errors.kmRecorridos}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='origen'>Origen</label>
            <input
              type='text'
              name='origen'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.origen}>
            </input>
            {formik.touched.origen && formik.errors.origen ? <div className='error'>{formik.errors.origen}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='destino'>Destino</label>
            <input
              type='text'
              name='destino'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.destino}>
            </input>
            {formik.touched.destino && formik.errors.destino ? <div className='error'>{formik.errors.destino}</div> : null}
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

          <div className='form-control'>
            <label htmlFor='cliente'>Cliente</label>
            <div className="dropdown">
              <select
                name='cliente'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cliente}
              >
                <option value="">Seleccione un cliente</option>
                {optCliente.map((option) => (
                  <option key={option.documento} value={option.documento}>
                    {option.nombre_completo}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.cliente && formik.errors.cliente ? <div className='error'>{formik.errors.cliente}</div> : null}
          </div>

          <div className='form-control'>
            <label htmlFor='idChofer'>Chofer</label>
            <div className="dropdown">
              <select
                name='idChofer'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idChofer}
              >
                <option value="">Seleccione un chofer</option>
                {optChofer.map((option) => (
                  <option key={option.usuarioC} value={option.usuarioC}>
                    {option.nombre_completo}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.idChofer && formik.errors.idChofer ? <div className='error'>{formik.errors.idChofer}</div> : null}
          </div>

          <button className='btnSubmit' type='submit'>Crear</button>
        </form>
      </FormikProvider>
    </div>
  )
}
