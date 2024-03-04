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
import { camionValidations } from "../../../../validations/camionValidations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

export default function UpdateCamion() {
  const [mmatricula, setMatricula] = useState('');
  const [aanio, setAnio] = useState('');
  const [mmarca, setMarca] = useState('');
  const [kkilometros, setKilometros] = useState('');
  const [iidEstado, setEstado] = useState('');
  const [iidTipoCamion, setTipo] = useState('');
  const [optEstado, setOptEstado] = useState([]);
  const [optTipo, setOptTipo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setMatricula(localStorage.getItem('Matricula'))
    setAnio(localStorage.getItem('Año'));
    setMarca(localStorage.getItem('Marca'));
    setKilometros(localStorage.getItem('Kilometros'));
    setEstado(localStorage.getItem('Estado'));
    setTipo(localStorage.getItem('Tipo'));

    axios.get(`http://107.22.75.115:4000/api/estadoCamiones/listadoEstadoCamion`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
    .then((response) => {
      if (response.data.listado){
        setOptEstado(response.data.listado);
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

    axios.get(`http://107.22.75.115:4000/api/tipoCamiones/listadoTipoCamion`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
    .then((response) => {
      if (response.data.listado){
        setOptTipo(response.data.listado);
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
    enableReinitialize:true,
    initialValues: {
      matricula: mmatricula,
      anio: aanio,
      marca: mmarca,
      kilometros: kkilometros,
      idEstado: iidEstado,
      idTipoCamion: iidTipoCamion
      },
    onSubmit: values => {
      axios.post(`http://107.22.75.115:4000/api/camiones/modificarCamion`, {
        matricula: values.matricula,
        anio: values.anio,
        marca: values.marca,
        kilometros: values.kilometros,
        idEstado: values.idEstado,
        idTipoCamion: values.idTipoCamion
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Modificación realizada con éxito') {
            navigate('/abm/abmcamiones');
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
    validationSchema: camionValidations
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
        <h2 className="form-title">Modificar camión</h2>
        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='matricula'>Matrícula</label>
              <input
                type='text'
                readOnly ="readOnly"
                name='matricula'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.matricula}>
              </input>
              {formik.touched.matricula && formik.errors.matricula ? <div className='error'>{formik.errors.matricula}</div> : null}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='anio'>Año</label>
              <input 
                type='text' 
                name='anio' 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.anio}>
              </input>
              { formik.touched.anio && formik.errors.anio ? <div className='error'>{formik.errors.anio}</div> : null}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='marca'>Marca</label>
              <input
                type='text'
                name='marca'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                value={formik.values.marca}>
              </input>
              { formik.touched.marca && formik.errors.marca ? <div className='error'>{formik.errors.marca}</div> : null}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='kilometros'>Kilometros</label>
              <input
                type='text'
                name='kilometros'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.kilometros}>
              </input>
              { formik.touched.kilometros && formik.errors.kilometros ? <div className='error'>{formik.errors.kilometros}</div> : null}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='idEstado'>Estado</label>
              <div className="dropdown">
                <select
                name='idEstado'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idEstado}
                >
                <option value="">Seleccione un estado</option>
                {optEstado.map((option) => (
                  <option key={option.id_estado} value={option.id_estado}>
                  {option.descripcion}
                  </option>
                ))}
                </select>
              </div>
              { formik.touched.idEstado && formik.errors.idEstado ? <div className='error'>{formik.errors.idEstado}</div> : null}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-control'>
              <label htmlFor='idTipoCamion'>Tipo</label>
              <div className="dropdown">
                <select
                name='idTipoCamion'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idTipoCamion}
                >
                <option value="">Seleccione un tipo</option>
                {optTipo.map((option) => (
                  <option key={option.id_tipo} value={option.id_tipo}>
                  {option.descripcion}
                  </option>
                ))}
                </select>
              </div>
              { formik.touched.idTipoCamion && formik.errors.idTipoCamion ? <div className='error'>{formik.errors.idTipoCamion}</div> : null}
            </div>
          </div>
        </div>
        <button className='btnSubmit' type='submit'>Modificar</button>
      </form>
      <Link to='/abm/abmcamiones'>
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}