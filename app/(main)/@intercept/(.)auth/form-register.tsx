"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/_util/Toast";
import { zRegisterFormSchema } from "./schema-form";
import { CONFIG_AUTH } from "../../auth/config/config-auth";

type RegisterFormSchema = z.infer<typeof zRegisterFormSchema>;

const Register = ({ setState }: { setState: (state: boolean) => void }) => {
  const { register, handleSubmit, formState, reset } =
    useForm<RegisterFormSchema>({
      resolver: zodResolver(zRegisterFormSchema),
      mode: "onChange",
    });

  const submit = handleSubmit(async (values) => {
    try {
      const URL = CONFIG_AUTH("register");
      const { data } = await axios.post(URL, {
        ...values,
      });
      showToast({ type: "success", fallback: data.message });
      console.log(data.message);
      setState(true);
      // reset();
    } catch (error) {
      console.error(error);
      showToast({ type: "error", fallback: error });
    }
  });

  return (
    <div
      className="bg-black/80 backdrop-blur-sm text-white w-[600px] h-auto p-8
                rounded-xl border border-white/10 shadow-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6 w-full">
        <div className="w-[70%]">
          <h3 className="text-2xl font-bold">Create an account</h3>
          <p className="text-sm text-gray-300 mt-1">
            Enter your details to register a new account
          </p>
        </div>

        <button
          type="button"
          className="text-blue-400 hover:text-blue-300 transition font-medium"
          onClick={() => setState(true)}
        >
          Already have account
        </button>
      </div>

      {/* Form */}
      <form onSubmit={submit}>
        <div className="flex flex-col gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <label htmlFor="firstName" className="text-sm text-gray-300">
                First Name
              </label>
              {formState.errors.firstName && (
                <p className="text-red-500 text-xs">
                  {formState.errors.firstName.message}
                </p>
              )}
            </span>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              className="rounded-md border border-white/20 bg-white/10 
                     focus:bg-white/20 p-2 text-white outline-none 
                     focus:ring-2 focus:ring-blue-500 transition"
              required
              {...register("firstName")}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <label htmlFor="lastName" className="text-sm text-gray-300">
                Last Name
              </label>
              {formState.errors.lastName && (
                <p className="text-red-500 text-xs">
                  {formState.errors.lastName.message}
                </p>
              )}
            </span>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              className="rounded-md border border-white/20 bg-white/10 
                    focus:bg-white/20 p-2 text-white outline-none 
                      focus:ring-2 focus:ring-blue-500 transition"
              required
              {...register("lastName")}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <label htmlFor="email" className="text-sm text-gray-300">
                Email
              </label>
              {formState.errors.email && (
                <p className="text-red-500 text-xs">
                  {formState.errors.email.message}
                </p>
              )}
            </span>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="rounded-md border border-white/20 bg-white/10 
                     focus:bg-white/20 p-2 text-white outline-none 
                     focus:ring-2 focus:ring-blue-500 transition"
              required
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              {formState.errors.password && (
                <p className="text-red-500 text-xs">
                  {formState.errors.password.message}
                </p>
              )}
            </span>
            <input
              id="password"
              type="password"
              placeholder="Your secure password"
              className="rounded-md border border-white/20 bg-white/10 
                     focus:bg-white/20 p-2 text-white outline-none 
                     focus:ring-2 focus:ring-blue-500 transition"
              required
              {...register("password")}
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-sm text-gray-300">
              Role
            </label>
            <select
              id="role"
              className="rounded-md border border-white/20 bg-white/10 p-2 text-white 
                     outline-none focus:ring-2 focus:ring-blue-500 transition"
              defaultValue="guest"
            >
              <option value="creator" className="bg-black text-white">
                Creator
              </option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-3 mt-6">
          {/* Register */}
          <button
            className="w-full p-2 bg-white text-black font-medium 
                   rounded-md shadow hover:bg-gray-200 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
