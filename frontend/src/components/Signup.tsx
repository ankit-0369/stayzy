
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../Api-clients'
import { useAppContext } from "../contexts/AppContext";

export type SignupFormData= {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

export function SignUp() {

  const { register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>()

  const appContext= useAppContext()
  const navigate= useNavigate()
  const queryClient= useQueryClient()
  const mutation= useMutation(apiClient.register, {
      onSuccess: async()=>{
        console.log("user successfully registered")
        appContext.showToast({
          message: "registered successfully",
          tpye: "SUCCESS"
        })
        await queryClient.invalidateQueries("validateToken");
        navigate('/')
      },
      
      onError: (errors:Error)=>{
        console.log(errors.message);
        appContext.showToast({
          tpye: "ERROR",
          message: errors.message
        })
      }
  })
  const onSubmit = handleSubmit((data) =>{
    console.log(data)
    mutation.mutate(data)
    return
  })
  
  if(mutation.isLoading) return
   <div className="text-center flex items-center justify-center
   text-2xl text-white h-screen w-full
   ">Loading...</div>
   

  return (
    <div className="max-w-md w-full pt-10 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-center pt-5 text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to StayZy 🌟
      </h2>
      <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
        Experience luxury and comfort with us. Sign up to book your dream stay! 🏨✨
      </p>

      <form className="my-8" onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Jay"
              type="text"
              {...register("firstName", { required: "this field is required" })}
            />
                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Viru"
              type="text"
              {...register("lastName", { required: "this field is required" })}
            />
                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </LabelInputContainer>

        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email is not in correct format"
              }
            })}
          />

          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password", {
              required: "Password is required",
              validate: {
                minLength: value => value.length >= 6 || "Password must be at least 6 characters long.",
                hasUpperCase: value => /[A-Z]/.test(value) || "Password must have an uppercase character",
                hasNumber: value => /[0-9]/.test(value) || "password must contains an intger."
              }
            })}
          />

          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            {...register("confirmPassword", {
              required: "kya kr rha bhai dobara password to daal",
              validate: (val) => {
                if (!val) return "kya kr rha bhai dobara password to daal";
                else if (watch("password") !== val) return "bhai dono passwords match nhi ho rhe🤨"

              }
            })}
          />

          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
        </LabelInputContainer>

        <p className="text-neutral-600 text-sm max-w-sm mt-2 mb-2 dark:text-neutral-300">
          Already have an account?
          <span>
            <Link to={'/sign-in'} className="text-cyan-600"> Log in now</Link> 🔑
          </span>
        </p>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr; ✨
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
              Sign up with GitHub 💻
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Sign up with Google 🌐
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
