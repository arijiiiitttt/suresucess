"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/base/FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3).max(20) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Welcome to SureSuccess! Account created successfully.", values);
        router.push('/sign-in');
      } else {
        toast.success("Sign In successful. Welcome back!", values);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(`Oops! Something went wrong: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <>
      <div className="border h-auto w-full max-w-[400px] flex flex-col justify-between border-gray-300 rounded-lg bg-white shadow-lg overflow-auto transition-shadow duration-300 ease-in-out hover:shadow-2xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col items-center gap-y-2 justify-center">
            <Image src="./logoo.svg" alt="logo" height={46} width={46} />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">SureSuccess</h3>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
            />

            <Button
              type="submit"
              className="w-full px-4 py-3 text-sm md:text-base font-medium text-white bg-violet-400 border border-transparent rounded-md shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isSignIn ? "Sign In" : "Create Account"}
            </Button>

            <p className="text-center text-gray-600 text-sm pt-4">
              {isSignIn ? "No account yet? " : "Already have an account? "}
              <Link
                href={!isSignIn ? "/sign-in" : "/sign-up"}
                className="font-semibold text-indigo-600 hover:underline"
              >
                {!isSignIn ? "Sign In" : "Sign Up"}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AuthForm;