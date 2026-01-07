"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { zCommentFormSchema } from "../@modal/(.)/[id]/z-schema";
import { handleUnauthorized } from "@/_util/Unauthorized";
import { useContext, useState, useCallback } from "react";
import { creatorsContext } from "@/app/context";
import { RandomId, LocalISOTime } from "@/_util/GenerateData";
import { useRouter } from "next/navigation";

type CommentFormSchema = z.infer<typeof zCommentFormSchema>;

interface IFormState {
  open: boolean;
  idComment: number | null;
  openReply: boolean;
}

const FormComment = ({
  setRenderAction,
  currentPath,
  data,
  subData,
}: {
  setRenderAction: any;
  currentPath: string;
  data: any[];
  subData: any[];
}) => {
  const router = useRouter();

  const { idComment, setIdComment, setIdSubComment, postCommentUser } =
    useContext(creatorsContext);

  const [isOpen, setIsOpen] = useState<IFormState>({
    open: false,
    idComment: null,
    openReply: false,
  });

  // console.log(subData)

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

  const handleAction = useCallback(
    (actionType: string, idComment: number) => {
      switch (actionType) {
        case "openReply": {
          setIsOpen((prev) => ({
            ...prev,
            open: prev.idComment === idComment ? false : true,
            idComment: prev.idComment === idComment ? null : idComment,
            openReply: prev.idComment === idComment ? false : true,
          }));
          setIdSubComment(idComment);
          break;
        }
      }
    },
    [setIdSubComment]
  );

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
      // console.log(`Reply: `, values.bodyReply);
      const payload = {
        refIdComment: values.idComment,
        idSubComment: RandomId(),
        refIdReceiver: currentPath,
        body: values.bodyReply,
        typeComment: "sub_comment",
        createdAt: LocalISOTime(),
      };
      console.log(payload)
      // console.log(payload);
      setIsLoading(true);
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
              {Array.isArray(data) && data.length > 0 ? (
                data.map((i: any) => (
                  <div
                    className="p-3 border-b border-white/10"
                    key={i.idComment}>
                    <div className="flex gap-3">
                      {/* CONTENT */}
                      <div className="flex flex-col flex-1 gap-1">
                        <p className="text-xs text-gray-400">{i.username}</p>

                        <p className="text-sm text-gray-200 leading-relaxed">
                          {i.body}
                        </p>

                        {/* ACTION BAR */}
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleAction("openReply", i.idComment)
                            }
                            className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
                            View replies {i.totalComment}
                          </button>
                        </div>
                        {/* // ? SUB comment */}
                        <div
                          className={`ml-4 space-y-3 border-l ${
                            isOpen.idComment === i.idComment
                              ? "border-emerald-500"
                              : "border-white/10"
                          } pl-4`}>
                          {isOpen &&
                            isOpen.idComment === i.idComment &&
                            isOpen.openReply && (
                              <>
                                {Array.isArray(subData) && subData.length > 0
                                  ? subData.map((s) => (
                                      <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-0.5">
                                          {s.username}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                          {s.body}
                                        </p>
                                      </div>
                                    ))
                                  : null}
                                <form
                                  onSubmit={replySubmit}
                                  className="flex items-center gap-2 pt-1">
                                  <input
                                    type="hidden"
                                    value={i.idComment}
                                    {...register("idComment", {
                                      valueAsNumber: true,
                                    })}
                                  />
                                  <input
                                    {...register("bodyReply")}
                                    placeholder="Reply..."
                                    className="flex-1 rounded-md bg-white/5 border border-white/10
                                  px-3 py-1.5 text-sm text-gray-200 outline-none"
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
                              </>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No comments yet.</p>
              )}
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
