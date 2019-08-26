import * as goods from '../services/goods';

export default {
    namespace: 'goods',
    state: {},
    effects: {
        *goods({ payload }, { call, put }) {
            const result = yield call(goods.goods, payload);
            yield put({
                type: 'success',
                payload: {
                    getGoods: result
                },
            });
        }
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