import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "glass" | "gradient" | "bordered";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
  animation?: boolean;
};

export default function Card({
  children,
  variant = "default",
  padding = "md",
  shadow = "md",
  hover = false,
  className = "",
  onClick,
  animation = true
}: CardProps) {
  const baseStyles = "border-radius-xl transition-all duration-300";
  
  const variantStyles = {
    default: "bg-white border border-secondary-100",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20",
    gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 border border-secondary-100",
    bordered: "bg-white border-2 border-primary-200"
  };
  
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };
  
  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-lg",
    lg: "shadow-xl",
    xl: "shadow-2xl"
  };
  
  const hoverStyles = hover ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "";
  const clickableStyles = onClick ? "cursor-pointer" : "";
  
  const combinedClassName = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${paddingStyles[padding]} 
    ${shadowStyles[shadow]} 
    ${hoverStyles}
    ${clickableStyles}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  if (animation) {
    return (
      <motion.div
        className={combinedClassName}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -4 } : {}}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClassName} onClick={onClick}>
      {children}
    </div>
  );
}
