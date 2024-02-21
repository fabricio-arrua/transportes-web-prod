import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';
import Cookies from 'universal-cookie';
import L from 'leaflet';
import '../../css/Mapa.css';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../../img/marker-icon.png';

const cookies = new Cookies();

const HomeAdmin = () => {
  const [markers, setMarkers] = useState([]);

  const myIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://107.22.75.115:4000/api/transportes/listadoTranporteTiempoReal', {
        method: 'GET',
        headers: {
          'Authorization': cookies.get('token'),
        },
      });
      const data = await response.json();

      if (data.message === 'No existen transportes en tiempo real'){
        setMarkers([]);
      }
      else{
        setMarkers(
          data.listado.map((item) => ({
            position: [item.latitud, item.longitud],
            data: {
              origen: item.origen,
              destino: item.destino,
              matricula: item.matricula,
              usuarioC: item.usuarioC,
            },
          }))
        );
      }
      
    } catch (error) {
      console.error('Error al obtener posiciones desde la API', error);
    }
  };

  useEffect(() => {
    if (cookies.get('tipo') !== 'A') {
      window.location.href = './';
    }

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='theme-doc-markdown markdown' style={{width:'70%'}}>
      <div className='playgroundContainer_BKND'>
        <div className="result">Resultado</div>
        <div className='fondoVistaMapa'>
          <MapContainer center={[-34.85, -56.19]} zoom={10} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={myIcon}
            >
              <Popup position={marker.position}>
                Origen: {marker.data.origen}<br/>
                Destino: {marker.data.destino}<br/>
                Matrícula: {marker.data.matricula}<br/>
                Usuario: {marker.data.usuarioC}<br/>
              </Popup>
              
            </Marker>
          ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;