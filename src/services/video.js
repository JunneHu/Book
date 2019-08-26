import axios from '../utils/axios';
import Api from '../configs/api';

export function video(params) {
    return axios.get(configs.baseUrl + Api.video, { params });
}