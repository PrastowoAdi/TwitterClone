import Head from 'next/head'

export default function Home() {
  return (
    <>
     <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter Clone with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}
