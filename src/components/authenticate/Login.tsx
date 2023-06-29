import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "~/constants/general/buttons/GoogleButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

  return (
    <div className="flex min-h-[50vh] flex-col items-center space-y-20 rounded-b-xl bg-[#13472D]">
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
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
            className=" mb-3 w-1/2 appearance-none rounded  bg-green-950 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:-outline"
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
            className="focus:shadow-outline w-48 rounded bg-green-800 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-green-700 focus:bg-green-700 focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <GoogleButton
        onClick={() => console.log("hello world")}
        text={"Sign in with Google"}
        h="sm"
        w="lg"
      />
    </div>
  );
};

export default Login;
