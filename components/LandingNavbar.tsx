"use client"

import { SignInButton, UserButton, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const LandingNavbar = () => {

    const { isSignedIn } = useAuth();

    return (
        <div className='w-full h-[100px] text-white flex items-center justify-between px-4 lg:px-8'>
            <div>
                <Link href={"/"}>
                    <Image src={"/logo2.png"} alt='ai-image' width={180} height={100} />
                </Link>
            </div>
            <div>
                {isSignedIn ? (
                    <div className='flex gap-2 md:gap-7 items-center justify-center'>
                        <Link href={"/dashboard"}>
                            <Button variant={"ghost"} className='bg-zinc-900 text-sm md:text-md'>Get Started</Button>
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    <div className='flex gap-3'>
                        <Link href={"/sign-in"}>
                            <Button variant={"ghost"} className='rounded-xl text-sm md:text-md' >Login</Button>
                        </Link>
                        <Link href={"/sign-up"}>
                            <Button variant={"ghost"} className='rounded-xl text-sm md:text-md'>Register</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LandingNavbar