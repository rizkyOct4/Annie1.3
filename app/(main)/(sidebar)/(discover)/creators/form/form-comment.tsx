import Image from "next/image";

const FormComment = ({ setRenderAction }: { setRenderAction: any }) => {
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

        <div className="flex gap-4 h-[94%]">
          {/* LEFT — PHOTO */}
          <div className="relative w-70 shrink-0 rounded-lg overflow-hidden border border-white/10">
            <Image
              src="/photo/7.webp"
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT — COMMENTS */}
          <div className="flex-1 flex flex-col rounded-lg border border-white/10 bg-white/5">
            {/* COMMENT LIST */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <p className="text-sm text-gray-400">No comments yet.</p>

              <div className="p-3 border-b border-white/10">
                {/* MAIN COMMENT */}
                <p className="text-xs text-gray-400 mb-1">@test</p>
                <p className="text-sm text-gray-200">test1111</p>

                {/* SUB COMMENTS */}
                <div className="mt-3 ml-4 space-y-2 border-l border-white/10 pl-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">@reply_user</p>
                    <p className="text-sm text-gray-300">ini sub comment</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">@reply_user2</p>
                    <p className="text-sm text-gray-300">sub comment kedua</p>
                  </div>
                </div>

                {/* INPUT REPLY */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // handle submit reply
                  }}
                  className="mt-3 ml-4 flex items-center gap-2">
                  <input
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

            {/* INPUT — FIXED BOTTOM */}
            <form
              className="
                border-t border-white/10
                p-3
                flex items-center gap-2
              ">
              <input
                name="message"
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
