import * as video from '../services/video';

export default {
    namespace: 'video',
    state: {},
    effects: {
        *video({ payload }, { call, put }) {
            const result = yield call(video.video, payload);
            yield put({
                type: 'success',
                payload: {
                    getVideo: result
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