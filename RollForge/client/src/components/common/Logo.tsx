import { BRAND_CONFIG } from '../../data/authConstants';
import { Dice3 } from 'lucide-react';

interface LogoProps {
  redirectTo?: string;
}

export default function Logo({ redirectTo = '/' }: LogoProps) {
  return (
    <>
      {/*Logo*/}
      <div className="relative z-10 flex items-center gap-6 m-6 cursor-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded bg-primary/80">
            <Dice3 className="w-8 h-8 text-white" />
          </div>
          <a rel="login" href={redirectTo} className="text-2xl font-bold tracking-tight text-text-primary cursor-pointer">
            {BRAND_CONFIG.LOGO_TEXT}
          </a>
        </div>
      </div>
    </>
  );
}