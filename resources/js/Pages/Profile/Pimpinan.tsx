import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Management } from '@/Types';
import { Users, Mail, Phone, Award } from 'lucide-react';

interface Props {
  leaders: Management[];
}

export default function Pimpinan({ leaders }: Props) {
  return (
    <MainLayout>
      <Head title="Jajaran Pimpinan - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>LEADERSHIP TEAM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Jajaran Pimpinan UBP Barru
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Tim profesional berpengalaman yang memimpin operasional, keselamatan, dan keberlanjutan energi di PT PLN Indonesia Power UBP Barru.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-sky-500/40 transition-all duration-300 group shadow-xl"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={leader.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-sky-500/80 backdrop-blur-md text-slate-900 font-extrabold text-[10px] uppercase tracking-wider">
                      {leader.position}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{leader.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
