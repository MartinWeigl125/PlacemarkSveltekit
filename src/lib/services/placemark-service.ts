import type { Category, Comment, Poi, PoiDTO, Session, User, UserPoi, WriteComment } from "$lib/types/placemark-types";
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

    async getPois(token: string): Promise<Poi[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.get(this.baseUrl + "/api/pois");
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async createPoi(token: string, poi: PoiDTO) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.post(this.baseUrl + `/api/categories/${poi.categoryid}/pois`, poi);
            return response.status == 201;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false;
        }
    },

    async updatePoi(token: string, poi: PoiDTO) {
        try {
            const poiid = poi._id;
            poi._id = undefined;
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.put(this.baseUrl + `/api/pois/${poiid}`, poi);
            return response.status == 204;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false;
        }
    },

    async deletePoi(token: string, poiid: string) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.delete(this.baseUrl + `/api/pois/${poiid}`);
            return response.status == 204;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false;
        }
    },

    async getCategories(token: string): Promise<Category[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.get(this.baseUrl + "/api/categories");
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async getPoisByCategoryId(token: string, categoryId: string): Promise<Poi[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.get(this.baseUrl + `/api/categories/${categoryId}/pois`);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async getPoiById(token: string, poiId: string): Promise<Poi> {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.get(this.baseUrl + `/api/pois/${poiId}`);
        return response.data;
    },

    async getCommentsByPoiId(token: string, poiId: string): Promise<Comment[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.get(this.baseUrl + `/api/pois/${poiId}/comments`);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async writeComment(token: string, comment: WriteComment) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.post(this.baseUrl + "/api/comments", comment);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false;
        }
    },

    async deleteImage(token: string, poiId: string, imgUrl: string) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.post(this.baseUrl + `/api/pois/${poiId}/images/delete`, { img: imgUrl });
            return response.status == 204;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false;
        }
    },

    async uploadImage(token: string, poiId: string, file: File | null) {
        try {
            const formData = new FormData();
            formData.append("file", file!);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.post(this.baseUrl + `/api/pois/${poiId}/images/upload`, formData, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data" 
                }
            });
            return response.data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return null;
        }
    },

    async getComments(token: string): Promise<Comment[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.get(this.baseUrl + `/api/comments`);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    },

    async getUsersWithPrivatePoiCount(token: string): Promise<UserPoi[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            const response = await axios.get(this.baseUrl + `/api/users/private`);
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return [];
        }
    }
}