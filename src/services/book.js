import axios from '../utils/axios';
import Api from '../configs/api';

export function book(params) {
    return axios.get(configs.baseUrl + Api.book, { params });
}