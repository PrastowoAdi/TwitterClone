/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ComponentModal from '../../components/ComponentModal'
import Sidebar from '../../components/Sidebar'
import Comment from '../../components/Comment'
import Widgets from '../../components/Widgets'
import Posts from '../../components/Post'
import { useEffect,useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { AnimatePresence, motion } from 'framer-motion'

export default function PostPage({newResults, randomUsersResults}) {
    const router = useRouter();
    const {id} = router.query;
    const [post, setPost] = useState();
    const [comments, setComments] = useState([])

    useEffect(() => {
        onSnapshot(doc(db, "posts", id),(snapshot) => setPost(snapshot))
    },[db,id])

    useEffect(() => {
        onSnapshot(
          query(
            collection(db, "posts", id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => setComments(snapshot.docs)
        );
      }, [db, id]);
      console.log(comments);

    return (
        <>
        <Head>
            <title>Post Page</title>
            <meta name="description" content="Twitter Clone with NextJS" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className='flex min-h-screen mx-auto'>

            {/* Sidebar */}
            <Sidebar/>
            
            {/* Feed */}
            <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
                <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
                    <div onClick={() => router.push("/")} className='hoverEffect'>
                        <ArrowLeftIcon className='h-5 '/>
                    </div>
                    <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Tweet</h2>
                </div>
                <Posts id={id} post={post}/>
                <AnimatePresence>
                {comments.length > 0 && (
                    <div className=''>
                        {comments.map((comment) => (
                          <motion.div
                          key={post.id}
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
                          trasition={{duration: 1}}
                      >
                           <Comment
                            key={comment.id}
                            commentId={comment.id}
                            originalPostId={id}
                            comment={comment.data()}
                            />
                      </motion.div>
                           
                        ))}
                    </div>
                )}
                </AnimatePresence>
            </div>

            {/* Widgets */}
            <Widgets newResults={newResults.articles} randomUsersResults={randomUsersResults.results}/>

            {/* Modal */}
            <ComponentModal/>
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