import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "~/constants/general/buttons/GoogleButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { api } from "~/utils/api";
import { PuffLoader } from "react-spinners";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AuthOption } from "~/server/auth";
import DiscordButton from "~/constants/general/buttons/DiscordButton";

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .optional()
      .nullish(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type SignUpFormInputs = z.infer<typeof signUpSchema>;
const SignUp = () => {
  const [isThirdPartySignUp, setIsThirdPartySignUp] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });
  const { mutate, isLoading: isRegistering } =
    api.auth.registerCredential.useMutation({
      onSuccess: async (data) => {
        void reset();
        await signIn("credentials", data);
        toast.success(
          "Successfully signed in. Redirecting you to the main page",
          { duration: 3000 }
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // return router.push("/");
      },
      onError: (data) => {
        return toast.error(data.message);
      },
    });

  const onSubmit = ({
    email,
    password,

    username = undefined,
  }: SignUpFormInputs) => {
    console.log("data", email, password, username);

    return void mutate({ email, password, username });
  };
  const handleThirdPartyLogin = (option: AuthOption) => {
    setIsThirdPartySignUp(true);

    signIn(option)
      .then(async () => {
        if (option === "google") void (await getSession());
      })
      .catch((error: any) => {
        toast.error(error.message ?? error);
      })
      .finally(() => setIsThirdPartySignUp(false));
  };
  return (
    <div className="flex h-auto min-h-[80vh] w-full flex-col items-center  space-y-14 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-5 space-y-6 pt-10 align-middle"
      >
        <div className="flex h-12 w-full flex-col items-center justify-center space-y-2 align-middle">
          <input
            className="focus:shadow-outline  w-1/2 appearance-none rounded bg-green-950 px-3 py-2  leading-tight text-green-200 transition-all duration-300 placeholder:text-gray-700 focus:bg-green-700  focus:outline-none"
            {...register("username")}
            placeholder="Username (optional)"
          />
          {errors.username && (
            <p className="text-red-200">{errors.username.message}</p>
          )}
        </div>
        <div className="flex h-12 w-full flex-col items-center justify-center space-y-2 align-middle">
          <input
            className="focus:shadow-outline  w-1/2 appearance-none rounded bg-green-950 px-3 py-2  leading-tight text-green-200 transition-all duration-300 placeholder:text-gray-700 focus:bg-green-700  focus:outline-none"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-200">{errors.email.message}</p>
          )}
        </div>

        <div className="flex h-12 w-full flex-col items-center justify-center space-y-2 align-middle">
          <input
            className=" duration-300e w-1/2 appearance-none rounded bg-green-950 px-3  py-2 leading-tight text-green-200 transition-all placeholder:text-gray-700 focus:bg-green-700  focus:outline-none"
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-200">{errors.password.message}</p>
          )}
        </div>
        <div className="flex h-12 w-full flex-col items-center justify-center space-y-2 align-middle">
          <input
            className="duration-300e w-1/2 appearance-none rounded bg-green-950 px-3  py-2 leading-tight text-green-200 transition-all placeholder:text-gray-700 focus:bg-green-700  focus:outline-none"
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-200">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          className="focus:shadow-outline flex w-48 items-center justify-center rounded bg-green-800 px-4 py-2 align-middle font-handwriting font-bold text-white transition-all duration-300 hover:bg-green-700 focus:bg-green-700 focus:outline-none disabled:bg-gray-800"
          type="submit"
          disabled={isRegistering || isThirdPartySignUp}
        >
          {isRegistering || isThirdPartySignUp ? (
            <PuffLoader size={20} />
          ) : (
            `Sign In`
          )}
        </button>
      </form>
      <div className="flex h-auto w-full items-center justify-center space-x-8 align-middle">
        <GoogleButton
          onClick={() => handleThirdPartyLogin("google")}
          text={"Sign up with Google"}
          disabled={isRegistering || isThirdPartySignUp}
        />
        <DiscordButton
          onClick={() => handleThirdPartyLogin("google")}
          text={"Sign up with Google"}
          disabled={isRegistering || isThirdPartySignUp}
        />
      </div>
    </div>
  );
};

export default SignUp;
