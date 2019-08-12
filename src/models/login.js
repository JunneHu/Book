import * as login from '../services/login';

export default {
    namespace: 'login',
    state: {},
    effects: {
        *login({ payload }, { call, put }) {
            const result = yield call(login.login, payload);
            yield put({
                type: 'success',
                payload: {
                    loginResult: result
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