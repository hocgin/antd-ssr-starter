import * as React from 'react';
import apiService from '@/services/api';
import { IGetInitialProps } from 'umi';

const Index = (props: any) => {
  console.log('props', props);
  return <div>Hi</div>;
};

Index.getInitialProps = (async ({ store, isServer, history, match, route }: any) => {
  let { data } = await apiService.worked({});
  return Promise.resolve({ data });
}) as IGetInitialProps;

export default Index;
