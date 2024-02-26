import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import '../css/Popup.css'; // Importa el archivo CSS para estilos del pop-up
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FaImages } from "react-icons/fa6";

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
        console.log(error.response);
      });
  }

  if (transportDetails.length === 0) {
    loadData();
  }

  return (
    <div className="popup">
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