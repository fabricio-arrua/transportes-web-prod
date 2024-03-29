import React, { useState, useEffect } from 'react';
import { Table,Pagination } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cookies = new Cookies();

export default function ListadoTransportesNoRealizados() {

  const [APIData, setAPIData] = useState([]);
  const [filter, setFilter] = useState({ startDate: '',endDate: '', clientDocument: '' });
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página

  const f = new Intl.DateTimeFormat("es-UY", {dateStyle: 'short', timeStyle: 'short'});

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

  // Filtra los datos según los valores ingresados en los campos de filtro
  const filteredData = APIData.filter((item) => {
    const startDateMatch = !filter.startDate || Date.parse(item.fecha_hora_inicio) >= filter.startDate;
    const endDateMatch = !filter.endDate || Date.parse(item.fecha_hora_inicio) <= filter.endDate;
    const clientDocumentMatch = !filter.clientDocument || item.documentoCliente.toLowerCase().includes(filter.clientDocument.toLowerCase());
    return startDateMatch && endDateMatch && clientDocumentMatch;
  });

  // Calcula el índice del primer y último elemento a mostrar en la página actual
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra los datos para mostrar solo los elementos de la página actual
  const currentData = filteredData.slice(startIndex, endIndex);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Maneja el cambio de página
  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  // Maneja el cambio en el campo de filtro de Fecha de Inicio
  const handleStartDateChange = (date) => {
    setFilter({ ...filter, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setFilter({ ...filter, endDate: date });
  };

  // Maneja el cambio en el campo de filtro de Documento de Cliente
  const handleClientDocumentChange = (event) => {
    setFilter({ ...filter, clientDocument: event.target.value });
  };


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
      <div className='row'>
        <div className='col-3'>
            <label htmlFor='desde'>Desde</label>
            <DatePicker
              selected={filter.startDate}
              name='desde'
              onChange={handleStartDateChange}
              placeholderText="Seleccionar Inicio"
            />
        </div>
        <div className='col-3'>
            <label htmlFor='hasta'>Hasta</label>
            <DatePicker
              selected={filter.endDate}
              name='hasta'
              onChange={handleEndDateChange}
              placeholderText="Seleccionar Fin"
            />
        </div>
        <div className='col-3'>
          <label htmlFor='cliente'>Cliente</label>
          <input
          type="text"
          name="cliente"
          placeholder="Seleccionar Cliente"
          value={filter.clientDocument}
          onChange={handleClientDocumentChange}
          />
        </div>
      </div>
      
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Origen</Table.HeaderCell>
            <Table.HeaderCell>Destino</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Fecha inicio</Table.HeaderCell>
            <Table.HeaderCell>Documento cliente</Table.HeaderCell>
            <Table.HeaderCell>Ticket Transporte</Table.HeaderCell>
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