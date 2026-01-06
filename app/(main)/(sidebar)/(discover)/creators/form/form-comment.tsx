"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { zCommentFormSchema } from "../@modal/(.)/[id]/z-schema";
import { handleUnauthorized } from "@/_util/Unauthorized";
import { useContext, useState } from "react";
import { creatorsContext } from "@/app/context";
import { RandomId, LocalISOTime } from "@/_util/GenerateData";
import { useRouter } from "next/navigation";

type CommentFormSchema = z.infer<typeof zCommentFormSchema>;

const FormComment = ({
  setRenderAction,
  currentPath,
}: {
  setRenderAction: any;
  currentPath: string;
}) => {
  const router = useRouter();

  const { idComment, setIdComment, postCommentUser, listCreatorProductDataComment } =
    useContext(creatorsContext);

  console.log(listCreatorProductDataComment)


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormSchema>({
    resolver: zodResolver(zCommentFormSchema),
    mode: "onChange",
    defaultValues: {
      body: "",
      bodyReply: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const newSubmit = handleSubmit(async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        refIdProduct: idComment,
        idComment: RandomId(),
        refIdReceiver: currentPath,
        body: values.body,
        typeComment: "comment",
        createdAt: LocalISOTime(),
      };
      console.log(payload);

      await postCommentUser(payload);
      setIsLoading(false);
      reset();
    } catch (err: any) {
      setIsLoading(false);
      if (err.status === 401) {
        if (handleUnauthorized(err, router)) return;
        console.error(err);
      }
    }
  });

  const replySubmit = handleSubmit(async (values) => {
    try {
      console.log(`Reply: `, values.bodyReply);

      // const payload = {
      //   subject: values.subject,
      //   body: values.body,
      //   idReceiver: currentPath,
      //   idEmail: RandomId(),
      //   status: true,
      //   createdAt: LocalISOTime(),
      // };
      // console.log(payload);
      // setIsLoading(true);
      // const URL = ROUTES_CREATORS.POST({ key: "email", params: currentPath });
      // await axios.post(URL, payload);
      // reset();
      // setIsLoading(false);
      // setRenderAction("");
    } catch (err: any) {
      // setIsLoading(false);
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
          w-250
          rounded-xl
          bg-black/80
          border border-white/10
          backdrop-blur-md
          h-180
          p-4
        ">
        <div className="flex items-center justify-between h-[6%]">
          <h3 className="text-sm font-semibold text-gray-200">Comments</h3>

          <button
            type="button"
            onClick={() => {
              const newUrl = `/creators/${currentPath}`;
              history.pushState({}, "", newUrl);
              setIdComment(null);
              setRenderAction("");
            }}
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

        <div className="flex gap-4 h-[94%]">
          <div className="relative w-70 shrink-0 rounded-lg overflow-hidden border border-white/10">
            <Image
              src="/photo/7.webp"
              alt="Preview"
              fill
              sizes="(max-width: 240px) 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col rounded-lg border border-white/10 bg-white/5">
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {/* <p className="text-sm text-gray-400">No comments yet.</p> */}
              <div className="p-3 border-b border-white/10">
                <div className="flex gap-3">
                  <div className="flex flex-col flex-1">
                    <p className="text-xs text-gray-400">@test</p>
                    <p className="text-sm text-gray-200">test1111</p>

                    <div className="mt-3 ml-4 space-y-2 border-l border-emerald-500 pl-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">
                          @reply_user
                        </p>
                        <p className="text-sm text-gray-300">ini sub comment</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">
                          @reply_user2
                        </p>
                        <p className="text-sm text-gray-300">
                          sub comment kedua
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={replySubmit}
                      className="mt-3 ml-4 flex items-center gap-2">
                      <input
                        {...register("bodyReply")}
                        placeholder="Reply..."
                        className="
            flex-1
            rounded-md
            bg-white/5
            border border-white/10
            px-3 py-1.5
            text-sm text-gray-200
            outline-none
          "
                      />

                      <button
                        disabled={isLoading}
                        type="submit"
                        className="
            px-3 py-1.5
            rounded-md
            bg-white/10
            border border-white/10
            text-xs
            text-gray-200
            hover:bg-white/20
          ">
                        Reply
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <form className="p-3 flex items-center gap-2" onSubmit={newSubmit}>
              <input
                {...register("body")}
                placeholder="Write a comment..."
                className="
                  flex-1
                  rounded-lg
                  bg-white/5
                  border border-white/10
                  px-3 py-2
                  text-sm text-gray-200
                  outline-none
                "
              />

              <button
                disabled={isLoading}
                type="submit"
                className="
                  px-4 py-2
                  rounded-lg
                  bg-white/10
                  border border-white/10
                  text-sm font-medium
                  text-gray-200
                  hover:bg-white/20
                ">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComment;
