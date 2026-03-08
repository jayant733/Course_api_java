import React, { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const variantStyles = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white",
  secondary:
    "bg-white/10 border border-white/10 hover:bg-white/20 text-white",
  danger:
    "bg-red-500/10 border border-red-400/20 hover:bg-red-500/20 text-red-400",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", variant = "primary", loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          px-6 py-3 rounded-xl font-semibold
          transition-all duration-200
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default React.memo(Button);