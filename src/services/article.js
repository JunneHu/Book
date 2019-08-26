import axios from '../utils/axios';
import Api from '../configs/api';

export function article(params) {
    return axios.get(configs.baseUrl + Api.article, { params });
}