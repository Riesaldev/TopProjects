interface SkeletonCardProps {
  className?: string;
}

function pulse(className: string) {
  return `animate-pulse bg-surface-hover rounded ${className}`;
}

/** Skeleton para CampaignCard / CharacterCard */
export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div
      className={`bg-surface-dark border border-border-dark rounded-xl overflow-hidden ${className}`}
    >
      {/* Imagen */}
      <div className={pulse('h-40 w-full rounded-none')} />
      {/* Contenido */}
      <div className="p-4 flex flex-col gap-3">
        <div className={pulse('h-5 w-3/4')} />
        <div className={pulse('h-4 w-full')} />
        <div className={pulse('h-4 w-5/6')} />
        <div className="mt-2 flex items-center justify-between pt-3 border-t border-border-dark">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className={pulse('h-6 w-6 rounded-full')} />
            ))}
          </div>
          <div className={pulse('h-8 w-20')} />
        </div>
      </div>
    </div>
  );
}

/** Skeleton genérico de lista (fila) */
export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border border-border-dark rounded-xl">
      <div className={pulse('h-12 w-12 rounded-xl shrink-0')} />
      <div className="flex-1 flex flex-col gap-2">
        <div className={pulse('h-4 w-1/3')} />
        <div className={pulse('h-3 w-1/2')} />
      </div>
      <div className={pulse('h-8 w-16 rounded-lg')} />
    </div>
  );
}
