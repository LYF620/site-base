import { useEffect } from 'react';
import Head from 'next/head';

export default function useFlex() {
  useEffect(() => {
    import("amfe-flexible");
  }, []);
  return (
    <div>
      <Head>
        <meta name="renderer" content="webkit" />
        <title>title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
    </div>);
}