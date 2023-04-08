import { post, get, del, put } from "../util/api";
const url = 'http://localhost:3003/data';

async function sell(data) {
    return await post(`${url}/sell`, data);
}

async function edit(id, data) {
    return await put(`${url}/edit/${id}`, data);
}

async function getCars() {
    return await get(`${url}/catalog`);
}

async function getCar(id) {
    return await get(`${url}/details/${id}`);
}

async function getUserCars() {
    return await get(`${url}/myprofile/cars`);
}

async function getUserRentCars() {
    return await get(`${url}/myprofile/rentcars`);
}

async function getCarsHome() {
    return await get(`${url}`);
}

async function getRentCars() {
    return await get(`${url}/rentcar`);
}

async function searchCars(queryString) {
    return await get(`${url}/catalog?${queryString}`);
}

async function searchRentCars(queryString) {
    return await get(`${url}/rentcar?${queryString}`);
}

async function rentCar(carId) {
    return await get(`${url}/rentcar/${carId}`);
}

async function deleteCar(id) {
    return await del(`${url}/details/${id}`);
}

async function getProfilePicture() {
    return await get(`${url}/myprofile/picture`);
}

async function postProfilePicture(data) {
    return await post(`${url}/myprofile/picture`, data);
}


export {
    sell,
    edit,
    getCars,
    getCar,
    getUserCars,
    getCarsHome,
    getRentCars,
    getUserRentCars,
    searchCars,
    searchRentCars,
    rentCar,
    deleteCar,
    getProfilePicture,
    postProfilePicture
};