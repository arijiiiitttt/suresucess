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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signUp ,signIn} from "@/lib/actions/auth.action";


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3).max(20) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Welcome to SureSuccess! Account created successfully.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Failed to sign in. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        })

        toast.success("Sign In successful. Welcome back!");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  }

  return (
    <div className="relative w-full max-w-[400px] mx-auto px-4">
      {/* Main white card */}
      <div className="relative w-full bg-white rounded-xl border-2 border-black p-6">
        {/* Yellow background div - smaller than white card */}
        <div className="absolute -bottom-2 -right-2 -z-10 w-[calc(100%-4px)] h-[calc(100%-4px)] bg-yellow-400 rounded-xl border-2 border-black" />
        
        <div className="flex flex-col gap-6 items-center mb-6">
          <div className="relative">
            {/* Logo container */}
            <div className="relative bg-white rounded-full border-2 border-black p-2">
              <Image src="/logoo.svg" alt="logo" height={36} width={36} className="relative z-10" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {isSignIn ? "Welcome Back!" : "Create Account"}
          </h3>
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

            <div className="relative mt-6">
              {/* Button with yellow background */}
              <Button
                type="submit"
                className="relative w-full bg-white hover:bg-yellow-400  text-black font-medium px-6 py-2.5 rounded-lg transition-all duration-200 border-2 border-black"
              >
                <div className="absolute -top-2 -left-2 -z-10 w-[calc(100%-4px)] h-[calc(100%-4px)] bg-yellow-400 rounded-lg border-2 border-black" />
                {isSignIn ? "Sign In" : "Create Account"}
              </Button>
            </div>

            <p className="text-center text-gray-600 text-sm pt-6">
              {isSignIn ? "No account yet? " : "Already have an account? "}
              <Link
                href={!isSignIn ? "/sign-in" : "/sign-up"}
                className="font-semibold text-black hover:text-gray-700 underline-offset-4 hover:text-bolder"
              >
                {!isSignIn ? "Sign In" : "Sign Up"}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;