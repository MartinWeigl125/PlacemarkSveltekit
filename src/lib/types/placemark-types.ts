export interface Session {
    name: string;
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
    category: Category | string;
    user: User | string;
}