import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { Users, HeartHandshake, Briefcase, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';

export default function HumanCapital() {
  const { globalCms } = usePage<any>().props;

  return (
    <MainLayout>
      <Head title="Human Capital Management & Work At PLN IP - UBP Barru" />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>HUMAN CAPITAL MANAGEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {globalCms?.human_capital_hero?.title || "Work at PLN Indonesia Power UBP Barru"}
          </h1>
          <p className="text-sm text-slate-700 max-w-2xl leading-relaxed whitespace-pre-line">
            {globalCms?.human_capital_hero?.body_text || "Membangun SDM unggul, berdaya saing tinggi, dan berbudaya AKHLAK demi mengawal keandalan energi masa depan Indonesia."}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
              <GraduationCap className="w-8 h-8 text-sky-400" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">{globalCms?.human_capital_card_1?.title || "Pengembangan Talenta Continuous Learning"}</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{globalCms?.human_capital_card_1?.body_text || "Program sertifikasi keahlian spesialis pembangkitan, pelatihan K3, dan kepemimpinan berkelanjutan."}</p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
              <HeartHandshake className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">{globalCms?.human_capital_card_2?.title || "Budaya Kerja AKHLAK"}</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{globalCms?.human_capital_card_2?.body_text || "Amanah, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif menjadi fondasi etika insan UBP Barru."}</p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
              <ShieldCheck className="w-8 h-8 text-sky-400" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">{globalCms?.human_capital_card_3?.title || "Kesejahteraan & Keselamatan"}</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{globalCms?.human_capital_card_3?.body_text || "Pemberian jaminan kesehatan komprehensif serta penerapan Zero Accident dalam setiap aktivitas kerja."}</p>
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 text-center space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 font-heading">Ingin Bergabung Bersama Insan PLN IP?</h3>
            <p className="text-xs text-slate-700 max-w-xl mx-auto">Informasi rekrutmen resmi PT PLN Indonesia Power dikelola terpusat melalui portal Karir PLN Group.</p>
            <a
              href="https://rekrutmen.pln.co.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/30"
            >
              <Briefcase className="w-4 h-4" />
              <span>Kunjungi Portal Rekrutmen PLN</span>
            </a>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
