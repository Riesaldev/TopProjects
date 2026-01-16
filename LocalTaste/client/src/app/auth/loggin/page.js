
"use client";

import Header from '@/components/layout/auth/Header';
import BrandingImage from '@/components/ui/auth/BrandingImage';
import LogginForm from '@/components/auth/loggin/LogginForm';

export default function Loggin () {
  return (
    <main className="overflow-x-hidden antialiased min-h-screen flex flex-col">
      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Navbar */}
        <Header />
        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row bg-green-50 brightness-90">
          {/* Left Side: Image/Branding */}
          <BrandingImage />
          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col justify-center items-center p-4 py-8 lg:p-12">
            <LogginForm />
          </div>
        </div>
      </div>
    </main>
  );
}