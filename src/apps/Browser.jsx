import { useState } from "react";

export default function Browser() {
  const [url, setUrl] =
    useState("https://example.com");

  const [page, setPage] =
    useState("https://example.com");

  const navigate = (e) => {
    e.preventDefault();

    let target = url.trim();

    if (
      !target.startsWith("http://") &&
      !target.startsWith("https://")
    ) {
      target =
        "https://" + target;
    }

    setPage(target);
  };

  return (
    <div className="h-full flex flex-col">
      <form
        onSubmit={navigate}
        className="flex gap-2 mb-3"
      >
        <input
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          className="
            flex-1
            border
            px-3
            py-2
            bg-transparent
            font-system
            text-xs
          "
        />

        <button
          className="
            px-4
            bg-[#c85a32]
            text-white
            font-system
            text-xs
            uppercase
          "
        >
          Go
        </button>
      </form>

      <div className="
        flex-1
        border
        overflow-hidden
        bg-white
      ">
        <iframe
          src={page}
          title="AETHER Browser"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}