import React, { useState, useEffect } from 'react';
import { Table, Header,Pagination  } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ListadoDeGastos() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);
  
  //PAGINADO
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: "short"});

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://107.22.75.115:4000/api/gastos/listarGastos`, {
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
        console.log(error.response);
      });
  }, [])

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

  return (
    <div>
      <ExcelExport excelData={APIData} fileName={"Listado de gastos"} />

      <Header as='h1' color='yellow'>
          {APIError}
      </Header>

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell>ID Gasto</Table.HeaderCell>
            <Table.HeaderCell>ID Transporte</Table.HeaderCell>
            <Table.HeaderCell>Monto</Table.HeaderCell>
            <Table.HeaderCell>Observaciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {currentData.map((data) => {
            return (
              <Table.Row key={data.id_gasto}>
                <Table.Cell>{f.format(Date.parse(data.fecha_gasto))}</Table.Cell>
                <Table.Cell>{data.id_gasto}</Table.Cell>
                <Table.Cell>{data.id_transporte}</Table.Cell>
                <Table.Cell>$ {data.monto_gasto}</Table.Cell>
                <Table.Cell>{data.observaciones}</Table.Cell>
              </Table.Row>
            )
          })}
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
