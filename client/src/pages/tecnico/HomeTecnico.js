import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import '../../css/misBtns.css';
import ExcelExport from '../admin/actions/ExcelExport';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';

const cookies = new Cookies();

export default function HomeTecnico() {

  const [APIData, setAPIData] = useState([]);
  const f = new Intl.DateTimeFormat("es-UY", {dateStyle: 'short'});

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
    <div className="components">
      
      <ExcelExport excelData={APIData} fileName={"Listado de camiones en reparación"} />
      
      <h1 style={{color:'#15171c'}}>Listado Historico De Mantenimiento</h1>

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
            <Table.HeaderCell>Fecha Mantenimiento</Table.HeaderCell>
            <Table.HeaderCell>Técnico</Table.HeaderCell>
            <Table.HeaderCell>Costo</Table.HeaderCell>
            <Table.HeaderCell>Observaciones</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(APIData).map((data) => {
            return (
              <Table.Row key={data.id_mantenimiento}>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{f.format(Date.parse(data.fecha_mantenimiento))}</Table.Cell>
                  <Table.Cell>{data.usuarioT}</Table.Cell>
                  <Table.Cell>{data.costo}</Table.Cell>
                  <Table.Cell>{data.observaciones}</Table.Cell>
                  <Table.Cell>{data.estado_mantenimiento}</Table.Cell>
                </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}