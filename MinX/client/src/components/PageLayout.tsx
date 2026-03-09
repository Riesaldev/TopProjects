import { Link } from 'react-router-dom';

type SectionItem = {
  title: string;
  description: string;
};

type PageSection = {
  title: string;
  description: string;
  items?: SectionItem[];
};

type PageAction = {
  label: string;
  to: string;
  variant?: 'primary' | 'secondary';
};

type PageLayoutProps = {
  label: string;
  title: string;
  description: string;
  sections: PageSection[];
  actions?: PageAction[];
};

const actionClassName = (variant: PageAction['variant']) => {
  if (variant === 'secondary') {
    return 'btn-secondary !px-6 !py-2.5 text-sm';
  }
  return 'btn-primary !px-6 !py-2.5 text-sm';
};

const PageLayout = ({ label, title, description, sections, actions }: PageLayoutProps) => {
  return (
    <section className="relative flex-1 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,90,240,0.12),_transparent_45%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,_rgba(0,225,217,0.18),_transparent_55%)] blur-3xl opacity-60" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">{label}</p>
          <h1 className="text-4xl font-semibold leading-tight text-balance">{title}</h1>
          <p className="text-white/70 text-base leading-relaxed">{description}</p>
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {actions.map((action) => (
                <Link key={action.label} to={action.to} className={actionClassName(action.variant)}>
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <article key={section.title} className="glass-panel p-6 border-white/10 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <p className="text-sm text-white/70 leading-relaxed">{section.description}</p>
              </div>
              {section.items && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 space-y-1"
                    >
                      <p className="text-base font-medium">{item.title}</p>
                      <p className="text-sm text-white/65 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { PageSection, PageAction };
export default PageLayout;

