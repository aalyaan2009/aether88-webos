import { useState, useMemo } from "react";
import { Plus, Search, Trash2, FileText, Check } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Notes() {
  const [rawNotes, setNotes] = useLocalStorage("aether-notes", [
    {
      id: "note-1",
      title: "Welcome to Notes",
      content: "Begin writing...",
      updatedAt: Date.now(),
    },
  ]);

  
  const notes = useMemo(() => {
    if (Array.isArray(rawNotes)) {
      return rawNotes;
    }

    if (typeof rawNotes === "string") {
      let title = "Untitled Note";
      if (rawNotes.trim()) {
        title = rawNotes.split("\n")[0].slice(0, 24);
      }

      return [
        {
          id: "legacy-1",
          title: title,
          content: rawNotes || "Begin writing...",
          updatedAt: Date.now(),
        },
      ];
    }

    return [];
  }, [rawNotes]);

  const [activeId, setActiveId] = useState(() => notes[0]?.id || null);
  const [search, setSearch] = useState("");

  const activeNote = notes.find((item) => item.id === activeId) || notes[0];

  function handleUpdate(content) {
    if (!activeNote) {
      return;
    }

    const firstLine = content.trim().split("\n")[0].replace(/^#+\s*/, "");
    let updatedTitle = "Untitled Note";
    if (firstLine) {
      updatedTitle = firstLine.slice(0, 28);
    }

    const updated = notes.map((item) => {
      if (item.id === activeNote.id) {
        return {
          ...item,
          content: content,
          title: updatedTitle,
          updatedAt: Date.now(),
        };
      }
      return item;
    });

    setNotes(updated);
  }

  function handleCreate() {
    const newNote = {
      id: `note-${Date.now()}`,
      title: "New Note",
      content: "",
      updatedAt: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveId(newNote.id);
  }

  function handleDelete(id, e) {
    e.stopPropagation();

    const filtered = notes.filter((item) => item.id !== id);
    setNotes(filtered);

    if (activeId === id) {
      setActiveId(filtered[0]?.id || null);
    }
  }

  const q = search.toLowerCase();
  const filteredNotes = notes.filter((item) => {
    const inTitle = item.title.toLowerCase().includes(q);
    const inContent = item.content.toLowerCase().includes(q);
    return inTitle || inContent;
  });

  function formatTime(timestamp) {
    if (!timestamp) {
      return "";
    }

    const diff = Math.floor((Date.now() - timestamp) / 1000);

    if (diff < 60) {
      return "Just now";
    }
    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m ago`;
    }
    if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h ago`;
    }

    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div
      className="h-full flex overflow-hidden font-sans text-xs select-text"
      style={{ color: "var(--text-primary)" }}
    >
      {/* sidebar */}
      <div
        className="w-56 shrink-0 border-r flex flex-col"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div
          className="p-3 space-y-2 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Notes
            </span>
            <button
              onClick={handleCreate}
              className="w-5 h-5 flex items-center justify-center rounded-[var(--radius-xs)] transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              title="New Note"
            >
              <Plus size={13} />
            </button>
          </div>

          <div className="relative">
            <Search
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50"
              style={{ color: "var(--text-secondary)" }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full py-1.5 pl-8 pr-2 text-[11px] rounded-[var(--radius-xs)] outline-none border transition-colors"
              style={{
                backgroundColor: "var(--bg-window)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--border-strong)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--border-subtle)")
              }
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
          {filteredNotes.length === 0 ? (
            <div
              className="p-4 text-center text-[11px] opacity-60"
              style={{ color: "var(--text-secondary)" }}
            >
              No notes found
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isActive = activeNote?.id === note.id;
              const previewText =
                note.content.trim().split("\n").slice(1).join(" ") ||
                note.content ||
                "Empty note";

              return (
                <div
                  key={note.id}
                  onClick={() => setActiveId(note.id)}
                  className="group relative p-2 rounded-[var(--radius-sm)] cursor-pointer transition-colors"
                  style={{
                    backgroundColor: isActive
                      ? "var(--bg-surface-hover)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "var(--bg-surface-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span
                      className="font-medium text-xs truncate flex-1"
                      style={{
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {note.title || "Untitled Note"}
                    </span>
                    <button
                      onClick={(e) => handleDelete(note.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded transition-opacity"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--destructive)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-muted)")
                      }
                      title="Delete Note"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div
                    className="text-[11px] truncate mt-0.5 opacity-70"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {previewText}
                  </div>
                  <div
                    className="text-[10px] mt-1 opacity-50"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formatTime(note.updatedAt)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      
      {activeNote ? (
        <div className="flex-1 flex flex-col bg-transparent">
          <div
            className="h-9 px-4 flex items-center justify-between border-b shrink-0"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex items-center gap-2 text-[11px] opacity-60">
              <FileText size={13} />
              <span>{activeNote.title || "Untitled"}</span>
            </div>

            <div className="flex items-center gap-3 text-[10px] opacity-60">
              <span className="flex items-center gap-1">
                <Check size={11} style={{ color: "var(--accent)" }} /> Autosaved
              </span>
              <span>•</span>
              <span>{activeNote.content.length} characters</span>
            </div>
          </div>

          <textarea
            value={activeNote.content}
            onChange={(e) => handleUpdate(e.target.value)}
            placeholder="Begin writing..."
            className="flex-1 w-full resize-none p-5 outline-none bg-transparent font-sans text-xs leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      ) : (
        <div
          className="flex-1 flex items-center justify-center text-xs opacity-50"
          style={{ color: "var(--text-secondary)" }}
        >
          Select or create a note to begin editing.
        </div>
      )}
    </div>
  );
}