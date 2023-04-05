import { post, get, del, put } from "../util/api";
const url = 'http://localhost:3003/data';

async function sell(data) {
    await post(`${url}/sell`, data)
}

async function edit(id, data) {
    await put(`${url}/edit/${id}`, data)
}

async function getCars() {
    return await get(`${url}/catalog`);
}

async function getCar(id) {
    return await get(`${url}/details/${id}`)
}

async function deleteCar(id) {
    return await del(`${url}/details/${id}`)
}

async function getUserCars() {
    return await get(`${url}/myprofile/cars`);
}

async function searchCars(queryString) {
    return await get(`${url}/catalog?${queryString}`);
}

async function getCarsHome() {
    return await get(`${url}`);
}

async function getRentCars() {
    return await get(`${url}/rentcar`);
}

async function getUserRentCars() {
    return await get(`${url}/myprofile/rentcars`);
}

async function searchRentCars(queryString) {
    return await get(`${url}/rentcar?${queryString}`);
}

async function rentCar(carId) {
    return await get(`${url}/rentcar/${carId}`);
}

export {
    sell,
    edit,
    getCars,
    getCar,
    deleteCar,
    getUserCars,
    searchCars,
    getCarsHome,
    getRentCars,
    getUserRentCars,
    searchRentCars,
    rentCar
};