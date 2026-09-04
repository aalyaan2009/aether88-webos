import { useState } from "react";
import {
  Globe,
  ExternalLink,
  ArrowRight,
  Bookmark,
} from "lucide-react";

export default function Browser() {
  const [url, setUrl] = useState("https://google.com");

  const bookmarks = [
    { name: "Google", url: "https://google.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Wikipedia", url: "https://wikipedia.org" },
    { name: "StackOverflow", url: "https://stackoverflow.com" },
    { name: "DuckDuckGo", url: "https://duckduckgo.com" },
  ];

  const handleNavigate = (e) => {
    if (e) {
      e.preventDefault();
    }

    let input = url.trim();

    if (!input) {
      return;
    }

    let link = input;

    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      if (input.includes(".")) {
        link = "https://" + input;
      } else {
        link =
          "https://www.google.com/search?q=" +
          encodeURIComponent(input);
      }
    }

    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="h-full flex flex-col p-4 font-system select-text"
      style={{ color: "var(--ink)" }}
    >
      <form onSubmit={handleNavigate} className="flex gap-2 mb-4">
        <div
          className="flex-1 flex items-center gap-2 border px-3 py-1.5 rounded-lg bg-[var(--paper)]"
          style={{ borderColor: "var(--border-color)" }}
        >
          <Globe size={14} className="opacity-50" />

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Search Web or Enter URL..."
            className="flex-1 bg-transparent text-xs outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-3 py-1.5 border text-xs flex items-center gap-1 rounded-lg hover:bg-[var(--accent)] hover:text-white transition-colors"
          style={{ borderColor: "var(--border-color)" }}
        >
          <span>Go</span>
          <ArrowRight size={12} />
        </button>
      </form>

      <div
        className="flex-1 border border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Globe size={36} className="opacity-40 animate-pulse" />

        <h3 className="text-sm font-bold tracking-wider uppercase">
          External Web Gateway
        </h3>

        <p className="text-xs opacity-70 max-w-sm leading-relaxed">
          To bypass browser iframe block rules, navigation redirects external
          sites directly to a clean target tab.
        </p>

        <button
          onClick={handleNavigate}
          className="mt-2 px-4 py-2 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span>Open Destination Tab</span>
          <ExternalLink size={14} />
        </button>
      </div>

      <div
        className="mt-4 pt-3 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider opacity-60 mb-2">
          <Bookmark size={12} />
          Quick Links
        </div>

        <div className="flex flex-wrap gap-2">
          {bookmarks.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setUrl(item.url);
                window.open(item.url, "_blank", "noopener,noreferrer");
              }}
              className="px-2.5 py-1 border text-[11px] rounded-md hover:bg-[var(--accent)] hover:text-white transition-colors"
              style={{ borderColor: "var(--border-color)" }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

