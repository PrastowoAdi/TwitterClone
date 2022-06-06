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
export default function Sidebar() {
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full'>
        
        {/* Logo */}
        <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1'>
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
        </div>

        {/* Button */}
        <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>

        {/* Mini Profile */}
        <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
            <img className='h-10 w-10 rounded-full xl:mr-2' src="/img/avatar-man.png" alt="user-img"/>
            <div className='leading-5 hidden xl:inline'>
                <h4 className='font-bold'>Prastowo Adi</h4>
                <p className='text-gray-500'>@prastowoadi</p>
            </div>
        <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline'/>
        </div>
    </div>
  )
}
