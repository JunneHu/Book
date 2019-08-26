import axios from '../utils/axios';
import Api from '../configs/api';

export function goods(params) {
    return axios.get(configs.baseUrl + Api.goods, { params });
}