import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';

interface Props {
  settings: Record<string, string>;
}

export default function Index({ settings }: Props) {
  const { globalCms } = usePage<any>().props;
  const contactTitle = globalCms?.contact_description?.title || "Hubungi UBP Barru";
  const contactBody = globalCms?.contact_description?.body_text || "Sampaikan masukan, pertanyaan, atau permohonan kerjasama langsung ke Humas PT PLN Indonesia Power UBP Barru.";

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => reset(),
    });
  };

  return (
    <MainLayout>
      <Head title={`${contactTitle} - PT PLN Indonesia Power UBP Barru`} />

      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-4 h-4" />
            <span>LAYANAN HUMAS & DOKUMEN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            {contactTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed whitespace-pre-line">
            {contactBody}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-heading">Alamat Kantor & Site</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kantor Operasional PT PLN Indonesia Power Unit Bisnis Pembangkitan (UBP) Barru:
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Alamat Lengkap</div>
                    <div className="text-slate-600 mt-1">{settings.address || 'Desa Lampoko, Kecamatan Balusu, Kabupaten Barru, Sulawesi Selatan 90752'}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Telepon Kantor</div>
                    <div className="text-slate-600">{settings.phone || '(0421) 921-234'}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Email Official</div>
                    <div className="text-slate-600">{settings.email || 'humas.ubpbarru@plnindonesiapower.co.id'}</div>
                  </div>
                </div>
              </div>

              {/* Embed Google Maps Card */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 h-64 bg-white relative">
                <iframe
                  title="Google Maps Location UBP Barru"
                  src="https://maps.google.com/maps?q=PLTU+Barru+Sulawesi+Selatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale opacity-80 contrast-125"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-2xl">
                <h3 className="text-xl font-bold text-slate-900 font-heading">Kirim Pesan Langsung</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                      <input
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                        placeholder="Nama Anda"
                      />
                      {errors.name && <div className="text-[10px] text-rose-400">{errors.name}</div>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email *</label>
                      <input
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                        placeholder="email@contoh.com"
                      />
                      {errors.email && <div className="text-[10px] text-rose-400">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">No. Telepon / HP</label>
                      <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                        placeholder="0812xxxx"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Subjek *</label>
                      <input
                        type="text"
                        required
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                        placeholder="Subjek Pesan"
                      />
                      {errors.subject && <div className="text-[10px] text-rose-400">{errors.subject}</div>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Pesan *</label>
                    <textarea
                      required
                      rows={5}
                      value={data.message}
                      onChange={(e) => setData('message', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                      placeholder="Tuliskan pesan Anda secara jelas..."
                    />
                    {errors.message && <div className="text-[10px] text-rose-400">{errors.message}</div>}
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan</span>
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}
