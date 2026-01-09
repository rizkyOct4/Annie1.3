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
      const { data } = await axios.post(URL, values);
      showToast({ type: "success", fallback: data.message });
      console.log(data.message);
      setState(true);
      // console.log(values);
      // reset();
    } catch (error) {
      console.error(error);
      showToast({ type: "error", fallback: error });
    }
  });

  return (
    <div
      className="
    w-full max-w-xl
    bg-white/5 backdrop-blur-md
    border border-white/10
    rounded-xl
    p-8
    text-white
  ">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 w-full">
        <div className="w-[75%]">
          <h3 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h3>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            Enter your details to register a new account
          </p>
        </div>

        <button
          type="button"
          className="text-sm text-emerald-400 hover:text-emerald-300 transition font-medium"
          onClick={() => setState(true)}>
          Already have account
        </button>
      </div>

      {/* Form */}
      <form onSubmit={submit}>
        <div className="flex flex-col gap-5">
          {/* First Name & Last Name */}
          <div className="flex gap-4">
            {/* First Name */}
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="flex items-center gap-2">
                <label htmlFor="firstName" className="text-xs text-gray-400">
                  First Name
                </label>
                {formState.errors.firstName && (
                  <p className="text-red-400 text-[11px]">
                    {formState.errors.firstName.message}
                  </p>
                )}
              </span>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              placeholder:text-gray-500
              outline-none
              focus:border-white/20 focus:bg-black/60
              transition
            "
                required
                {...register("firstName")}
              />
            </div>

            {/* Last Name */}
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="flex items-center gap-2">
                <label htmlFor="lastName" className="text-xs text-gray-400">
                  Last Name
                </label>
                {formState.errors.lastName && (
                  <p className="text-red-400 text-[11px]">
                    {formState.errors.lastName.message}
                  </p>
                )}
              </span>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              placeholder:text-gray-500
              outline-none
              focus:border-white/20 focus:bg-black/60
              transition
            "
                required
                {...register("lastName")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2">
              <label htmlFor="email" className="text-xs text-gray-400">
                Email
              </label>
              {formState.errors.email && (
                <p className="text-red-400 text-[11px]">
                  {formState.errors.email.message}
                </p>
              )}
            </span>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="
            rounded-md
            border border-white/10
            bg-black/40
            px-3 py-2
            text-sm text-gray-200
            placeholder:text-gray-500
            outline-none
            focus:border-white/20 focus:bg-black/60
            transition
          "
              required
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2">
              <label htmlFor="password" className="text-xs text-gray-400">
                Password
              </label>
              {formState.errors.password && (
                <p className="text-red-400 text-[11px]">
                  {formState.errors.password.message}
                </p>
              )}
            </span>
            <input
              id="password"
              type="password"
              placeholder="Your secure password"
              className="
            rounded-md
            border border-white/10
            bg-black/40
            px-3 py-2
            text-sm text-gray-200
            placeholder:text-gray-500
            outline-none
            focus:border-white/20 focus:bg-black/60
            transition
          "
              required
              {...register("password")}
            />
          </div>

          {/* Role & Gender */}
          <div className="flex gap-4">
            {/* Role */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="role" className="text-xs text-gray-400">
                Role
              </label>
              <select
                id="role"
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              outline-none
              focus:border-white/20 focus:bg-black/60
              transition
            "
                defaultValue="creator"
                {...register("role")}>
                <option value="creator" className="bg-black text-white">
                  Creator
                </option>
              </select>
            </div>

            {/* Gender */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="gender" className="text-xs text-gray-400">
                Gender
              </label>
              <select
                id="gender"
                className="
              rounded-md
              border border-white/10
              bg-black/40
              px-3 py-2
              text-sm text-gray-200
              outline-none
              focus:border-white/20 focus:bg-black/60
              transition
            "
                {...register("gender")}>
                <option value="male" className="bg-black text-white">
                  Male
                </option>
                <option value="female" className="bg-black text-white">
                  Female
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-3 mt-8">
          <button
            className="
          w-full
          py-2.5
          bg-emerald-500
          hover:bg-emerald-400
          text-black text-sm font-semibold
          rounded-md
          transition
        ">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
