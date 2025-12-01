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
}

export interface Poi {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    img: string;
    _id?: string;
    categoryid: string;
    category: Category | string;
    user: User | string;
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

export interface DataSet {
  labels: string[] | number[];
  datasets: [{ values: number[] }];
}