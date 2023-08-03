import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LandingNavbar from '@/components/LandingNavbar'
import { LandingHero } from '@/components/LandingHero'

const LandingPage = () => {
    return (
        <div className='w-full h-screen bg-black'>
            <LandingNavbar />
            <LandingHero />
        </div>
    )
}

export default LandingPage