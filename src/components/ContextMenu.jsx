export default function ContextMenu({ children, className = "" }) {
  const menuClasses = `absolute z-40 border bg-[var(--paper)] p-2 text-xs ${className}`;

  return <div className={menuClasses}>{children}</div>;
}