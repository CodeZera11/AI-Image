"use client";

import React from 'react'
import TypewriterComponent from "typewriter-effect";

export const LandingHero = () => {
    return (
        <div className='text-white h-screen flex flex-col mt-[250px] items-center'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl space-y-5 font-extrabold'>
                <h1>Where Pixels Come to Life!</h1>
            </div>
            <div className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-9 text-ld sm:text-lg md:text-xl lg:text-3xl">
                <TypewriterComponent
                    options={{
                        strings: [
                            "Unleash the Power of AI Image Generator!"
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
            <div className='mt-7'>
                <p className='text-zinc-500'>Elevate Your Visuals with AI Image Generator&apos;s Magic Touch!</p>
            </div>
        </div>
    )
}
