import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import '../../../css/misBtns.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

export default function ListadoSolicitudesMaterial() {

  const [APIData, setAPIData] = useState([]);

  let estados = [
    { label: "Pendiente", value: "Pendiente" },
    { label: "Realizada", value: "Realizada" },
    { label: "Rechazada", value: "Rechazada" }
  ]

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

    axios.get(`http://107.22.75.115:4000/api/solicitudMateriales/listadoSolicitudMaterialesMantenimineto`, {
        params: { idMantenimiento: localStorage.getItem('IdMant') },
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

  const cambiarEstado = (e, data) => {

    let { id_solicitud } = data;
    const idSolicitud = id_solicitud;

    axios.post(`http://107.22.75.115:4000/api/solicitudMateriales/cambiarEstado/`, {
      idSolicitud,
      estado:e.target.value
    },
    {
      headers: {
        Authorization: cookies.get('token'), 
      },
    }).then((response) => {
      if(response.data.message === 'Cambio de estado realizado con éxito'){
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
      } else {
        toast.error(response.data.message, {
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

      getData();
    })
  }

  const getData = () => {
    axios.get(`http://107.22.75.115:4000/api/solicitudMateriales/listadoSolicitudMaterialesMantenimineto`, {
        params: { idMantenimiento: localStorage.getItem('IdMant') },
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
  }

  return (
    <div style={{width:'70%'}}>

      <h1>Listado Solicitud de Materiales</h1>
      
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
            <Table.HeaderCell>Id Solicitud</Table.HeaderCell>
            <Table.HeaderCell>Id Mantenimiento</Table.HeaderCell>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentData.map((data) => {
            return (
              <Table.Row key={data.id_solicitud}>
                <Table.Cell>{data.id_solicitud}</Table.Cell>
                <Table.Cell>{data.id_mantenimiento}</Table.Cell>
                <Table.Cell>{data.producto_solicitado}</Table.Cell>
                <Table.Cell>{data.cantidad}</Table.Cell>
                <Table.Cell>
                  <div className="dropdown">
                    <select
                    value={data.estado}
                    onChange={(e) => {cambiarEstado(e, data);}}
                    >
                    <option value="">Seleccione un estado</option>
                    {estados.map((option) => (
                      <option key={option.value} value={option.value}>
                      {option.label}
                      </option>
                    ))}
                    </select>
                  </div>
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

      <Link to='/listadomantenimientos'>        
        <div className="back-button-container">
          <button className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </Link>
    </div>
  )
}