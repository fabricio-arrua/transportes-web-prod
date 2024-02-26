import React, { useState, useEffect } from 'react';
import { Table, Header } from 'semantic-ui-react';
import axios from 'axios';
import '../../css/misBtns.css';
import ExcelExport from '../admin/actions/ExcelExport';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function HomeTecnico() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);
  const f = new Intl.DateTimeFormat("es-UY", {dateStyle: 'short'});

  useEffect(() => {
    if(cookies.get('tipo') !== 'T'){
      window.location.href='/';
    }

    console.log( cookies.get('token'));

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamionesEnReparacion`, {
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
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div className="components">
      
      <h1>LISTADO HISTORICO DE MANTENIMIENTO</h1>
      <ExcelExport excelData={APIData} fileName={"Listado de camiones en reparación"} />
      
      <Header as='h1' color='yellow'>
          {APIError}
      </Header>

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
              <Table.Row>
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