import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "~/constants/general/buttons/GoogleButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { PuffLoader } from "react-spinners";
import { getSession, signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AuthOption } from "~/server/auth";
import DiscordButton from "~/constants/general/buttons/DiscordButton";

const loginSchema = z.object({
  email: z
    .string()
    .email("Email format invalid. Make sure your email data is valid"),
  password: z.string().min(8, "Your password is too short"),
});
type formInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const session = useSession();
  const handleLogin = (option: AuthOption, data?: formInputs) => {
    setIsLoggingIn(true);
    switch (option) {
      case "credentials":
        signIn("credentials", { ...data, callbackUrl: "/" })
          .then(() => {
            toast.success(
              "Successfully logged in. Redirecting you to the main page"
            );
          })
          .catch((error) => {
            toast.error(error.message ?? error);
          })
          .finally(() => setIsLoggingIn(false));
        break;
      default:
        signIn(option)
          .then(async () => {
            if (option === "google") void (await getSession());
          })
          .catch((error) => {
            toast.error(error.message ?? error);
          })
          .finally(() => setIsLoggingIn(false));
        break;
    }
  };

  return (
    <div
      className={`flex min-h-[50vh] ${
        session.status !== "unauthenticated"
          ? "justify-center align-middle"
          : ""
      } h-max flex-col items-center space-y-20 `}
    >
      {session.status === "loading" ? (
        <PuffLoader size={100} />
      ) : session.status !== "unauthenticated" ? (
        <h1 className="h-fit w-fit text-4xl text-yellow-400">
          You are already authenticated
        </h1>
      ) : (
        <>
          <form
            onSubmit={handleSubmit((data) => handleLogin("credentials", data))}
            className="flex w-full flex-col items-center justify-center gap-5 align-middle"
          >
            <div className="mt-8 flex w-full flex-col items-center">
              <label
                className="mb-2 block  font-handwriting text-lg font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="focus:shadow-outline w-1/2 appearance-none rounded bg-green-950 px-3 py-2  leading-tight text-gray-700 transition-all duration-300 focus:bg-green-700  focus:outline-none"
                id="email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs italic text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className=" relative flex w-full flex-col items-center">
              <label
                className="mb-2 block  font-handwriting text-lg font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" focus:shadow-outline w-1/2 appearance-none rounded bg-green-950 px-3 py-2  leading-tight text-gray-700 transition-all duration-300 focus:bg-green-700  focus:outline-none"
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-[70%] top-1/2"
              >
                <Visibility className="!opacity-40" />
              </button>
              {errors.password && (
                <p className="text-xs italic text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between font-handwriting">
              <button
                className="focus:shadow-outline flex w-48 items-center justify-center rounded bg-green-800 px-4 py-2 align-middle font-bold text-white transition-all duration-300 hover:bg-green-700 focus:bg-green-700 focus:outline-none"
                type="submit"
              >
                {isLoggingIn ? <PuffLoader size={20} /> : `Login`}
              </button>
            </div>
          </form>
          <div className="flex h-auto w-full items-center justify-center space-x-8 align-middle">
            <GoogleButton
              onClick={() => handleLogin("google")}
              text={"Login with Google"}
              h="sm"
              w="lg"
            />
            <DiscordButton
              onClick={() => handleLogin("discord")}
              text={"Login with Discord"}
              h="sm"
              w="lg"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
