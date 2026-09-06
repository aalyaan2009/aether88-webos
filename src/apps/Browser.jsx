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

  function handleNavigate(e) {
    if (e) {
      e.preventDefault();
    }

    const input = url.trim();

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
  }

  return (
    <div
      className="h-full flex flex-col p-4 font-sans text-xs select-text"
      style={{ color: "var(--text-primary)" }}
    >
      
      <form onSubmit={handleNavigate} className="flex gap-2 mb-4">
        <div
          className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border transition-colors"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <Globe
            size={14}
            className="shrink-0 opacity-50"
            style={{ color: "var(--text-secondary)" }}
          />

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Search web or enter URL..."
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: "var(--text-primary)" }}
            onFocus={(e) =>
              (e.currentTarget.parentElement.style.borderColor =
                "var(--border-strong)")
            }
            onBlur={(e) =>
              (e.currentTarget.parentElement.style.borderColor =
                "var(--border-subtle)")
            }
          />
        </div>

        <button
          type="submit"
          className="px-3 py-1.5 text-xs flex items-center gap-1.5 rounded-[var(--radius-sm)] font-medium transition-colors border cursor-pointer"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
            color: "var(--text-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-surface)";
          }}
        >
          <span>Go</span>
          <ArrowRight size={13} />
        </button>
      </form>

      
      <div
        className="flex-1 rounded-[var(--radius-md)] p-6 flex flex-col items-center justify-center text-center gap-3 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center border shrink-0"
          style={{
            backgroundColor: "var(--bg-window)",
            borderColor: "var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          <Globe size={22} />
        </div>

        <div className="space-y-1 max-w-sm">
          <h3
            className="text-sm font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            External Page Navigation
          </h3>

          <p
            className="text-xs leading-relaxed opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            Websites open in a new tab to bypass iframe security restrictions and maintain optimal site functionality.
          </p>
        </div>

        <button
          onClick={handleNavigate}
          className="mt-1 px-4 py-2 text-white text-xs font-medium rounded-[var(--radius-sm)] flex items-center gap-2 transition-opacity cursor-pointer"
          style={{ backgroundColor: "var(--accent)" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span>Open in new tab</span>
          <ExternalLink size={13} />
        </button>
      </div>

     
      <div
        className="mt-4 pt-3 border-t"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div
          className="flex items-center gap-1.5 text-xs font-medium mb-2.5 opacity-70"
          style={{ color: "var(--text-secondary)" }}
        >
          <Bookmark size={13} />
          <span>Quick Links</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {bookmarks.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setUrl(item.url);
                window.open(item.url, "_blank", "noopener,noreferrer");
              }}
              className="px-3 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-colors cursor-pointer"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "transparent",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--bg-surface-hover)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}