import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "glass" | "gradient" | "bordered" | "gamified";
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
  animation = true,
}: CardProps) {
  const baseStyles =
    "rounded-2xl transition-all duration-300 relative overflow-hidden";

  const variantStyles = {
    default:
      "bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800",
    glass: "glass-card",
    gradient:
      "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 border border-secondary-100 dark:border-secondary-800",
    bordered:
      "bg-white dark:bg-zinc-900 border-2 border-primary-200 dark:border-primary-800",
    gamified:
      "bg-gradient-to-b from-gray-900 to-black border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white",
  };

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const hoverStyles = hover ? "hover-lift cursor-pointer" : "";
  const clickableStyles = onClick ? "cursor-pointer" : "";

  const combinedClassName = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${paddingStyles[padding]} 
    ${shadowStyles[shadow]} 
    ${hoverStyles}
    ${clickableStyles}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  if (animation) {
    return (
      <motion.div
        className={combinedClassName}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      >
        {variant === "gamified" && (
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }

  return (
    <div className={combinedClassName} onClick={onClick}>
      {variant === "gamified" && (
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
