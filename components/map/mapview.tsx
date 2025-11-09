/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWFzeW9yZGVybXoiLCJhIjoiY2x2a21iZ3J5MG0zbTJrcHBmbDJreXczcCJ9.eRBdwwQ65-4dXJoC4CbG8A";

interface MapViewProps {
  latitude: number;
  longitude: number;
  zoom?: number; // Zoom opcional (padrão: 12)
}
export const maputoBounds: [number, number, number, number] = [
  32.0,
  -26.5, // Sudoeste (SW)
  33.0,
  -25.5, // Nordeste (NE)
];

// export const mozambiqueBounds = [
//   [30.0, -27.0], // Sudoeste (SW)
//   [41.0, -10.0], // Nordeste (NE)
// ];

export function MapView({ latitude, longitude, zoom = 12 }: MapViewProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // Função para inicializar o mapa
  const initializeMap = () => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [longitude, latitude], // Centraliza o mapa na localização fornecida
        zoom: zoom, // Usa o zoom fornecido ou o padrão (12)
        maxBounds: maputoBounds,
      });

      mapRef.current.on("load", () => {
        mapRef.current?.addControl(
          new mapboxgl.NavigationControl(),
          "top-right"
        );
      });

      return mapRef.current;
    }
  };

  // Função para adicionar um marcador no mapa
  const addMarker = (map: mapboxgl.Map, lngLat: mapboxgl.LngLat) => {
    if (markerRef.current) {
      markerRef.current.remove(); // Remove o marcador existente, se houver
    }

    markerRef.current = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
  };

  useEffect(() => {
    const map = initializeMap();

    if (map) {
      // Adiciona um marcador na localização fornecida
      addMarker(map, new mapboxgl.LngLat(longitude, latitude));
    }

    return () => {
      mapRef.current?.remove(); // Limpa o mapa quando o componente é desmontado
    };
  }, [latitude, longitude]);

  return (
    <div className="w-full h-full" id="map-container" ref={mapContainerRef} />
  );
}
