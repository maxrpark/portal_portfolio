import * as THREE from "three";

const calcPosFromLatLongRad = function (
  lat: number,
  lng: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(Math.sin(phi) * Math.cos(theta));
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

interface MarkerInt {
  id: number;
  lat: number;
  lng: number;
  type: string;
  name: string;
  position: THREE.Vector3;
  destination: THREE.Vector3;
}

export const markers: MarkerInt[] = [
  {
    id: 0,
    lat: -32.89084,
    lng: -68.82717,
    type: "place",
    name: "mendoza",
    position: calcPosFromLatLongRad(-32.89084, -68.82717),
    destination: calcPosFromLatLongRad(13.25, -61.2),
  },
  {
    id: 1,
    lat: 13.25,
    lng: -61.2,
    type: "place",
    name: "saint vincent and the grenadines",
    position: calcPosFromLatLongRad(13.25, -61.2),
    destination: calcPosFromLatLongRad(-13.254308, 34.301525),
  },

  {
    id: 2,
    lat: -13.254308,
    lng: 34.301525,
    type: "place",
    name: "malawi",
    position: calcPosFromLatLongRad(-13.254308, 34.301525),
    destination: calcPosFromLatLongRad(-32.89084, -68.82717),
  },
  {
    id: 3,
    lat: -32.89084,
    lng: -68.82717,
    type: "place",
    name: "mendoza",
    position: calcPosFromLatLongRad(-32.89084, -68.82717),
    destination: calcPosFromLatLongRad(1.373333, 32.290275),
  },
  {
    id: 4,
    lat: 1.373333,
    lng: 32.290275,
    type: "place",
    name: "uganda",
    position: calcPosFromLatLongRad(1.373333, 32.290275),
    destination: calcPosFromLatLongRad(-32.89084, -68.82717),
  },
  {
    id: 5,
    lat: -32.89084,
    lng: -68.82717,
    type: "place",
    name: "mendoza",
    position: calcPosFromLatLongRad(-32.89084, -68.82717),
    destination: calcPosFromLatLongRad(37.5326, 127.024612),
  },
  {
    id: 6,
    lat: 37.5326,
    lng: 127.024612,
    type: "place",
    name: "south korea",
    position: calcPosFromLatLongRad(37.5326, 127.024612),
    destination: calcPosFromLatLongRad(-32.89084, -68.82717),
  },
];
