import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Button } from 'antd'


const About: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>about</h2>
        <Button>点击开启弹窗</Button>

      </main>
    </div>
  )
}

export default About
