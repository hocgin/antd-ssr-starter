import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import TestModel from '@/models/test';
import { dispatchType } from '@/utils/model-utils';

@connect(({ test }: any, ...rest: any) => {
  return { test };
}, (...rest: any) => {
  console.log('arg2', rest);
  return {};
})
class index extends React.Component {
  render() {
    let { test, ...rest }: any = this.props;
    console.log(test, 'xx=>');
    return (<div className={styles.page}>
      randomData: {`${test?.randomData}`}
    </div>);
  }
}

// @ts-ignore
index.getInitialProps = (async ({ store, isServer, history, match, route }: any) => {
  if (!isServer) {
    return;
  }
  let type = dispatchType(TestModel, TestModel.effects.getTest);
  await store.dispatch({ type: type });
  let { test } = store.getState();
  return Promise.resolve({ test });
});

export default index;
