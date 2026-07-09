export default function Button({ children, variant = "primary", className = "", loading = false, ...props }) {
  const styles = {
    primary: "premium-button",
    secondary: "bg-[var(--secondary)] hover:bg-[var(--accent)] text-[var(--secondary-foreground)] px-6 py-2.5 rounded-xl font-semibold transition-all",
    outline: "border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] px-6 py-2.5 rounded-xl font-semibold transition-all",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${styles[variant] || styles.primary} ${className} relative flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:pointer-events-none transition-all duration-200`}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      )}
      <span className={loading ? "opacity-0" : "opacity-100"}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          {typeof loading === 'string' ? loading : 'Processing...'}
        </span>
      )}
    </button>
  );
}