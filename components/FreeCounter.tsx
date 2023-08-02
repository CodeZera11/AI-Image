import React from 'react'
import { Card, CardContent } from './ui/card'
import { MAX_FREE_COUNTS } from '@/constants'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { useProModal } from '@/hooks/useProModal'


interface FreeCounterProps {
    apiLimitCount: number
}
const FreeCounter = ({ apiLimitCount }: FreeCounterProps) => {

    const proModal = useProModal()

    return (
        <div className='px-6'>
            <Card className='bg-white/10 text-white text-center space-y-2 border-0'>
                <CardContent className='py-3 text-sm'>
                    {apiLimitCount}/{MAX_FREE_COUNTS} Free Generation
                    <Progress className='h-2 text-center mt-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                    <Button onClick={proModal.onOpen} className='text-sm w-full bg-black mt-4 p-0'>Upgrade</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeCounter