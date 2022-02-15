let FILL_RANDOM_DATA = 'fillRandomData';
let FILL_TEST = 'fillTest';

let initState = {
  title: null,
  randomData: null,
};

export default {
  namespace: 'test',
  state: initState,
  effects: {
    * getTest({ payload = {}, callback }: any, { call, put }: any) {
      yield put({ type: FILL_RANDOM_DATA, payload: `${Math.random() * 10000}` });
    },
  },
  reducers: {
    [FILL_TEST](state: any, { payload }: any) {
      state.title = 'hello umi';
    },
    [FILL_RANDOM_DATA](state: any, { payload }: any) {
      return { ...state, randomData: payload };
    },
  },
};
