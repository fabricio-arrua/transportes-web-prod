import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/misBtns.css'
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage, FormikProvider } from 'formik';
import * as Yup from 'yup';

const cookies = new Cookies();

const initialValues = {
  password: '',
  confirmPassword: '',
};


function CambiarContraseña() {

  const navigate = useNavigate();
  const [idTecnico, setTecnico] = useState([]);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Por favor ingresa tu contraseña')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Por favor confirma tu contraseña'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log(values);

    axios.post(`http://107.22.75.115:4000/api/empleados/ModificarContrasenia`, {
        usuario : idTecnico,
        contrasenia: values.password
      },
        {
          headers: {
            Authorization: cookies.get('token'),
          },
        }).then((response) => {
          if (response.data.message === 'Contraseña cambiada con éxito') {
            toast.success(response.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(() => {
              navigate('/homeadmin');
            }, 3000);
            
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
    
        setSubmitting(false);
  };

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    setTecnico(cookies.get('usuario'));

  }, [])

  return (
    <div className="App">
      <Link to='/homeadmin' className="Btn">
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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

      {formik => (
        <FormikProvider value={formik}>
          <Form>
          <h2 className="form-title">Cambio de Contraseña</h2>

            <div className='form-control'>
              <label htmlFor="password">Contraseña</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className='form-control'>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>

            <button className='btnSubmit' type="submit" disabled={formik.isSubmitting}>
              Cambiar Contraseña
            </button>
          </Form>
        </FormikProvider>
      )}
    </Formik>
    </div>
  )
}

export default CambiarContraseña