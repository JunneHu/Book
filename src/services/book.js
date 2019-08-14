import axios from '../utils/axios';
import Api from '../configs/api';

export function book(params) {
    return axios.get(configs.baseUrl + Api.book, { params });
}

export function getBookInfo(params) {
    return axios.get(configs.baseUrl + Api.book + '/detail/' + params.id);
}

export function getChapterByBookId(params) {
    return axios.get(configs.baseUrl + Api.chapter + '/' + params.cid);
}


export function userBook(params) {
    return axios.post(configs.baseUrl + Api.userBook , params);
}


export function userBookList(params) {
    return axios.get(configs.baseUrl + Api.userBook, { params });
}

export function getListByName(params) {
    return axios.get(configs.baseUrl + Api.getListByName, { params });
}
