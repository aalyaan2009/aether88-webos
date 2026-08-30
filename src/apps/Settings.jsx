export default function Settings({
  dark,
  setDark
}) {
  return (
    <div className="max-w-2xl">
      <p className="
        font-system
        text-[9px]
        uppercase
        tracking-[.2em]
        opacity-50
      ">
        AETHER CONTROL CENTER
      </p>

      <h2 className="
        font-editorial
        text-4xl
        font-black
        uppercase
        mb-8
      ">
        Settings
      </h2>

      <section className="
        border
        p-5
        flex
        items-center
        justify-between
      ">
        <div>
          <h3 className="font-editorial font-bold uppercase">
            Appearance
          </h3>

          <p className="text-sm opacity-60 mt-1">
            Switch between the paper and charcoal interfaces.
          </p>
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="
            bg-[#c85a32]
            text-white
            px-4
            py-2
            font-system
            text-xs
            uppercase
          "
        >
          {dark
            ? "Light Mode"
            : "Dark Mode"}
        </button>
      </section>

      <section className="
        border
        p-5
        mt-4
      ">
        <div className="
          font-system
          text-[9px]
          uppercase
          tracking-widest
          opacity-50
        ">
          System
        </div>

        <div className="
          grid
          grid-cols-3
          gap-4
          mt-4
          text-center
        ">
          <div>
            <strong className="text-2xl">
              45
            </strong>

            <div className="text-[9px] uppercase opacity-50">
              Apps
            </div>
          </div>

          <div>
            <strong className="text-2xl">
              1.0
            </strong>

            <div className="text-[9px] uppercase opacity-50">
              Version
            </div>
          </div>

          <div>
            <strong className="text-2xl text-[#c85a32]">
              ●
            </strong>

            <div className="text-[9px] uppercase opacity-50">
              Online
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}