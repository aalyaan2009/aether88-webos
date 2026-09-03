import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Notes() {
  const [notes, setNotes] = useLocalStorage("aether-notes", "");

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-system text-[9px] uppercase tracking-[.2em] opacity-50">
            Personal workspace
          </p>

          <h2 className="font-editorial text-3xl font-black uppercase">
            Notes
          </h2>
        </div>

        <span className="font-system text-[9px] opacity-50">
          AUTOSAVED
        </span>
      </div>

      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Begin writing..."
        className="flex-1 w-full resize-none border border-current bg-transparent p-5 outline-none font-editorial text-lg leading-relaxed"
      />

      <div className="mt-2 font-system text-[9px] opacity-50">
        {notes.length} CHARACTERS
      </div>
    </div>
  );
}