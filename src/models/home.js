import * as home from '../services/home';

export default {
  namespace: 'home',
  state: {},
  effects: {
    *banner({ payload }, { call, put }) {
      const result = yield call(home.banner, payload);
      yield put({
        type: 'success',
        payload: {
          banner: result,
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
    },
    toMid(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};