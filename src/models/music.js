import * as music from '../services/music';

export default {
    namespace: 'music',
    state: {},
    effects: {
        *music({ payload }, { call, put }) {
            const result = yield call(music.music, payload);
            yield put({
                type: 'success',
                payload: {
                    getMusic: result
                },
            });
        },
        *getMusicInfo({ payload }, { call, put }) {
            const result = yield call(music.getMusicInfo, payload);
            yield put({
                type: 'success',
                payload: {
                    getMusicInfo: result
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