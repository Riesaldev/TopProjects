
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
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
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105 active:scale-95";
  
  const sizeStyles = {
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
    xl: "px-10 py-5 text-xl gap-3"
  };
  
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary-600 to-primary-700 
      text-white 
      hover:from-primary-700 hover:to-primary-800 
      focus:ring-primary-200 
      shadow-lg hover:shadow-xl hover:shadow-primary-500/25
      border border-primary-600
    `,
    secondary: `
      bg-gradient-to-r from-secondary-500 to-secondary-600 
      text-white 
      hover:from-secondary-600 hover:to-secondary-700 
      focus:ring-secondary-200 
      shadow-lg hover:shadow-xl
      border border-secondary-500
    `,
    outline: `
      border-2 border-primary-600 
      text-primary-600 
      hover:bg-primary-600 hover:text-white 
      focus:ring-primary-200 
      bg-transparent
      shadow-sm hover:shadow-lg
    `,
    ghost: `
      text-gray-700 
      hover:bg-primary-50 
      focus:ring-primary-200 
      bg-transparent
      border border-transparent
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 
      text-white 
      hover:from-red-600 hover:to-red-700 
      focus:ring-red-200 
      shadow-lg hover:shadow-xl hover:shadow-red-500/25
      border border-red-500
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
    <button 
      className={combinedClassName} 
      disabled={disabled || isLoading}
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
        </div>
      )}
    </button>
  );
}