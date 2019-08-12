import * as book from '../services/book';

export default {
  namespace: 'book',
  state: {},
  effects: {
    *book({ payload }, { call, put }) {
      const result = yield call(book.book, payload);
      yield put({
        type: 'success',
        payload: {
          book: result,
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