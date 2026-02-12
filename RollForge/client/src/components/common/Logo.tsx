import { BRAND_CONFIG } from '../../data/authConstants';
import { Dice3 } from 'lucide-react';


export default function Logo() {
  return (
    <>
      {/*Logo*/}
      <div className="relative z-10 flex items-center gap-6 m-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded bg-primary/80">
            <Dice3 className="w-8 h-8 text-white" />
          </div>
          <a rel="login" href="/" className="text-2xl font-bold tracking-tight text-text-primary cursor-pointer">
            {BRAND_CONFIG.LOGO_TEXT}
          </a>
        </div>
      </div>
    </>
  );
}