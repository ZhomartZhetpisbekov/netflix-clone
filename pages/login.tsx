import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signUpUser, logInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (isLogin) {
      await logInUser(email, password);
    } else {
      await signUpUser(email, password);
    }
  };
  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-black 
                    md:items-center md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/netflix-bg.jpeg"
        fill
        className="-z-10 !hidden opacity-60 md:!inline"
        objectFit="cover"
        alt="Netflix Background"
      />
      <img
        src="https://rb.gy/ulxxee"
        width={100}
        height={100}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6
                        md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">
          {isLogin ? "Log In" : "Create an account"}
        </h1>
        <div className="space-y-4 flex flex-col">
          <label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input"
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email
              </p>
            )}
          </label>
          <label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Password must contain between 4 and 16 characters
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <div className="text-[gray]">
          {isLogin ? "New to Netflix? " : "Already have an account? "}
          <a
            onClick={() => setIsLogin(!isLogin)}
            className="text-white cursor-pointer hover:underline"
          >
            {isLogin ? "Create an account" : "Log In"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
