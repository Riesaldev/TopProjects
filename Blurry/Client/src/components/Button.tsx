
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gamified";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
};

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 overflow-hidden disabled:cursor-not-allowed disabled:opacity-45 disabled:saturate-50 disabled:shadow-none disabled:ring-0";
  
  const sizeStyles = {
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
    xl: "px-10 py-5 text-xl gap-3"
  };
  
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600 
      text-white 
      hover:from-primary-600 hover:to-primary-700 
      focus:ring-primary-200 
      shadow-lg hover:shadow-xl hover:shadow-primary-500/25
      border border-transparent
    `,
    secondary: `
      bg-gradient-to-r from-secondary-500 to-secondary-600 
      text-white 
      hover:from-secondary-600 hover:to-secondary-700 
      focus:ring-secondary-200 
      shadow-lg hover:shadow-xl hover:shadow-secondary-500/25
      border border-transparent
    `,
    gamified: `
      bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 
      text-white text-shadow-sm
      border-b-4 border-orange-600 active:border-b-0
      shadow-[0_0_15px_rgba(251,191,36,0.5)] 
      hover:shadow-[0_0_25px_rgba(251,191,36,0.8)]
    `,
    outline: `
      border-2 border-primary-500 
      text-primary-600 
      hover:bg-primary-50 hover:text-primary-700 
      focus:ring-primary-200 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/40
      bg-transparent
      shadow-sm hover:shadow-md
    `,
    ghost: `
      text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800 
      focus:ring-gray-200 dark:focus:ring-gray-700
      bg-transparent
      border border-transparent
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 
      text-white 
      hover:from-red-600 hover:to-red-700 
      focus:ring-red-200 
      shadow-lg hover:shadow-xl hover:shadow-red-500/25
      border border-transparent
    `
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  const combinedClassName = `
    ${baseStyles} 
    ${sizeStyles[size]} 
    ${variantStyles[variant]} 
    ${widthClass}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <motion.button 
      className={combinedClassName} 
      disabled={disabled || isLoading}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {leftIcon && !isLoading && (
        <span className="flex-shrink-0">
          {leftIcon}
        </span>
      )}
      
      {isLoading && (
        <div className="flex-shrink-0">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <span className={isLoading ? "opacity-75" : ""}>
        {isLoading ? "Cargando..." : children}
      </span>
      
      {rightIcon && !isLoading && (
        <span className="flex-shrink-0">
          {rightIcon}
        </span>
      )}
      
      {/* Shine effect overlay */}
      {!disabled && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
        </div>
      )}
    </motion.button>
  );
}