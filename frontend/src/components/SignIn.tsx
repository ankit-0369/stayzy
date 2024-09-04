
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../Api-clients'
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData= {
  email: string,
  password: string
}

export function SignIn() {
  const query= useQueryClient()
  const appContext= useAppContext()
  const navigate= useNavigate()
  const location= useLocation()
  const mutation= useMutation(apiClient.signIn, {

    onSuccess: async() =>{
        console.log("logged in successfully")
        appContext.showToast({
          message: "user logged in successfully",
          tpye: "SUCCESS"
        })

        await query.invalidateQueries("validateToken");
        navigate(location.state?.from?.pathname || "/");
    },

    onError: (error:Error) =>{
        appContext.showToast({
          message: error.message,
          tpye: "ERROR"
        })
    }

  })

  const { register,
     handleSubmit,
    formState: {errors}
    } = useForm<SignInFormData>()

  const onSubmit = handleSubmit((data)=>{
      console.log(data);
      mutation.mutate(data)
  })

  return (
    <div className="max-w-md w-full pt-10 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-center pt-5 text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back to StayZy 🤗
      </h2>
      <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign in to book your stay and enjoy our services! 🏨✨
      </p>

      <form className="my-8" onSubmit={onSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="yourname@example.com"
            type="email"
            {...register("email",
              {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid Email Address"
                }

              }
            )}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password", {
              required: "password to daal le bhai🤨",
              validate: {
                minLength: value => value.length >= 6 || "Password must be at least 6 characters long.",
                hasUpperCase: value => /[A-Z]/.test(value) || "Password must have an uppercase character",
                hasNumber: value => /[0-9]/.test(value) || "password must contains an intger."
              }
            })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </LabelInputContainer>

        <p className="text-neutral-600 text-sm max-w-sm mt-2 mb-2 dark:text-neutral-300">
          Don't have any account ?
          <span> <Link
            to={'/sign-up'}
            className="text-cyan-600"
          >Register Now 🚀</Link></span>
        </p>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign In &rarr; ✨
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Sign in with GitHub 💻
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Sign in with Google 🌐
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
