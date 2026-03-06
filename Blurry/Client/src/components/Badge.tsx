import { ReactNode } from "react";

type BadgeVariant = "neutral" | "info" | "success" | "warning" | "danger" | "accent";

type BadgeSize = "sm" | "md";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
};

export default function Badge({ children, variant = "neutral", size = "md", className = "" }: BadgeProps) {
  const base = "inline-flex items-center gap-1.5 rounded-full border font-black uppercase tracking-wider";
  const sizes: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variants: Record<BadgeVariant, string> = {
    neutral: "border-zinc-600 bg-zinc-800/70 text-zinc-200",
    info: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    danger: "border-red-500/40 bg-red-500/10 text-red-300",
    accent: "border-primary-500/40 bg-primary-500/10 text-primary-300",
  };

  return <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()}>{children}</span>;
}
