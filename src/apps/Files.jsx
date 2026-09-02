import { File, Folder } from "lucide-react";

const demoFiles = [
  { name: "Documents", type: "folder" },
  { name: "Downloads", type: "folder" },
  { name: "Pictures", type: "folder" },
  { name: "welcome.txt", type: "file" },
  { name: "system.log", type: "file" }
];

export default function Files() {
  return (
    <div>
      <div className="mb-5">
        <p className="font-system text-[9px] uppercase tracking-[.2em] opacity-50">
          Local filesystem
        </p>

        <h2 className="font-editorial text-3xl font-black uppercase">
          Files
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {demoFiles.map((item) => (
          <button
            key={item.name}
            className="border p-5 text-left hover:bg-[#c85a32] hover:text-white transition"
          >
            {item.type === "folder" ? <Folder /> : <File />}

            <div className="mt-4 font-system text-[10px] uppercase">
              {item.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}