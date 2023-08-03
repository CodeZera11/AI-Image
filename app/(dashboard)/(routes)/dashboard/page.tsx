"use client";

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils';
import { ArrowRight, Image } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const tools = [
    {
        label: "Image Generation AI",
        href: "/image",
        icon: Image,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },

]

const DashboardPage = () => {

    const router = useRouter();

    return (
        <div>
            <div className='mb-8 space-y-4'>
                <h1 className='text-2xl md:text-4xl font-bold text-center'>Unleash The Power of AI</h1>
                <p className='text-center text-sm md:text-lg text-muted-foreground font-light'>Convert your text into AI generated Images</p>
            </div>
            <div className='px-4 md:px-20 lg:px-32 space-y-4'>
                {tools.map((tool) => (
                    <Card key={tool.href}
                        onClick={() => router.push(tool.href)}
                        className='cursor-pointer hover:shadow-md border-black/10 flex items-center justify-between transition p-4'
                    >
                        <div className='flex items-center gap-x-4'>
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("h-8 w-8", tool.color)} />
                            </div>
                            <div className='font-semibold'>
                                {tool.label}
                            </div>
                        </div>
                        <div>
                            <ArrowRight />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
