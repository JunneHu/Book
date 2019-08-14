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
    },
    *category1({ payload }, { call, put }) {
      const result = yield call(home.category1, payload);
      yield put({
        type: 'success',
        payload: {
          category1: result,
        },
      });
    },
    *category2({ payload }, { call, put }) {
      const result = yield call(home.category2, payload);
      yield put({
        type: 'success',
        payload: {
          category2: result,
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