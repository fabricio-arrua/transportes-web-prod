import React, { useState, useEffect } from 'react';
import { Table, Button,Pagination  } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';
import * as FaIcons from 'react-icons/fa';
import Popup from 'reactjs-popup';
import { toast, ToastContainer } from 'react-toastify';
import 'reactjs-popup/dist/index.css';
import '../../../css/Popup.css'; // Importa el archivo CSS para estilos del pop-up
import { FaImages } from "react-icons/fa6";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cookies = new Cookies();

export default function ListadoDeGastos() {

  const [APIData, setAPIData] = useState([]);
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [transportDetails, setTransportDetails] = useState([]);
  const [filter, setFilter] = useState({ startDate: '',endDate: ''});
  const [sortBy, setSortBy] = useState('total_gasto');
  const [sortDirection, setSortDirection] = useState('desc');
  //PAGINADO
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  
  const f = new Intl.DateTimeFormat("es-UY", {dateStyle: 'short', timeStyle: 'short'});

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



  // Calcula el índice del primer y último elemento a mostrar en la página actual
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra los datos según los valores ingresados en los campos de filtro
  const filteredData = APIData.filter((item) => {
    const startDateMatch = !filter.startDate || Date.parse(item.fecha_hora_inicio) >= filter.startDate;
    const endDateMatch = !filter.endDate || Date.parse(item.fecha_hora_fin) <= filter.endDate;
    return startDateMatch && endDateMatch ;
  });

  // Filtra los datos para mostrar solo los elementos de la página actual
  const currentData = filteredData.slice(startIndex, endIndex);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(APIData.length / itemsPerPage);

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

  const handleOpenPopup = async (transportId) => {
    setSelectedTransportId(transportId);
    try {
      const response = await axios.get(`http://107.22.75.115:4000/api/gastos/listarGastosPorTransporte`, {
        params: { idTransporte: transportId },
        headers: {
          Authorization: cookies.get('token'),
        }
      });
      if (response.data.listado) {
        setTransportDetails(response.data.listado);
      }
    } catch (error) {
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
    }
  };

  const handleClosePopup = () => {
    // Aquí actualizas el valor de la variable a vacío cuando se cierra el Pop Up
    setTransportDetails([]);
  };

  // Ordena los datos según la columna especificada y la dirección de ordenamiento
  const sortedData = [...currentData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      // Cambia la dirección de ordenamiento si la columna ya está ordenada
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es una nueva columna, establece la columna de ordenamiento y la dirección ascendente
      setSortBy(columnName);
      setSortDirection('asc');
    }
  };

  return (
    <div style={{width:'70%'}}>
      <ExcelExport excelData={APIData} fileName={"Listado de gastos"} />

      <h1>Listado de Gastos</h1>

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
      </div>

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ticket Transporte</Table.HeaderCell>
            <Table.HeaderCell>Fecha Inicio</Table.HeaderCell>
            <Table.HeaderCell>Fecha Fin</Table.HeaderCell>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Chofer</Table.HeaderCell>
            <Table.HeaderCell>Cliente</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => handleSort('total_gasto')} // Agrega la función de ordenamiento al encabezado de la columna "Gasto Total"
              style={{ cursor: 'pointer' }} // Cambia el cursor para indicar que es clickable
            >
              Gasto Total
              {sortBy === 'total_gasto' && (sortDirection === 'asc' ? ' ↑' : ' ↓')} {/* Agrega indicadores de dirección de ordenamiento */}
            </Table.HeaderCell>
            <Table.HeaderCell>Ver Detalle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {sortedData.map((data) => {
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
                  <Popup
                    trigger={<Button><FaIcons.FaEye /></Button>}
                    modal
                    nested
                    onOpen={() => handleOpenPopup(data.id_transporte)}
                    onClose={handleClosePopup}
                  >
                    {close => (
                      <div className="modals">
                        <button className="close" onClick={close}>
                          &times;
                      </button>
                        <div className="header"> Gastos del transporte {selectedTransportId} </div>
                        <div className="content">
                          {' '}
                          <ul>
                            {transportDetails.map((expense) => (
                              <li key={expense.id_gasto}>
                                <b>Monto:</b> $ {expense.monto_gasto} <b>Observaciones:</b> {expense.observaciones} <b>Fecha:</b> {f.format(Date.parse(expense.fecha_gasto))}
                                {expense.url_imagen && ( // Verifica si hay una URL de imagen
                                  <button className='btn' onClick={() => window.open(expense.url_imagen, '_blank')} title="Ver imagen" ><FaImages /></button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </Popup>
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

  
    </div>
  )
}
