import { get, post } from "../util/api";

const url = 'http://localhost:3003';

async function register(token, data) {
    return await post(`${url}/users/register`, token, data);
}

async function login(token, data) {
    return await post(`${url}/users/login`, token, data);
}

async function logout(token) {
    return await get(`${url}/users/logout`, token);
}


export {
    register,
    login,
    logout
};