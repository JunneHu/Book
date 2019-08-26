import * as article from '../services/article';

export default {
    namespace: 'article',
    state: {},
    effects: {
        *article({ payload }, { call, put }) {
            const result = yield call(article.article, payload);
            yield put({
                type: 'success',
                payload: {
                    getArticle: result
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