import React, { useState, useEffect } from 'react';
import { Table, Button, Header } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/misBtns.css';
import Cookies from 'universal-cookie';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

export default function ABMMantenimiento() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: 'short', timeStyle: 'short'});
  
  useEffect(() => {
    if(cookies.get('tipo') !== 'T'){
      window.location.href='/';
    }

    axios.get(`http://107.22.75.115:4000/api/mantenimientos/listarMantenimiento`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        if (response.data.listado){
          setAPIData(response.data.listado);
        } else {
          setAPIError(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [])

  const setData = (data) => {
    let { id_mantenimiento, fecha_mantenimiento, observaciones, 
      estado_mantenimiento, costo, matricula } = data;
    localStorage.setItem('IdMant', id_mantenimiento);
    localStorage.setItem('FechaMant', fecha_mantenimiento);
    localStorage.setItem('ObsMant', observaciones);
    localStorage.setItem('EstadoMant', estado_mantenimiento = "Activo" ? 1 : 0);
    localStorage.setItem('CostoMant', costo);
    localStorage.setItem('MatriculaMant', matricula);
  }

  const onDelete = (data) => {

    let { id_mantenimiento } = data;
    const mant = id_mantenimiento;

    axios.post(`http://107.22.75.115:4000/api/mantenimientos/eliminarMantenimiento`, {
      idMantenimiento:mant
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }).then((response) => {
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
    axios.get(`http://107.22.75.115:4000/api/mantenimientos/listarMantenimiento`, {
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((getData) => {
        setAPIData(getData.data.listado);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <Link to='/registrarmantenimiento'>
        <button className='Btn'>Crear</button>
      </Link>

      <h1>Administración de mantenimientos Pendientes</h1>

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
      
      <Header as='h1' color='yellow'>
          {APIError}
      </Header>

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell>Observaciones</Table.HeaderCell>
            <Table.HeaderCell>Costo</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Matrícula</Table.HeaderCell>
            <Table.HeaderCell>Modificar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row>
                  <Table.Cell>{data.id_mantenimiento}</Table.Cell>
                  <Table.Cell>{f.format(Date.parse(data.fecha_mantenimiento))}</Table.Cell>
                  <Table.Cell>{data.observaciones}</Table.Cell>
                  <Table.Cell>{data.costo}</Table.Cell>
                  <Table.Cell>{data.estado_mantenimiento = 1 ? "Activo" : "Finalizado"}</Table.Cell> 
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Link to='/updatemantenimiento'>
                    <Table.Cell> 
                      <Button onClick={() => setData(data)}><AiIcons.AiOutlineEdit /></Button>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <Button onClick={() => onDelete(data)}><FaIcons.FaTrash /></Button>
                  </Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}