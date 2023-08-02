"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface SubscriptionButtonProps {
    isPro: boolean
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")
            console.log(response)
            router.push(response.data.url)
        } catch (error) {
            console.log("Subscription button error", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button disabled={loading} onClick={handleClick} className='ml-4 lg:ml-8 mt-5'>
            {isPro ? "Manage Subscription" : "Upgrade"}
        </Button>
    )
}

export default SubscriptionButton