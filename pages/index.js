import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'

export default function Home({newResults, randomUsersResults}) {
  return (
    <>
     <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter Clone with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen mx-auto'>

        {/* Sidebar */}
        <Sidebar/>
        
        {/* Feed */}
        <Feed/>

        {/* Widgets */}
        <Widgets newResults={newResults.articles} randomUsersResults={randomUsersResults.results}/>

        {/* Modal */}
      </main>
    </>
  )
}

export async function getServerSideProps(){
  const newResults = await fetch ("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json").then((res) => res.json());

  const randomUsersResults = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture").then((res) => res.json());

  return {
    props: {
      newResults,
      randomUsersResults
    }
  }
}