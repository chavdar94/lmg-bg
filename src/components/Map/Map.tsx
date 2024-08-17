"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

const position: [number, number] = [42.68961794986406, 23.314344012735];

const icon = new Icon({
  iconUrl: "/location.png",
  iconSize: [30, 30],
});

export function Map() {
  return (
    <MapContainer className="w-full h-[500px] z-1" center={position} zoom={17}>
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      <Marker position={position} icon={icon}>
        <Popup className="p-0 m-0">
          <h2>LMG-BG Сервиз</h2>
          <p>София, бул. Патриарх Евтимий 98</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

("42.69136746093853, 23.314005677267804");
