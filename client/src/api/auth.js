import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (credentials) => axios.post(`/login`, credentials)

export const verifyTokenRequest = () => axios.get("/verify")
