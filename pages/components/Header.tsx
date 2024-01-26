import Link from 'next/link'

export default function Header() {
    return (
      <>
       <h2>我是头部
       <Link href="/about">关于</Link>
       </h2>
      </>
    )
  }