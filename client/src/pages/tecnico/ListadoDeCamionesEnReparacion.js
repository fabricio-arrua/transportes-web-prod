import React, { useState, useEffect } from 'react';
import { Table, Header } from 'semantic-ui-react';
import axios from 'axios';
import '../../css/misBtns.css';
import ExcelExport from '../admin/actions/ExcelExport';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';

const cookies = new Cookies();

export default function ListadoDeCamionesEnReparacion() {

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    if(cookies.get('tipo') !== 'T'){
      window.location.href='/';
    }

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamionesEnReparacion`, {
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
  }, [])

  return (
    <div>
      <ExcelExport excelData={APIData} fileName={"Listado de camiones en reparación"} />


      <h1>Listado de Camiones en reparación</h1>
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

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Año</Table.HeaderCell>
            <Table.HeaderCell>Marca</Table.HeaderCell>
            <Table.HeaderCell>Kilómetros</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row key={data.matricula}>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{data.anio}</Table.Cell>
                  <Table.Cell>{data.marca}</Table.Cell>
                  <Table.Cell>{data.kilometros}</Table.Cell>
                  <Table.Cell>{data.id_estado}</Table.Cell>
                  <Table.Cell>{data.id_tipo}</Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}