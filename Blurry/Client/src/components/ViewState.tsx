import { ReactNode } from "react";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";

type ViewStateVariant = "loading" | "error" | "empty";

type ViewStateProps = {
  variant: ViewStateVariant;
  title: string;
  description?: string;
  className?: string;
  action?: ReactNode;
};

export default function ViewState({ variant, title, description, className = "", action }: ViewStateProps) {
  const role = variant === "error" ? "alert" : "status";

  const config =
    variant === "loading"
      ? {
          icon: <Loader2 className="h-8 w-8 animate-spin text-primary-400" />,
          ring: "ring-primary-500/30",
          bg: "bg-primary-500/10",
        }
      : variant === "error"
        ? {
            icon: <AlertCircle className="h-8 w-8 text-red-400" />,
            ring: "ring-red-500/30",
            bg: "bg-red-500/10",
          }
        : {
            icon: <Inbox className="h-8 w-8 text-zinc-400" />,
            ring: "ring-zinc-500/30",
            bg: "bg-zinc-500/10",
          };

  return (
    <div role={role} aria-live={variant === "loading" ? "polite" : "assertive"} className={`flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 text-center ${className}`}>
      <div className={`mb-4 rounded-xl p-3 ring-1 ${config.bg} ${config.ring}`}>{config.icon}</div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-zinc-400">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
