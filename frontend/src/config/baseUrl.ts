import axios from "axios"

export const baseUrl = 'http://localhost:8080/api/'


export const axiosBase = axios.create({
    baseURL:baseUrl
})
