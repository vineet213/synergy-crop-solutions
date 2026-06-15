export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "button-base";
  const style = variant === "secondary" ? "button-secondary" : "button-primary";
  return (
    <button className={`${base} ${style} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
