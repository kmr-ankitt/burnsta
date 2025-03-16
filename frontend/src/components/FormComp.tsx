"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import MyButton from "./MyButton";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function FormComp({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/${type}/${values.username}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={` ${className} flex flex-col gap-5`}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-zinc-200 font-bold">
                Give your username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Insta username"
                  className="text-zinc-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[.8rem] font-bold pt-2">
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <MyButton text={`GET ${type}ED`} className="w-full" />
      </form>
    </Form>
  );
}
