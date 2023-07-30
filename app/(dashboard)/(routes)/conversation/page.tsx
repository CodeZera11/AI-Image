"use client"

import Heading from '@/components/Heading'
import { MessageSquare } from 'lucide-react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import { ChatCompletionRequestMessage } from 'openai'
import Loader from '@/components/Loader'
import Empty from '@/components/Empty'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'

const ConversationPage = () => {

    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const formSchema = z.object({
        prompt: z.string().min(1, {
            message: "Prompt must be at least 1 character long.",
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt }
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", { messages: newMessages });

            setMessages((current) => [...current, userMessage, response.data])

            form.reset();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Heading
                title='Conversation AI'
                description='Ask anything you want and you will get all answers!'
                icon={MessageSquare}
                iconColor='text-green-500'
                bgColor='bg-green-500/10'
            />

            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-muted"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-4'>
                                            <Input placeholder="What is the radius of sun?" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}></FormField>
                            <Button className="w-full col-span-12 lg:col-span-2" type="submit" size="icon">Submit</Button>
                        </form>
                    </Form>
                </div>
                <div className="flex flex-col-reverse gap-y-4">

                    {isLoading && (
                        <div className='p-8 rounded-full w-full items-center justify-center'>
                            <Loader />
                        </div>
                    )}

                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started yet!" />
                    )}

                    {messages.map((message) => (
                        <div
                            key={message.content}
                            className={cn('w-full p-8 flex items-start gap-x-8 rounded-lg', message.role === 'user' ? "bg-white border border-black" : "bg-muted")}
                        >
                            {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                            <p className='text-sm'>{message.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ConversationPage