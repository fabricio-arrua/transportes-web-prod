import React, { useState, useEffect } from 'react';
import { Table, Button,Pagination } from 'semantic-ui-react';
import axios from 'axios';
import '../../css/misBtns.css';
import ExcelExport from '../admin/actions/ExcelExport';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import * as FaIcons from 'react-icons/fa';
import Popup from 'reactjs-popup';

const cookies = new Cookies();

export default function HomeTecnico() {

  const [APIData, setAPIData] = useState([]);
  const [selectedMatricula, setSelectedMatricula] = useState(null);
  const [matriculaDetail, setMatriculaDetails] = useState([]);
  const f = new Intl.DateTimeFormat("es-UY", {dateStyle: 'short'});

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

  const handleOpenPopup = async (matricula) => {
    setSelectedMatricula(matricula);
    try {
      const response = await axios.get(`http://107.22.75.115:4000/api/camiones/listarHistorialMantenimientoCamion`, {
        params: { matricula: matricula },
        headers: {
          Authorization: cookies.get('token'),
        }
      });
      if (response.data.listado) {
        setMatriculaDetails(response.data.listado);
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
    setMatriculaDetails([]);
  };

  useEffect(() => {
    if(cookies.get('tipo') !== 'T'){
      window.location.href='/';
    }

    axios.get(`http://107.22.75.115:4000/api/camiones/listarCamionesEnReparacionAgrupado`, {
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
            <Table.HeaderCell>Fecha Ultimo Mantenimiento</Table.HeaderCell>
            <Table.HeaderCell>Técnico</Table.HeaderCell>
            <Table.HeaderCell>Costo</Table.HeaderCell>
            <Table.HeaderCell>Observaciones</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Ver Historico De Camión</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {currentData.map((data) => {
            return (
              <Table.Row key={data.id_mantenimiento}>
                  <Table.Cell>{data.matricula}</Table.Cell>
                  <Table.Cell>{f.format(Date.parse(data.fecha_mantenimiento))}</Table.Cell>
                  <Table.Cell>{data.usuarioT}</Table.Cell>
                  <Table.Cell>{data.costo}</Table.Cell>
                  <Table.Cell>{data.observaciones}</Table.Cell>
                  <Table.Cell>{data.estado_mantenimiento}</Table.Cell>
                  <Table.Cell>
                  <Popup
                    trigger={<Button><FaIcons.FaEye /></Button>}
                    modal
                    nested
                    onOpen={() => handleOpenPopup(data.matricula)}
                    onClose={handleClosePopup}
                  >
                    {close => (
                      <div className="modals">
                        <button className="close" onClick={close}>
                          &times;
                      </button>
                        <div className="header"> Historico del Camión-{selectedMatricula} </div>
                        <div className="content">
                          {' '}
                          <ul>
                            {matriculaDetail.map((expense) => (
                              <li key={expense.id_mantenimiento}>
                                <b>Tecnico:</b> {expense.usuarioT} <b>Costo:</b> $ {expense.costo} <b>Observaciones:</b> {expense.observaciones} <b>Fecha:</b> {f.format(Date.parse(expense.fecha_mantenimiento))}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </Popup>
                </Table.Cell>
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