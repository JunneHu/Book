import axios from '../utils/axios';
import Api from '../configs/api';

export function login(params) {
    return axios.post(configs.baseUrl + Api.login, params);
}
