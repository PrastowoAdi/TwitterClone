import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <>
     <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter Clone with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen max-w-7xl mx-auto'>

        {/* Sidebar */}
        <Sidebar/>
        


        {/* Feed */}

        {/* Widgets */}

        {/* Modal */}
      </main>
    </>
  )
}
