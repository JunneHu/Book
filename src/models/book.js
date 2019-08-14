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
    *getBookInfo({ payload }, { call, put }) {
      const result = yield call(book.getBookInfo, payload);
      yield put({
        type: 'success',
        payload: {
          getBookInfo: result,
        },
      });
    },
    *getChapterByBookId({ payload }, { call, put }) {
      const result = yield call(book.getChapterByBookId, payload);
      yield put({
        type: 'success',
        payload: {
          getChapterByBookId: result,
        },
      });
    },
    *userBook({ payload }, { call, put }) {
      const result = yield call(book.userBook, payload);
      yield put({
        type: 'success',
        payload: {
          userBook: result,
        },
      });
    },
    *userBookList({ payload }, { call, put }) {
      const result = yield call(book.userBookList, payload);
      yield put({
        type: 'success',
        payload: {
          userBookList: result,
        },
      });
    },
    *getListByName({ payload }, { call, put }) {
      const result = yield call(book.getListByName, payload);
      yield put({
        type: 'success',
        payload: {
          getListByName: result,
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
    },
  },
};