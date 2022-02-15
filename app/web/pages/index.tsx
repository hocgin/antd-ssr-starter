import React from 'react';
import { connect, useIntl, getLocale, setLocale } from 'umi';
import { Button } from 'antd';

const Home = (props: any) => {
  const { title } = props;
  console.log('renderd', title);
  const changeLangs = () => {
    const lang = getLocale();
    const change = lang === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLocale(change, true);
  };
  const intl = useIntl();
  return (<div>
    <h1>{title}</h1>
    <h2>{intl.formatMessage({ id: 'umi' })}</h2>
    <Button onClick={changeLangs}>切换语言</Button>
  </div>);
};
Home.getInitialProps = (async ({ store, isServer, history, match, route }: any) => {
  // console.log(ctx);
  if (!isServer) {
    return;
  }
  await store.dispatch({ type: 'test/test' });
  const { test } = store.getState();
  return { test };
});

export default connect((({ test }: any) => ({ title: test.title })))(Home);
