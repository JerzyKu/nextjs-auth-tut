"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input" 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

type Props = {};

export function LoginForm({}: Props) {

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition ] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values)
        .then(data => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
    
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              control={form.control}
              name="email"
              render={ ({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                  <Input 
                    {...field} 
                    disabled={isPending}
                    placeholder="john.doe@example.com" 
                    type="email"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
              }
            />

            <FormField 
              control={form.control}
              name="password"
              render={ ({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <Input 
                    disabled={isPending}
                    {...field} 
                    placeholder="******" 
                    type="password"
                    />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
              }
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button 
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
