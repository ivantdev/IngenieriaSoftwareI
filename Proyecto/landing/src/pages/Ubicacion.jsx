import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "@/styles/Ubicacion.css";

function Ubicacion() {
  const navigate = useNavigate();
  const position = [4.6097, -74.0817]; // Coordenadas de Bogotá

  return (
    <>
      <Header />
      <main className="ubicacion-container">
        <h1 className="ubicacion-title">Ubicación del Centro Médico</h1>
        <p>
          <strong>Dirección:</strong> Calle 123 #45-67, Bogotá
        </p>
        <p>
          <strong>Teléfono:</strong> +57 (1) 123-4567
        </p>

        {/* Mapa interactivo con Leaflet */}
        <MapContainer center={position} zoom={15} className="map-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              Centro Médico <br /> Calle 123 #45-67, Bogotá
            </Popup>
          </Marker>
        </MapContainer>

        <button
          className="ubicacion-button"
          onClick={() => navigate("/hospital-info")}
        >
          Volver a Información
        </button>
      </main>
    </>
  );
}

export default Ubicacion;
