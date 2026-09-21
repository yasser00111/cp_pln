import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Save, CheckCircle2, Phone, Mail, MapPin, Globe } from 'lucide-react';

interface Props {
  settings: Record<string, string>;
}

export default function AdminSettingsIndex({ settings }: Props) {
  const [phone, setPhone] = useState(settings['phone'] || '(0421) 123456');
  const [email, setEmail] = useState(settings['email'] || 'info.ubpbarru@plnindonesiapower.co.id');
  const [address, setAddress] = useState(settings['address'] || 'Jl. Poros Makassar - Parepare Km. 105, Kabupaten Barru, Sulawesi Selatan');
  const [facebook, setFacebook] = useState(settings['facebook'] || 'https://facebook.com/plnindonesiapower');
  const [instagram, setInstagram] = useState(settings['instagram'] || 'https://instagram.com/plnindonesiapower');
  const [youtube, setYoutube] = useState(settings['youtube'] || 'https://youtube.com/plnindonesiapower');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/settings', {
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube,
    }, {
      onSuccess: () => {
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
      }
    });
  };

  return (
    <AdminLayout>
      <Head title="Pengaturan Situs - Admin PLN IP UBP Barru" />

      <div className="max-w-3xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Pengaturan Situs & Kontak Corporate</h1>
            <p className="text-xs text-slate-600">Atur informasi nomor telepon resmi, email, alamat kantor UBP Barru, dan tautan media sosial</p>
          </div>
          {savedMsg && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pengaturan disimpan!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Kontak Utama */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Informasi Kontak Resmi</span>
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-600" /> Nomor Telepon Kantor
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-600" /> Email Resmi Corporate
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-600" /> Alamat Lengkap Kantor & Pembangkit
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>Media Sosial Resmi</span>
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">YouTube URL</label>
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
