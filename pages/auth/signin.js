/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { getProviders, signIn } from 'next-auth/react'

export default function signin({providers}) {
  return (
    <div className='flex justify-center mt-40 space-x-4'>
        <img src='/img/signlogo.png' alt='logo-signin' className='hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex'/>
        <div className=''>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className='flex flex-col items-center'>
                    <img className='w-36 object-cover' src='/img/twitterlogo.svg'/>
                    <p className='text--center text-sm italic my-10'>This app is create with reason</p>
                    <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className='bg-rose-500 rounded-lg p-3 text-white hover:bg-rose-600'>Sign in with {provider.name}</button>    
                </div>

            ))}
        </div>
    </div>
  )
}


export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}