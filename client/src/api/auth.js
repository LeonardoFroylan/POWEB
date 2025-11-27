import axios from 'axios';
const API="http://localhost:3000/api/";
const registerRequest= user => axios.post(`${API}register`, user);
const LoginRequest= user => axios.post(`${API}login`, user);
export {registerRequest,LoginRequest};