"use client";

import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { creatorsContext, profileContext } from "@/app/context";
import { LocalISOTime } from "@/_util/GenerateData";
import { useRouter } from "next/navigation";
import {
  BiLike,
  BiDislike,
  BiBookmark,
  BiCommentDetail,
  BiInfoCircle,
} from "react-icons/bi";
import { handleUnauthorized } from "@/_util/Unauthorized";
import type { TListCreatorProduct } from "../../../../types/type";
import { showToast } from "@/_util/Toast";
import EmptyProduct from "@/_util/empty-product";

interface ListProductState {
  open: boolean;
  idProduct: null | number;
}

const ImageContainer = ({
  currentPath,
  data,
  setRenderAction,
}: {
  currentPath: string;
  data: TListCreatorProduct[];
  setRenderAction: any;
}) => {
  const {
    fetchNextPageProduct,
    hasNextPageProduct,
    isFetchingNextPageProduct,
    postLikePhoto,
    postBookmarkUser,
    setIdComment,
  } = useContext(creatorsContext);

  const { data: getData } = useContext(profileContext);
  const id = getData?.id;

  const [isOpen, setIsOpen] = useState<ListProductState>({
    open: false,
    idProduct: null,
  });

  const router = useRouter();

  // ? 🔹 ref untuk container scrollable
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ? 🔹 karena root belum ada saat render pertama, set setelah mount
  const [root, setRoot] = useState<Element | null>(null);

  // ? setup observer
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0.2, // ! trigger ketika 20% elemen terlihat
    root,
  });

  useEffect(() => {
    if (inView && hasNextPageProduct && !isFetchingNextPageProduct)
      fetchNextPageProduct();
    setRoot(containerRef.current);
  }, [
    inView,
    fetchNextPageProduct,
    hasNextPageProduct,
    isFetchingNextPageProduct,
  ]);

  const handleAction = useCallback(
    async (
      e: React.SyntheticEvent,
      actionType: string,
      idProduct: number,
      status?: string | null,
      url?: string
    ) => {
      e.preventDefault();
      switch (actionType) {
        case "like":
        case "dislike": {
          if (status === actionType) return;
          try {
            const postData = {
              refIdProduct: idProduct,
              like: actionType === "like" ? 1 : null,
              dislike: actionType === "dislike" ? 1 : null,
              status: actionType,
              createdAt: LocalISOTime(),
            };
            console.log(postData);
            await postLikePhoto(postData);
          } catch (err: any) {
            if (err.status === 401) {
              if (handleUnauthorized(err, router)) return;
              console.error(err);
            }
          }
          break;
        }
        case "description": {
          setIsOpen((prev) => ({
            open: prev.idProduct === idProduct ? false : true,
            idProduct: prev.idProduct === idProduct ? null : idProduct,
          }));
          break;
        }
        case "comment": {
          setIdComment(idProduct);
          const newUrl = `/creators/${currentPath}?view=comment`;
          history.pushState({}, "", newUrl);
          setRenderAction("comment");
          break;
        }
        case "addBookmark":
        case "removeBookmark": {
          try {
            if (id === currentPath) return;
            const payload = {
              idProduct: idProduct,
              status: actionType === "addBookmark" ? true : false,
              typeBookmark: "photo",
              createdAt: LocalISOTime(),
            };
            console.log(payload);
            await postBookmarkUser(payload);
            // showToast({ type: "success", fallback: "Add Bookmark Success!" });
          } catch (err: any) {
            if (err.status === 401) {
              if (handleUnauthorized(err, router)) return;
              console.error(err);
            }
          }
          break;
        }
      }
    },
    [
      postLikePhoto,
      router,
      setIdComment,
      currentPath,
      setRenderAction,
      id,
      postBookmarkUser,
    ]
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex-center flex-wrap gap-4 rounded-md">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((i, idx) => {
          const isLast = idx === data.length - 1;
          return (
            <div
              key={i.idProduct}
              ref={isLast ? lastItemRef : null}
              className="
            relative
            flex
            flex-col
            w-[30%]
            h-90
            overflow-hidden
            rounded-xl
            border border-white/10
          ">
              {/* Image section */}
              <div className="relative w-full h-full">
                <Image
                  src={i.url}
                  alt={i.description}
                  fill
                  sizes="(max-width: 240px) 100vw"
                  className="object-cover"
                />
                {isOpen.open && isOpen.idProduct === i.idProduct && (
                  <div
                    className="flex flex-col gap-1 absolute
                bottom-0 w-full h-auto p-4 items-center justify-center
                bg-black/80
                ">
                    <h1 className="text-sm text-gray-300 line-clamp-3">
                      {i.description}
                    </h1>
                    <div className="flex flex-wrap gap-1.5">
                      {i.category.map((cat: string) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 text-[11px] font-medium rounded-md
                    bg-white/10 text-gray-300 border border-white/10">
                          {cat}
                        </span>
                      ))}
                    </div>

                    {i.hashtag.map((tag: string) => (
                      <span
                        key={tag}
                        className="
                      px-2
                      py-0.5
                      text-[11px]
                      font-medium
                      rounded-md
                      bg-white/5
                      text-gray-400
                      border border-white/10
                  ">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-4 gap-2 h-[10%] w-full">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <button
                    className="flex items-center gap-1"
                    type="button"
                    onClick={(e) =>
                      handleAction(e, "like", i.idProduct, i.status)
                    }>
                    <span className="text-blue-500">
                      <BiLike size={18} />
                    </span>
                    {i.totalLike ?? 0}
                  </button>

                  <button
                    className="flex items-center gap-1"
                    type="button"
                    onClick={(e) =>
                      handleAction(e, "dislike", i.idProduct, i.status)
                    }>
                    <span className="text-gray-500">
                      <BiDislike size={18} />
                    </span>
                    {i.totalDislike ?? 0}
                  </button>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                  <button
                    className="hover:text-white transition"
                    onClick={(e) =>
                      handleAction(e, "description", i.idProduct)
                    }>
                    <BiInfoCircle size={18} />
                  </button>

                  <button
                    className="hover:text-white transition flex items-center gap-1"
                    onClick={(e) =>
                      handleAction(e, "comment", i.idProduct, i.url)
                    }>
                    <BiCommentDetail size={18} />
                    <span className="text-xs">{i.totalComment ?? 0}</span>
                  </button>

                  <button
                    type="button"
                    className={`${
                      i.statusBookmark
                        ? "text-yellow-400"
                        : "hover:text-yellow-400 transition"
                    }`}
                    onClick={(e) =>
                      handleAction(
                        e,
                        `${
                          i.statusBookmark ? "removeBookmark" : "addBookmark"
                        }`,
                        i.idProduct
                      )
                    }>
                    <BiBookmark size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyProduct />
      )}

      {isFetchingNextPageProduct && (
        <div className="w-full flex justify-center py-4 text-gray-400">
          <span>Loading more products...</span>
        </div>
      )}
    </div>
  );
};

export default memo(ImageContainer);
