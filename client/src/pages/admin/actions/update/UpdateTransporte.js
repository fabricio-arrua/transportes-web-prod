import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
//Notificaciones
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//Formik & Yup
import { useFormik, Field, FormikProvider } from 'formik';
import { transporteUpdateValidations } from "../../../../validations/transporteUpdateValidations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

export default function UpdateTransporte() {
  const [iidTransporte, setId] = useState('');
  const [ffechaInicio, setFechaInicio] = useState(new Date());
  const [kkmRecorridos, setKms] = useState('');
  const [oorigen, setOrigen] = useState('');
  const [ddestino, setDestino] = useState('');
  const [mmatricula, setMatricula] = useState('');
  const [ccliente, setCliente] = useState('');
  const [iidChofer, setChofer] = useState('');
  const [optMatricula, setOptMatricula] = useState([]);
  const [optCliente, setOptCliente] = useState([]);
  const [optChofer, setOptChofer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setId(localStorage.getItem('Id'))
    setFechaInicio(new Date(localStorage.getItem('Inicio')));
    setKms(localStorage.getItem('Distancia'));
    setOrigen(localStorage.getItem('Origen'));
    setDestino(localStorage.getItem('Destino'));
    setMatricula(localStorage.getItem('Matricula'));
    setChofer(localStorage.getItem('Usuario'));
    setCliente(localStorage.getItem('Cliente'));

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
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idTransporte: iidTransporte,
      fechaInicio: ffechaInicio,
      kmRecorridos: kkmRecorridos,
      origen: oorigen,
      destino: ddestino,
      matricula: mmatricula,
      cliente: ccliente,
      idChofer: iidChofer
    },
    onSubmit: values => {
      var fechaI = format(values.fechaInicio, 'yyyy-MM-dd HH:mm:ss');

      axios.post(`http://107.22.75.115:4000/api/transportes/modificarTransporte`, {
        idTransporte: values.idTransporte,
        fechaInicio: fechaI,
        kmRecorridos: values.kmRecorridos,
        origen: values.origen,
        destino: values.destino,
        matricula: values.matricula,
        cliente: values.cliente,
        idChofer: values.idChofer
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Se modificó el transporte exitosamente') {
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
    validationSchema: transporteUpdateValidations
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

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="form-title">Modificar transporte</h2>
          <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='idTransporte'>Ticket Transporte</label>
                <input
                  type='text'
                  readOnly ="readOnly"
                  name='idTransporte'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idTransporte}>
                </input>
                {formik.touched.idTransporte && formik.errors.idTransporte ? <div className='error'>{formik.errors.idTransporte}</div> : null}
              </div>
            </div>
            <div className='col-6'>
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
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              <div className='form-control'>
                <label htmlFor='kmRecorridos'>Distancia</label>
                <input
                  type='number'
                  name='kmRecorridos'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.kmRecorridos}>
                </input>
                {formik.touched.kmRecorridos && formik.errors.kmRecorridos ? <div className='error'>{formik.errors.kmRecorridos}</div> : null}
              </div>
            </div>
            <div className='col-6'>
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
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
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
            </div>
            <div className='col-6'>
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
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
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
            </div>
            <div className='col-6'>
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
            </div>          
          </div>
    
          <button className='btnSubmit' type='submit'>Modificar</button>
        </form>
      </FormikProvider>
      <Link to='/abm/abmtransportes'>        
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}