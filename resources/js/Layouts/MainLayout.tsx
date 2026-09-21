import React, { ReactNode } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/Types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { flash } = usePage<PageProps>().props;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-slate-900">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Flash Message Notifications */}
      {flash?.success && (
        <div className="fixed top-20 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{flash.success}</span>
          </div>
        </div>
      )}
      {flash?.error && (
        <div className="fixed top-20 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="bg-rose-950/90 border border-rose-500/50 text-rose-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="text-xs font-semibold">{flash.error}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow pt-[72px]">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
