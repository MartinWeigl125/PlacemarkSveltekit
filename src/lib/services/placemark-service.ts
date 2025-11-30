import type { Category, Comment, Poi, Session, User, WriteComment } from "$lib/types/placemark-types";
import axios from "axios";

export const placemarkService = {
    baseUrl: "http://localhost:3000",

    async signup(user: User): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users`, user);
        return response.status >= 200 && response.status < 300; 
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async login(email: string, password: string): Promise<Session | null> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            if (response.data.success) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
                const session: Session = {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    token: response.data.token,
                    _id: response.data._id
                };
                return session;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getPois(session: Session): Promise<Poi[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
            const response = await axios.get(this.baseUrl + "/api/pois");
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async getCategories(session: Session): Promise<Category[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
            const response = await axios.get(this.baseUrl + "/api/categories");
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async getPoisByCategoryId(session: Session, categoryId: string): Promise<Poi[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
            const response = await axios.get(this.baseUrl + `/api/categories/${categoryId}/pois`);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async getPoiById(session: Session, poiId: string): Promise<Poi> {
        axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
        const response = await axios.get(this.baseUrl + `/api/pois/${poiId}`);
        return response.data;
    },

    async getCommentsByPoiId(session: Session, poiId: string): Promise<Comment[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
            const response = await axios.get(this.baseUrl + `/api/pois/${poiId}/comments`);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async writeComment(session: Session, comment: WriteComment) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
            const response = await axios.post(this.baseUrl + "/api/comments", comment);
            return response.status == 201;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false;
        }
    }
}