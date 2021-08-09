let FILL_RANDOM_DATA = 'fillRandomData';
let FILL_TEST = 'fillTest';

let initState = {
  title: null,
  randomData: null
};

export default {
  namespace: 'test',
  state: initState,
  effects: {
    * getTest({payload = {}, callback}, {call, put}) {
      yield put({type: FILL_RANDOM_DATA, payload: `${Math.random() * 10000}`});
    }
  },
  reducers: {
    [FILL_TEST](state, {payload}) {
      state.title = 'hello umi';
    },
    [FILL_RANDOM_DATA](state, {payload}) {
      return {...state, randomData: payload};
    }
  },
};
