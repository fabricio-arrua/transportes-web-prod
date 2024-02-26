import React, { useState, useEffect } from 'react';
import { Table, Button, Header,Pagination  } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';
import * as FaIcons from 'react-icons/fa';
import Popup from '../../../components/PopUp';
const cookies = new Cookies();

export default function ListadoDeGastos() {

  const [APIData, setAPIData] = useState([]);
  const [APIError, setAPIError] = useState([]);
  const [selectedTransportId, setSelectedTransportId] = useState(null);

  //PAGINADO
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: "short"});

  useEffect(() => {
    if(cookies.get('tipo') !== 'A'){
      window.location.href='/';
    }

    axios.get(`http://107.22.75.115:4000/api/transportes/listadoTransporteFinalizado`, {
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

  const handleDetailClick = (transportId) => {
    // Aquí podrías abrir el pop-up o realizar alguna acción para mostrar más detalles
    // También puedes realizar una consulta a la base de datos aquí utilizando el transportId
    // y manejar la lógica para mostrar los detalles en el pop-up
    setSelectedTransportId(transportId);
  };

  const handleClosePopup = () => {
    setSelectedTransportId(null);
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
            <Table.HeaderCell>Id Transporte</Table.HeaderCell>
            <Table.HeaderCell>Fecha Inicio</Table.HeaderCell>
            <Table.HeaderCell>Fecha Fin</Table.HeaderCell>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Chofer</Table.HeaderCell>
            <Table.HeaderCell>Cliente</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Gasto Total</Table.HeaderCell>
            <Table.HeaderCell>Ver Detalle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {currentData.map((data) => {
            return (
              <Table.Row key={data.id_transporte}>
                <Table.Cell>{data.id_transporte}</Table.Cell>
                <Table.Cell>{f.format(Date.parse(data.fecha_hora_inicio))}</Table.Cell>
                <Table.Cell>{f.format(Date.parse(data.fecha_hora_fin))}</Table.Cell>
                <Table.Cell>{data.matricula}</Table.Cell>
                <Table.Cell>{data.usuarioC}</Table.Cell>
                <Table.Cell>{data.nombre_completo}</Table.Cell>
                <Table.Cell>{data.telefono}</Table.Cell>
                <Table.Cell>$ {data.total_gasto}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleDetailClick(data.id_transporte)}><FaIcons.FaEye /></Button>
                </Table.Cell>

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

    {selectedTransportId && <Popup transportId={selectedTransportId} onClose={handleClosePopup} />}
    </div>
  )
}
