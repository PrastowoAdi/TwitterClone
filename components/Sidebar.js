/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import React from 'react'
import SideBarMenuItem from './SideBarMenuItem'
import {
    HomeIcon
} from '@heroicons/react/solid'
import {
    BellIcon,
    BookmarkIcon,
    ClipboardIcon,
    DotsHorizontalIcon,
    HashtagIcon,
    InboxIcon,
    UserIcon
} from '@heroicons/react/outline'
import {
    useSession,signIn, signOut
} from 'next-auth/react'
export default function Sidebar() {
    const {data: session} = useSession()

    return (
        <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>
            
            {/* Logo */}
            <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1 ml-2'>
                <Image
                    className=''
                    src="/img/twitterlogo.svg"
                    width="40"
                    height="40"
                />
            </div>

            {/* Menu */}
            <div className='mt-4 mb-2.5 xl:items-start'>
                <SideBarMenuItem
                    text="Home"
                    Icon={HomeIcon}
                    active
                />
                <SideBarMenuItem
                    text="Explore"
                    Icon={HashtagIcon}
                />
                {session && (
                    <>
                        <SideBarMenuItem
                        text="Notifications"
                        Icon={BellIcon}
                        />
                        <SideBarMenuItem
                            text="Messages"
                            Icon={InboxIcon}
                        />
                        <SideBarMenuItem
                            text="Bookmarks"
                            Icon={BookmarkIcon}
                        />
                        <SideBarMenuItem
                            text="Lists"
                            Icon={ClipboardIcon}
                        />
                        <SideBarMenuItem
                            text="Profile"
                            Icon={UserIcon}
                        />
                        <SideBarMenuItem
                            text="More"
                            Icon={DotsHorizontalIcon}
                        />
                    </>
                )}
                
            </div>

            {/* Button */}

            {session ? (

                <>
                    <button className='bg-blue-400 text-white rounded-full xl:w-56 xl:h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>

                    <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
                        <img onClick={signOut} className='h-10 w-10 rounded-full xl:mr-2' src={session.user.image} alt="user-img"/>
                        <div className='leading-5 hidden xl:inline'>
                            <h4 className='font-bold'>{session.user.name}</h4>
                            <p className='text-gray-500'>@{session.user.username}</p>
                        </div>
                        <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline'/>
                    </div>
                </>
            ):(
                <button onClick={signIn} className='bg-blue-400 text-white rounded-full xl:w-36 xl:h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Sign in</button>
            )}
        </div>
    )
}
