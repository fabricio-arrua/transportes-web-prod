import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

export default function ABMCamiones() {

  const [APIData, setAPIData] = useState([]);
  //PAGINADO
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página

  // Calcula el índice del primer y último elemento a mostrar en la página actual
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra los datos para mostrar solo los elementos de la página actual
  const currentData = APIData.slice(startIndex, endIndex);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(APIData.length / itemsPerPage);

  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        if (response.data.listado){
          setAPIData(response.data.listado);
        } else {
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
  
  }, [])

  const setData = (data) => {
    let { matricula, anio, marca, kilometros, id_estado, id_tipo } = data;
    localStorage.setItem('Matricula', matricula);
    localStorage.setItem('Año', anio);
    localStorage.setItem('Marca', marca);
    localStorage.setItem('Kilometros', kilometros)
    localStorage.setItem('Estado', id_estado)
    localStorage.setItem('Tipo', id_tipo)
  }

  const onDelete = (data) => {

    let { matricula } = data;
    const mat = matricula;

    axios.post(`http://107.22.75.115:4000/api/camiones/eliminarCamion`, {
      matricula:mat
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    })
    .then((response) => {

      if(response.data.message === 'Baja realizada con éxito'){
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
      
        getData();
    })
  }

  const getData = () => {
    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamion`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
      .catch(error => {
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
  }

  return (
    <div style={{width:'70%'}}>
      
      <Link to='/abm/abmcamiones/createCamion'>
        <button className='Btn'>Crear</button>
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
    
      <h1>Listado de Camiones</h1>

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Matrícula</Table.HeaderCell>
            <Table.HeaderCell>Año</Table.HeaderCell>
            <Table.HeaderCell>Marca</Table.HeaderCell>
            <Table.HeaderCell>Kilometros</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentData.map((data) => {
            return (
              <Table.Row key={data.matricula}>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{data.anio}</Table.Cell>
                  <Table.Cell>{data.marca}</Table.Cell>
                  <Table.Cell>{data.kilometros}</Table.Cell>
                  <Table.Cell>{data.id_estado}</Table.Cell>
                  <Table.Cell>{data.id_tipo}</Table.Cell>
                  <Table.Cell> 
                    <Link to='/abm/abmcamiones/UpdateCamion'>
                      <Button onClick={() => setData(data)}><AiIcons.AiOutlineEdit /></Button>
                    </Link>
                  </Table.Cell>                 
                  <Table.Cell>
                    <Button onClick={() => onDelete(data)}><FaIcons.FaTrash /></Button>
                  </Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>

      {/* Componente de paginación */}
      <Pagination
        activePage={activePage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}