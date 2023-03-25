import { get, post } from "../util/api";

const url = 'http://localhost:3003';

async function register(data) {
    return await post(`${url}/users/register`, data);
}

async function login(data) {
    return await post(`${url}/users/login`, data);
}

async function logout(token) {
    return await get(`${url}/users/logout`, token);
}


export {
    register,
    login,
    logout
};