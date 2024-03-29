import React, { useState, useEffect } from 'react';
import { Table,Pagination } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';

const cookies = new Cookies();

export default function ListadoTransportesNoRealizados() {

  const [APIData, setAPIData] = useState([]);
  const f = new Intl.DateTimeFormat("en-BG", {dateStyle: 'short', timeStyle: 'short'});

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

    axios.get(`http://107.22.75.115:4000/api/transportes/listadoTransportesNoRealizados`, {
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
    <div style={{width:'70%'}}>
      <ExcelExport excelData={APIData} fileName={"Transportes no realizados"} />
     
      <h1>Listado de Transportes no realizados</h1>

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
            <Table.HeaderCell>Origen</Table.HeaderCell>
            <Table.HeaderCell>Destino</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Fecha inicio</Table.HeaderCell>
            <Table.HeaderCell>Documento cliente</Table.HeaderCell>
            <Table.HeaderCell>ID Transporte</Table.HeaderCell>
            <Table.HeaderCell>Kms Distancia</Table.HeaderCell>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Chofer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentData.map((data) => {
            return (
              <Table.Row key={data.id_transporte}>
                  <Table.Cell>{data.origen}</Table.Cell>
                  <Table.Cell>{data.destino}</Table.Cell>
                  <Table.Cell>{data.estado_transporte}</Table.Cell>
                  <Table.Cell>{f.format(Date.parse(data.fecha_hora_inicio))}</Table.Cell>
                  <Table.Cell>{data.documentoCliente}</Table.Cell>
                  <Table.Cell>{data.id_transporte}</Table.Cell>
                  <Table.Cell>{data.kms_distancia}</Table.Cell>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{data.usuarioC}</Table.Cell>
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