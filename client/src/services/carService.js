import { post, get } from "../util/api";
const url = 'http://localhost:3003/data'

async function sell(data) {
    return await post(`${url}/sell`, data)
}

async function getCars() {
    return await get(`${url}/catalog`)
}

async function searchCars(queryString) {
    return await get(`${url}/catalog?${queryString}`)
}

async function getCarsHome() {
    return await get(`${url}`)
}

export {
    sell, 
    getCars,
    searchCars,
    getCarsHome
}