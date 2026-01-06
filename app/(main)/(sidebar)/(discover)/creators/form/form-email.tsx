"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { zEmailFormSchema } from "../@modal/(.)/[id]/z-schema";
import { ROUTES_CREATORS } from "../config";
import axios from "axios";
import { handleUnauthorized } from "@/_util/Unauthorized";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocalISOTime, RandomId } from "@/_util/GenerateData";

type EmailFormSchema = z.infer<typeof zEmailFormSchema>;

const FormEmail = ({
  setRenderAction,
  currentPath,
}: {
  setRenderAction: any;
  currentPath: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormSchema>({
    resolver: zodResolver(zEmailFormSchema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      body: "",
    },
  });

  const submit = handleSubmit(async (values) => {
    try {
      const payload = {
        subject: values.subject,
        body: values.body,
        idReceiver: currentPath,
        idEmail: RandomId(),
        status: true,
        createdAt: LocalISOTime(),
      };
      console.log(payload);
      setIsLoading(true);
      const URL = ROUTES_CREATORS.POST({ key: "email", params: currentPath });
      await axios.post(URL, payload);
      reset();
      setIsLoading(false);
      setRenderAction("");
    } catch (err: any) {
      setIsLoading(false);
      if (err.status === 401) {
        if (handleUnauthorized(err, router)) return;
        console.error(err);
      }
    }
  });

  return (
    <div className="overlay">
      <div
        className="
        relative
        w-full max-w-md
        rounded-xl
        bg-black/80
        border border-white/10
        backdrop-blur-md
        p-5
      ">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-200">Send Email</h3>

          <button
            type="button"
            onClick={() => setRenderAction("")}
            className="
            p-1.5
            rounded-lg
            text-gray-400
            hover:text-gray-200
            hover:bg-white/10
          ">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="w-full flex flex-col gap-4">
          {/* Subject */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Subject</label>
            <input
              type="text"
              placeholder="Input your subject email..."
              {...register("subject")}
              required
              className="
              w-full rounded-lg
              bg-white/5
              border border-white/10
              px-4 py-2
              text-gray-200
              outline-none
            "
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-400">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="Input your message..."
              {...register("body")}
              required
              className="
              w-full resize-none rounded-lg
              bg-white/5
              border border-white/10
              px-4 py-2
              text-gray-200
              outline-none
            "
            />
            {errors.body && (
              <p className="mt-1 text-xs text-red-400">{errors.body.message}</p>
            )}
          </div>

          {/* ACTION */}
          <div className="flex justify-end pt-2">
            <button
              disabled={isLoading}
              type="submit"
              className="
              px-4 py-2
              rounded-lg
              bg-white/10
              border border-white/10
              text-gray-200
              font-medium
            ">
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEmail;
