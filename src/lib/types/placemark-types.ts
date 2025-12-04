import type { LatLng } from "leaflet";

export interface Session {
  firstName: string;
  lastName: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface Category {
  name: string;
  img: string;
  _id?: string;
  pois: Poi[];
  markerLayer: MarkerLayer;
}

export interface Poi {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  img: string[];
  _id?: string;
  categoryid: string;
  category: Category | string;
  user: User | string;
  userid?: string;
  markerSpec: MarkerSpec;
}

export interface Comment {
  comment: string;
  rating: number;
  userid: {
    firstName: string;
    lastName: string;
  };
  poiid: string;
  _id?: string;
}

export interface WriteComment {
  comment: string;
  rating: number;
  userid: string;
  poiid: string;
  _id?: string;
}

export interface UserPoi {
  firstName: string;
  lastName: string;
  email: string;
  poiCount: number;
  _id?: string;
}

export interface DataSet {
  labels: string[] | number[];
  datasets: [{ values: number[] }];
}

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ScatterDataSet {
  datasets: [{ values: ScatterPoint[] }];
}

export interface MarkerSpec {
  id: string;
  title: string;
  location: LatLng;
}

export interface MarkerLayer {
  title: string;
  markerSpecs: MarkerSpec[];
}
