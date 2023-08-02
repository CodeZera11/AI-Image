import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

const BotAvatar = () => {
    return (
        <Avatar className='w-8 h-8'>
            <AvatarImage src='/bog.png' />
        </Avatar>
    )
}

export default BotAvatar