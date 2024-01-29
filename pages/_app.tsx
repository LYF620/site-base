import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import Layout from './components/Layout'
import useFlex from '../utils/hooks/useFlex'

function MyApp({ Component, pageProps }: AppProps) {
  useFlex()
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
