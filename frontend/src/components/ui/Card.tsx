import React, { forwardRef, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-2xl
          p-6
          shadow-lg
          hover:shadow-2xl
          transition-all duration-300
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default React.memo(Card);