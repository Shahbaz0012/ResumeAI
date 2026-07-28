import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.06]
          px-5
          py-4
          text-white
          placeholder:text-gray-500
          backdrop-blur-3xl
          outline-none
          transition-all
          duration-300
          focus:border-cyan-400
          focus:ring-4
          focus:ring-cyan-500/20
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;