import axios from "axios";

const instanceAxios = axios.create({
    baseURL: "https://fakestoreapi.com/"
})



export const api = {
    get(endpoint) {
        return instanceAxios.get(endpoint)
    }
};