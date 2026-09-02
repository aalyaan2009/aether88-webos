export default function GenericApp({ app }) {
  return (
    <div className="h-full">
      <div className="mb-8">
        <p className="font-system text-[9px] uppercase tracking-[.25em] text-[#c85a32]">
          AETHER APPLICATION
        </p>

        <h1 className="font-editorial text-5xl font-black uppercase mt-2">
          {app.name}
        </h1>

        <p className="mt-3 text-sm opacity-60 max-w-xl">
          {app.name} is part of the AETHER browser operating environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-5 hard-shadow-small">
          <div className="font-system text-[9px] uppercase opacity-50">
            STATUS
          </div>

          <div className="mt-3 font-editorial text-2xl font-bold">
            READY
          </div>
        </div>

        <div className="border p-5 hard-shadow-small">
          <div className="font-system text-[9px] uppercase opacity-50">
            MODULE
          </div>

          <div className="mt-3 font-editorial text-2xl font-bold">
            {app.category}
          </div>
        </div>

        <div className="border p-5 hard-shadow-small">
          <div className="font-system text-[9px] uppercase opacity-50">
            VERSION
          </div>

          <div className="mt-3 font-editorial text-2xl font-bold">
            1.0
          </div>
        </div>
      </div>

      <div className="border mt-6 p-8 min-h-64 flex items-center justify-center text-center">
        <div>
          <div className="font-editorial text-3xl uppercase font-black">
            Workspace Ready
          </div>

          <p className="font-system text-[10px] uppercase tracking-widest opacity-50 mt-3">
            This module is initialized.
          </p>
        </div>
      </div>
    </div>
  );
}