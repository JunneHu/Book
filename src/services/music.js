import axios from '../utils/axios';
import Api from '../configs/api';

export function music(params) {
    return axios.get(configs.baseUrl + Api.music, { params });
}
export function getMusicInfo(params) {
    return axios.get(configs.baseUrl + Api.music + '/detail/' + params.id);
}
