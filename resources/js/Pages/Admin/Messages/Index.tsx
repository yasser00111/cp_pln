import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { ContactMessage } from '@/Types';
import { Mail, CheckCircle2, Circle } from 'lucide-react';

interface Props {
  messages: ContactMessage[];
}

export default function Index({ messages }: Props) {
  const toggleRead = (id: string) => {
    router.post(`/admin/messages/${id}/toggle`, {}, { preserveState: true });
  };

  return (
    <AdminLayout>
      <Head title="Kelola Pesan Masuk - Admin UBP Barru" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Pesan Masuk Form Kontak</h1>
          <p className="text-xs text-slate-600">Daftar masukan dan pesan yang dikirim oleh pengunjung website</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Pengirim</th>
                  <th className="px-6 py-4">Subjek</th>
                  <th className="px-6 py-4">Pesan</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-700">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      {msg.is_read ? (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">Sudah Dibaca</span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase">Baru</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{msg.name}</div>
                      <div className="text-slate-600 text-[11px]">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-sky-400">{msg.subject}</td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-700">{msg.message}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleRead(msg.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700"
                      >
                        {msg.is_read ? 'Tandai Belum Dibaca' : 'Tandai Dibaca'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
