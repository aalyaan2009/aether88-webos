import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Notes() {
  const [notes, setNotes] =
    useLocalStorage(
      "aether-notes",
      ""
    );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-system text-[9px] uppercase tracking-[.2em] opacity-50">
            Personal workspace
          </p>

          <h2 className="font-editorial text-3xl font-black uppercase">
            Notes
          </h2>
        </div>

        <div className="font-system text-[9px] opacity-50">
          AUTOSAVED
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        placeholder="Begin writing..."
        className="
          flex-1
          w-full
          resize-none
          border
          border-current
          bg-transparent
          p-5
          outline-none
          font-editorial
          text-lg
          leading-relaxed
        "
      />

      <div className="font-system text-[9px] opacity-50 mt-2">
        {notes.length} CHARACTERS
      </div>
    </div>
  );
}