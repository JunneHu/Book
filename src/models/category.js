import * as category from '../services/category';

export default {
    namespace: 'category',
    state: {},
    effects: {
        *category({ payload }, { call, put }) {
            const result = yield call(category.category, payload);
            yield put({
                type: 'success',
                payload: {
                    getCategory: result
                },
            });
        },
        *category1({ payload }, { call, put }) {
            const result = yield call(category.category1, payload);
            yield put({
                type: 'success',
                payload: {
                    getCategory1: result
                },
            });
        },
        *category2({ payload }, { call, put }) {
            const result = yield call(category.category2, payload);
            yield put({
                type: 'success',
                payload: {
                    getCategory2: result
                },
            });
        },
    },
    reducers: {
        success(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        }
    },
};