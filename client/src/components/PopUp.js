import React, { useState } from 'react';
import '../css/Popup.css'; // Importa el archivo CSS para estilos del pop-up
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FaImages } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';

const cookies = new Cookies();

const Popup = ({ transportId, onClose }) => {
  // Aquí puedes realizar una consulta a la base de datos usando transportId
  // para obtener los detalles del transporte
  const [transportDetails, setTransportDetails] = useState([]);
  const f = new Intl.DateTimeFormat("es-UY", {dateStyle: 'short'});

  const loadData = async () => {
    axios.get(`http://107.22.75.115:4000/api/gastos/listarGastosPorTransporte`, {
      params: { idTransporte: transportId },
      headers: {
        Authorization: cookies.get('token'), 
      }})
      .then((response) => {
        if (response.data.listado){
          setTransportDetails (response.data.listado);
        } 
      })
      .catch((error) => {
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

  if (transportDetails.length === 0) {
    loadData();
  }

  return (
    <div className="popup">
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
      <div className="popup-header">
        <span className="close-button" onClick={onClose}>x</span>
      </div>
      <div className="popup-content">
      <h2>Gastos del transporte {transportId}</h2>
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
  );
};

export default Popup;