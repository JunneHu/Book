import axios from '../utils/axios';
import Api from '../configs/api';

export function banner(params) {
    return axios.get(configs.baseUrl + Api.banner, { params });
}
