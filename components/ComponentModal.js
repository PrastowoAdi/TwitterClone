/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState } from "recoil"
import { modalState, postIdState } from "../atom/modalAtom"
import Modal from 'react-modal'
import { XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { db } from "../firebase"
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore"
import Moment from 'react-moment'
import { signOut, useSession } from "next-auth/react"
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"

export default function ComponentModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [postId] = useRecoilState(postIdState);
    const [post, setPost] = useState({})
    const [input, setInput] = useState("")
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPost(snapshot)
        })
    }, [postId, db])

    async function sendComment(){
        await addDoc(collection(db, "posts", postId, "comments"), {
            comment: input,
            name: session.user.name,
            username: session.user.username,
            userImg: session.user.image,
            timestamp: serverTimestamp()
        })

        setOpen(false)
        setInput("")
        router.push(`/posts/${postId}`)
    }
  return (
    <div>
        {open && (
            <Modal 
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 outline-none rounded-xl shadow-lg"
            >
                <div className="p-1">
                    <div className="border-b border-gray-200 py-2 px-1.5">
                        <div onClick={() => setOpen(false)} className="hoverEffect w-9 h-9 flex items-center justify-center">
                            <XIcon className="h-[30px] text-gray-700"/>
                        </div>
                    </div>
                    <div className="p-2 flex items-center space-x-1 relative">
                        <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"/>
                        <img className='h-11 w-11 rounded-full mr-4' src={post?.data()?.userImg} alt='user-img'/>
                        <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>
                        <span className='text-sm sm:text-[15px]'>@{post?.data()?.username} - </span>
                        <span className='text-sm sm:text-[15px] hover:underline'>
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>
                    <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>{post?.data()?.text}</p>
                <div className="flex p-3 space-x-3">
                    <img onClick={signOut} className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" src={session.user.image} alt="user-img" referrerPolicy="no-referrer"/>
                    <div className="w-full divide-y divide-gray-200">
                        <div className="">
                            <textarea className="w-full border-none focus:ring-0 text-lg placeholderbg-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="Tweet your reply"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}></textarea>
                        </div>
                        <div className="flex items-center justify-between pt-2.5">
                            
                                    <div className="flex">
                                        <div className="" onClick={() => filePickerRef.current.click()}>
                                        <PhotographIcon className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-10 w-10"/>
                                        </div>
                                        <EmojiHappyIcon className="hoverEffect p-2 text-sky-400 hover:bg-sky-100 h-10 w-10"/>
                                    </div>
                                    <button onClick={sendComment} disabled={!input.trim()}  className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" type="submit">Reply</button>
                                
                        </div>
                        
                    </div>
                </div>
                </div>
            </Modal>
        )}
    </div>
  )
}
