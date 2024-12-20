import { useRef, useEffect } from 'react';
import { Icon, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constant';
import useMap from '../hooks/use-map';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type LocationItemType = {
  latitude: number;
  longitude: number;
  zoom: number;
}
type MapDataType = {
  id: string;
  location: LocationItemType;
}

type MapProps = {
  mapData: MapDataType[];
  cityLocation: LocationItemType;
  activeCardId: string | null;
}

function Map({mapData, cityLocation, activeCardId}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (!map){
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    mapData.forEach((item) => {
      const { latitude, longitude } = item.location;
      L.marker([latitude, longitude], {icon: item.id === activeCardId ? currentCustomIcon : defaultCustomIcon})
        .addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [mapData, activeCardId, map]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
