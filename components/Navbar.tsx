import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { getApiLimit } from '@/lib/api_limit'
import { checkSubscription } from '@/lib/subscription'

const Navbar = async () => {

    const apiLimitCount = await getApiLimit();
    const isPro = await checkSubscription();

    return (
        <div className='flex items-center p-4'>
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            <div className='flex w-full justify-end'>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div >
    )
}

export default Navbar