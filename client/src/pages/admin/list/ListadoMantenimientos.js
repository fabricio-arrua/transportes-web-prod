import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/misBtns.css';
import ExcelExport from '../actions/ExcelExport';
import Cookies from 'universal-cookie';
import * as FaIcons from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cookies = new Cookies();

export default function ListadoMantenimientos() {

  const [APIData, setAPIData] = useState([]);
  const [filter, setFilter] = useState({ startDate: '',endDate: ''});
  const f = new Intl.DateTimeFormat("es-UY", { dateStyle: 'short'});
  //PAGINADO
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página

  // Calcula el índice del primer y último elemento a mostrar en la página actual
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Calcula el número total de páginas
  const totalPages = Math.ceil(APIData.length / itemsPerPage);

  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = '/';
    }

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamionesEnReparacion`, {
      headers: {
        Authorization: cookies.get('token'),
      }
    })
      .then((response) => {
        if (response.data.listado) {
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
      .catch(function (error) {
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
    const startDateMatch = !filter.startDate || Date.parse(item.fecha_mantenimiento) >= filter.startDate;
    const endDateMatch = !filter.endDate || Date.parse(item.fecha_mantenimiento) <= filter.endDate;
    return startDateMatch && endDateMatch ;
  });

   // Filtra los datos para mostrar solo los elementos de la página actual
   const currentData = filteredData.slice(startIndex, endIndex);
   
  // Maneja el cambio en el campo de filtro de Fecha de Inicio
  const handleStartDateChange = (date) => {
    setFilter({ ...filter, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setFilter({ ...filter, endDate: date });
  };

  const setData = (data) => {
    let { id_mantenimiento } = data;
    localStorage.setItem('IdMant', id_mantenimiento);
  }

  return (
    <div style={{width:'70%'}}>
      <ExcelExport excelData={APIData} fileName={"Mantenimientos"} />

      <h1>Listado de mantenimientos</h1>

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
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell>Observaciones</Table.HeaderCell>
            <Table.HeaderCell>Costo</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Matrícula</Table.HeaderCell>
            <Table.HeaderCell>Solicitudes de materiales</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentData.map((data) => {
            return (
              <Table.Row key={data.id_mantenimiento}>
                <Table.Cell>{data.id_mantenimiento}</Table.Cell>
                <Table.Cell>{f.format(Date.parse(data.fecha_mantenimiento))}</Table.Cell>
                <Table.Cell>{data.observaciones}</Table.Cell>
                <Table.Cell>{data.costo}</Table.Cell>
                <Table.Cell>{data.estado_mantenimiento}</Table.Cell>
                <Table.Cell>{data.matricula}</Table.Cell>
                <Table.Cell>
                  <Link to='/listadosolicitudesmaterial'>
                    <Button onClick={() => setData(data)}><FaIcons.FaEye /></Button>
                  </Link>
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