'use client'
import React, { useTransition, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from '@/components/ui/card'
import { credentialLogin } from '../actions'
import {LoginSchema} from "@/lib/types";
import { BeatLoader } from 'react-spinners'


const LoginForm = () => {

    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
        username: "",
        password: "",
        },
    })

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        startTransition(async () =>{
            const res = await credentialLogin(values);
            // Handle error
            if (res) {
                setErrorMessage(res);
            } else {
                setErrorMessage(null);
            }
        })
    }
    return (
        <Card className="w-[350px]"> 
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6">

                        <h1 className='text-center text-xl mb-6'>ACCOUNTING SYSTEM</h1>

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                <Input 
                                    {...field} 
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        {errorMessage && (  // Display error message if it exists
                            <p className="text-red-500 !mt-2">{errorMessage}</p>
                        )}

                        <Button 
                            className="w-full" 
                            type="submit"
                            disabled={isPending}
                        >
                            {
                            isPending ? 
                                // https://mhnpd.github.io/react-loader-spinner/docs/components/mutating-dots - loading icon
                                <BeatLoader 
                                    color="#fff"
                                    size={8}
                                />
                                : 
                                "Login"
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default LoginForm