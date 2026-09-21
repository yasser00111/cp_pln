import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Facility } from '@/Types';
import { Building2, ChevronRight, Zap } from 'lucide-react';

interface Props {
  facilities: Facility[];
}

export default function UnitFasilitas({ facilities }: Props) {
  return (
    <MainLayout>
      <Head title="Unit & Fasilitas Operasional - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>UNIT KATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Unit & Fasilitas Operasional
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            Daftar komponen sistem pembangkitan dari Jetty penampungan batu bara hingga Switchyard 150kV.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => (
              <div key={fac.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
                <div className="h-44 rounded-2xl overflow-hidden">
                  <img src={fac.image || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80'} alt={fac.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">{fac.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
