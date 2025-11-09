import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { maputoBounds } from "./mapview";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWFzeW9yZGVybXoiLCJhIjoiY2x2a21iZ3J5MG0zbTJrcHBmbDJreXczcCJ9.eRBdwwQ65-4dXJoC4CbG8A";

export type Location = {
  latitude: number;
  longitude: number;
};

export type locatioPickerProps = {
  location?: Location | null;
  setLocation: (location: Location) => void;
  description?: string | null;
  setDescription: (description: string) => void;
};
export function LocationPicker({
  setLocation,
  setDescription,
}: locatioPickerProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Função para obter a localização atual do usuário
  const getUserLocation = async () => {
    console.log("Getting user location...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLocation({ latitude, longitude }); // Define a localização selecionada como a localização do usuário por padrão
          fetchLocationDescription(longitude, latitude); // Busca a descrição da localização do usuário
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Função para buscar a descrição da localização usando a API de Geocoding do Mapbox
  const fetchLocationDescription = async (
    longitude: number,
    latitude: number
  ) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        // A descrição da localização está no primeiro resultado (data.features[0].place_name)
        setDescription(data.features[0].place_name);
      } else {
        setDescription("Localização desconhecida");
      }
    } catch (error) {
      console.error("Error fetching location description:", error);
      setDescription("Erro ao buscar a descrição da localização");
    }
  };

  // Função para inicializar o mapa
  const initializeMap = () => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        maxBounds: maputoBounds,
        zoom: 20,
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

  // Função para lidar com o clique no mapa
  const handleMapClick = (map: mapboxgl.Map) => {
    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setLocation({ latitude: lat, longitude: lng }); // Atualiza a localização selecionada
      addMarker(map, e.lngLat); // Adiciona um marcador no local clicado
      fetchLocationDescription(lng, lat); // Busca a descrição da localização clicada
    });
  };

  useEffect(() => {
    const map = initializeMap();

    if (!userLocation) {
      getUserLocation(); // Obtém a localização do usuário se ainda não tiver sido obtida
    } else if (map) {
      setLocation(userLocation);
      map.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 12,
      });

      // Adiciona um marcador na localização do usuário por padrão
      addMarker(
        map,
        new mapboxgl.LngLat(userLocation.longitude, userLocation.latitude)
      );

      // Adiciona o evento de clique no mapa
      handleMapClick(map);
    }

    return () => {
      mapRef.current?.remove(); // Limpa o mapa quando o componente é desmontado
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  return (
    <div className="w-full h-full rounded-md">
      <div className="w-full h-full rounded-md" id="map-container" ref={mapContainerRef} />
    </div>
  );
}
