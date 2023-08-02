"use client"

import Heading from '@/components/Heading'
import { Image as image } from 'lucide-react'
import Image from 'next/image'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import Loader from '@/components/Loader'
import Empty from '@/components/Empty'
import { useRouter } from 'next/navigation'
import { useProModal } from '@/hooks/useProModal'

const ImagePage = () => {

    const proModal = useProModal();

    const router = useRouter()
    const [picture, setPicture] = useState<string>()

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
            setPicture("")
            const response = await axios.post("/api/image", values)

            setPicture(response.data[0])

            form.reset();
        } catch (error: any) {
            console.log(error)
            if (error?.response?.status === 403) {
                proModal.onOpen()
            }
            console.log(error)
        } finally {
            router.refresh();
        }
    }

    return (
        <>
            <Heading
                title='Image AI'
                description='Convert your ideas into pictures'
                icon={image}
                iconColor='text-emerald-500'
                bgColor='bg-emerald-500/10'
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
                                            <Input placeholder="Astronaut sitting on a horse" {...field} />
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

                    {!picture && !isLoading && (
                        <Empty label="No images generated yet!" />
                    )}

                    {picture && (
                        <div className='flex items-center justify-center w-full mt-10'>
                            <Image src={picture!} className='border-black border-2' alt='failed to generate image' width={400} height={300} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ImagePage