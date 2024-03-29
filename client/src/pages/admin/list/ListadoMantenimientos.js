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

const cookies = new Cookies();

export default function ListadoMantenimientos() {

  const [APIData, setAPIData] = useState([]);
  const f = new Intl.DateTimeFormat("en-BG", { dateStyle: 'short', timeStyle: 'short' });
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