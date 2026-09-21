import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Zap, Trash2, Plus } from 'lucide-react';

interface OperationalStatistic {
  id: string;
  metric_key: string;
  label: string;
  value: string;
  numeric_value: number | null;
  unit: string | null;
  subtext: string | null;
  order_priority: number;
}

interface Props {
  statistics: OperationalStatistic[];
}

export default function AdminStatisticsIndex({ statistics }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [metricKey, setMetricKey] = useState('');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [numericValue, setNumericValue] = useState('');
  const [unit, setUnit] = useState('');
  const [subtext, setSubtext] = useState('');
  const [orderPriority, setOrderPriority] = useState('1');

  const openAddForm = () => {
    setEditingId(null);
    setMetricKey('');
    setLabel('');
    setValue('');
    setNumericValue('');
    setUnit('');
    setSubtext('');
    setOrderPriority('1');
  };

  const openEditForm = (stat: OperationalStatistic) => {
    setEditingId(stat.id);
    setMetricKey(stat.metric_key);
    setLabel(stat.label);
    setValue(stat.value);
    setNumericValue(stat.numeric_value !== null ? stat.numeric_value.toString() : '');
    setUnit(stat.unit || '');
    setSubtext(stat.subtext || '');
    setOrderPriority(stat.order_priority.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/admin/statistics/${editingId}` : '/admin/statistics';
    router.post(url, {
      metric_key: metricKey,
      label: label,
      value: value,
      numeric_value: numericValue ? parseFloat(numericValue) : null,
      unit: unit,
      subtext: subtext,
      order_priority: parseInt(orderPriority)
    }, {
      onSuccess: () => {
        openAddForm(); // Reset form on success
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus statistik ini?')) {
      router.delete(`/admin/statistics/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Statistik Operasional - Admin PLN IP UBP Barru" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Kelola Statistik Operasional</h1>
          <p className="text-xs text-slate-600">Atur kotak angka statistik (Kapasitas, Produksi, EAF, dsb.) yang tampil di halaman Beranda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-400" />
                <span>{editingId ? 'Edit Statistik' : 'Tambah Statistik'}</span>
              </div>
              {editingId && (
                <button type="button" onClick={openAddForm} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded font-bold">
                  Batal Edit
                </button>
              )}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Metric Key (Kode Unik)</label>
                <input
                  type="text"
                  required
                  value={metricKey}
                  onChange={(e) => setMetricKey(e.target.value)}
                  placeholder="contoh: capacity_mw"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Label (Judul Bawah)</label>
                <input
                  type="text"
                  required
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="KAPASITAS TERPASANG"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Value (Angka Utama Text)</label>
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="2 x 50"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Unit / Satuan</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="MW (kosongkan jika tidak ada)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subtext (Keterangan Bawah)</label>
                <input
                  type="text"
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  placeholder="Pilar Sistem Sulbagsel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Urutan</label>
                  <input
                    type="number"
                    required
                    value={orderPriority}
                    onChange={(e) => setOrderPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Numeric Value (Opsional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={numericValue}
                    onChange={(e) => setNumericValue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-500 text-white rounded-xl py-2 font-bold hover:bg-sky-600 transition-colors mt-2"
              >
                {editingId ? 'Simpan Perubahan' : 'Simpan Statistik'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-200 pb-2">
              Daftar Statistik (Urutan)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statistics.length === 0 ? (
                <div className="col-span-2 p-8 text-center bg-white border border-slate-200 rounded-3xl text-slate-500 text-xs">
                  Belum ada data statistik operasional
                </div>
              ) : (
                statistics.map((stat) => (
                  <div key={stat.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-sky-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-sky-500 font-bold uppercase mb-0.5">Urutan: {stat.order_priority} | {stat.metric_key}</div>
                      <div className="font-bold text-slate-900 text-lg">{stat.value} {stat.unit}</div>
                      <div className="text-xs text-sky-500 font-semibold uppercase">{stat.label}</div>
                      {stat.subtext && <div className="text-[10px] text-slate-500 mt-1">{stat.subtext}</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openEditForm(stat)}
                        className="p-2 bg-sky-50 text-sky-500 rounded-lg hover:bg-sky-500 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button
                        onClick={() => handleDelete(stat.id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
