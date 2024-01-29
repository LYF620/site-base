import Link from 'next/link'
import styles from '../../styles/Header.module.css'


export default function Header() {
    return (
      <>
       <div className={styles.header}>我是头部</div>
       <Link href="/about">关于</Link>

      </>
    )
  }