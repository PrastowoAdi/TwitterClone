/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { db, storage } from '../firebase'
import { HeartIcon as HearIconLiked } from '@heroicons/react/solid'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atom/modalAtom'

export default function Post({post,id}) {
    const {data: session} = useSession();
    const [likes, setLikes] = useState([]);
    const [comments, setComment] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', id, 'likes'),(snapshot) => setLikes(snapshot.docs)
        )
    },[db])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', id, 'comments'),(snapshot) => setComment(snapshot.docs)
        )
    },[db])

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
    },[likes])

    async function likedPost (){
        if(session){
            if(hasLiked){
                await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid))
            } else {
                await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                    username: session?.user.username
                })
            }
        } else {
            signIn()
        }
    }

    async function deletePost(){
       if(window.confirm("Are you sure want to delete this post?")){
        deleteDoc(doc(db, "posts", id));
        if(post.data().image){
            deleteObject(ref(storage, `posts/${id}/image`))
        }
        router.push("/")
       }

    }

    return (
        <div className='flex p-3 cursor-pointer border-b border-gray-200'>
            {/* User Image */}
            <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.data()?.userImg}
                alt=""
            />
            {/* right side */}
            <div className='flex-1'>
                {/* Header */}

                <div className='flex items-center justify-between'>
                    {/* post user info */}
                    <div className='flex items-center space-x-1 whitespace-nowrap'>
                        <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>
                        <span className='text-sm sm:text-[15px]'>@{post?.data()?.username} - </span>
                        <span className='text-sm sm:text-[15px] hover:underline'>
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>

                    {/* doticon */}
                    <DotsHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2'/>
                </div>
                {/* post text */}
                <p onClick={() => router.push(`/posts/${id}`)} className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{post?.data()?.text}</p>
                {/* post image */}
                <img onClick={() => router.push(`/posts/${id}`)} src={post?.data()?.image} alt='' className='rounded-2xl mr-2'/>
                {/* icons */}
                <div className='flex justify-between text-gray-500 p-2 '>
                    <div className='flex items-center select-none'>
                    <ChatIcon onClick={() => {
                        if(!session){
                            signIn()
                        } else {
                            setOpen(!open);
                            setPostId(id);
                        }
                    }} className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>
                    {comments.length > 0 && (
                        <span className='text-sm'>{comments.length}</span>
                    )}
                    </div> 
                    {session?.user.uid === post?.data()?.id && (
                        <TrashIcon onClick={deletePost} className='h-9 hoverEffect p-2 hover:text-rose-500 hover:bg-rose-100'/>
                    )}
                    <div className='flex items-center'>
                        {hasLiked ? (
                            <HearIconLiked onClick={likedPost} className='h-9 hoverEffect p-2 text-rose-500 hover:bg-rose-100'/>
                        ) : (
                            <HeartIcon onClick={likedPost} className='h-9 hoverEffect p-2 hover:text-rose-500 hover:bg-rose-100'/>                       
                        )}
                        {
                            likes.length > 0 && (
                                <span className={`${hasLiked && "text-rose-500"} text-sm select-none`}>{likes.length}</span>
                            )
                        }
                    </div>
                    <ShareIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>
                    <ChartBarIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>
                </div>
            </div>
        </div>
    )
}
