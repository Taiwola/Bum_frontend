"use client";
import React from "react";
import { Label } from "@/component/components/ui/label";
import { Input } from "@/component/components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "react-query"
import { registerRoute } from "@/api/auth/route";
import { ToastAction } from "@/component/components/ui/toast";
import { useToast } from "@/component/components/ui/use-toast";

const registerForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string()
});

export type TFormSchema = z.infer<typeof registerForm>;


export function RegisterForm() {
  const {toast} = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TFormSchema>({
    resolver: zodResolver(registerForm)
  });

  const onMutation = useMutation(registerRoute, {
    onSuccess: async (message: string) => {
      toast({
        variant: "default",
        title: "Login",
        description: message,
        className: "border text-black font-medium dark:bg-black dark:text-white"
      });
      reset();
      navigate('/sign-in');
    },
    onError: async (error: Error) => {
      toast({
        variant: "default",
        title: "Error",
        description: error.message,
        className: "bg-red-400 text-white font-medium",
        action: <ToastAction altText="Try again" className="hover:bg-red-400">Try again</ToastAction>
      });
      reset();
  }
  });

  const onSubmit = (data: TFormSchema) => {
    if (data.password !== data.confirm_password) return toast({
      description: "password do not match",
      className: "border bg-white z-[1000px] text-black font-medium dark:bg-black dark:text-white"
    });
    onMutation.mutate(data);
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Get Started
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Have an account? <Link to="/sign-in" className="text-red-600">Sign in</Link>
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter Your Name" type="text" {...register("name")}  />
            {errors?.name ?  (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            ) : ""}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email")} />
          {
            errors?.email ? (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            ) : ""
          }
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" {...register("password")} />
          {
            errors.password ? (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            ) : ""
          }
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirm password">Confirm your password</Label>
          <Input
            id="confirmpassword"
            placeholder="••••••••"
            type="password"
            {...register("confirm_password")}
          />
          {errors?.confirm_password ? (
            <p className="text-sm text-red-500">{errors.confirm_password.message}</p>
          ) : ""}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative transition-all duration-500 hover:bg-gray-600 bg-[#470A8A] group/btn dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

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
