"use client"

type EmptyProductProps = {
  title?: string;
  description?: string;
};

const EmptyProduct = ({
  title = "No content yet",
  description = "Maybe soon gonna be something here.",
}: EmptyProductProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center gap-3">
      {/* ICON */}
      <div
        className="
          w-16 h-16
          rounded-full
          bg-white/5
          border border-white/10
          flex items-center justify-center
          text-2xl text-gray-400
        "
      >
        {"📭"}
      </div>

      {/* TEXT */}
      <div className="space-y-1">
        <p className="text-sm text-gray-200 font-medium">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default EmptyProduct;
