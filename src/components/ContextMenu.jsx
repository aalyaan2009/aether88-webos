export default function ContextMenu({ children, className = "" }) {
  return (
    <div
      className={`absolute z-40 border bg-[var(--paper)] p-2 text-xs ${className}`}
    >
      {children}
    </div>
  );
}
