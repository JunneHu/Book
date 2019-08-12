import axios from '../utils/axios';
import Api from '../configs/api';

export function banner(params) {
    return axios.get(configs.baseUrl + Api.banner, { params });
}

export function category1(params) {
    return axios.get(configs.baseUrl + Api.category1, { params });
}

export function category2(params) {
    return axios.get(configs.baseUrl + Api.category2, { params });
}
