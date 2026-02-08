import  { forwardRef } from "react";
import { motion } from "framer-motion";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "outlined" | "filled";
  fullWidth?: boolean;
  animation?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = "default",
  fullWidth = false,
  animation = true,
  className = "",
  ...props
}, ref) => {
  const baseInputStyles = "transition-all duration-300 focus:outline-none";
  
  const variantStyles = {
    default: `
      border-2 border-gray-200 rounded-xl px-4 py-3
      bg-gray-50 focus:bg-white focus:border-primary-500
      focus:ring-2 focus:ring-primary-500
      hover:border-gray-300
    `,
    outlined: `
      border-2 border-gray-300 rounded-xl px-4 py-3
      bg-transparent focus:border-primary-500
      focus:ring-2 focus:ring-primary-500
      hover:border-gray-400
    `,
    filled: `
      border-0 rounded-xl px-4 py-3
      bg-gray-100 focus:bg-gray-50
      focus:ring-2 focus:ring-primary-500
    `
  };
  
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "";
  const widthStyles = fullWidth ? "w-full" : "";
  const iconPadding = leftIcon ? "pl-11" : rightIcon ? "pr-11" : "";
  
  const inputClassName = `
    ${baseInputStyles}
    ${variantStyles[variant]}
    ${errorStyles}
    ${widthStyles}
    ${iconPadding}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const containerClassName = fullWidth ? "w-full" : "";

  const InputComponent = (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClassName}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-accent-600 font-medium">
              {error}
            </p>
          )}
          {!error && helperText && (
            <p className="text-sm text-gray-500">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (animation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {InputComponent}
      </motion.div>
    );
  }

  return InputComponent;
});

Input.displayName = "Input";

export default Input;
