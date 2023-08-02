"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { useProModal } from '@/hooks/useProModal'
import { Card } from './ui/card'
import { Check, Image } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const tools = [
    {
        label: "Image Generation AI",
        icon: Image,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
]

export const ProModal = () => {

    const proModal = useProModal()

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center text-2xl font-bold'>Upgrade to Pro</DialogTitle>
                    <DialogDescription className='mt-2'>

                        {tools.map((tool) => (
                            <Card key={tool.label} className='flex justify-between p-2'>
                                <div className='flex gap-3'>
                                    <div className={cn("p-2 rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className='my-auto font-bold'>
                                        {tool.label}
                                    </div>
                                </div>
                                <div className='my-auto'>
                                    <Check />
                                </div>
                            </Card>
                        ))}
                    </DialogDescription>
                    <Button>Upgrade</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}