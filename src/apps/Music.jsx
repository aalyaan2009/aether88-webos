import { useMemo, useState } from "react";

const tracks = [
  { title: "Neon Drift", artist: "AETHER FM", duration: "3:42" },
  { title: "Static Bloom", artist: "Signal Bloom", duration: "4:18" },
  { title: "Afterglow Circuit", artist: "Chrome Harbor", duration: "5:04" }
];

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState(0);

  const track = useMemo(() => tracks[currentTrack], [currentTrack]);

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="border p-5">
        <div className="font-system text-[9px] uppercase tracking-[0.25em] opacity-50">
          Media deck
        </div>
        <div className="mt-3 font-editorial text-4xl font-black uppercase">
          {track.title}
        </div>
        <div className="mt-2 font-system text-[10px] uppercase tracking-[0.2em] opacity-70">
          {track.artist}
        </div>
      </div>

      <div className="border p-4">
        <div className="mb-3 flex items-center justify-between font-system text-[9px] uppercase tracking-[0.2em] opacity-60">
          <span>Now playing</span>
          <span>{track.duration}</span>
        </div>

        <div className="h-2 w-full overflow-hidden border">
          <div className="h-full w-2/3 bg-[#c85a32]" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentTrack((current) => (current === 0 ? tracks.length - 1 : current - 1))}
            className="border px-3 py-2 font-system text-[9px] uppercase tracking-[0.2em] hover:bg-[#c85a32] hover:text-white"
          >
            Prev
          </button>

          <button
            onClick={() => setCurrentTrack((current) => (current + 1) % tracks.length)}
            className="border bg-[#c85a32] px-4 py-2 font-system text-[9px] uppercase tracking-[0.2em] text-white"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {tracks.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setCurrentTrack(index)}
            className={`flex items-center justify-between border px-3 py-2 text-left font-system text-[10px] uppercase tracking-[0.15em] transition ${
              index === currentTrack ? "bg-[#c85a32] text-white" : "hover:bg-[#171717]/5"
            }`}
          >
            <span>{item.title}</span>
            <span>{item.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
