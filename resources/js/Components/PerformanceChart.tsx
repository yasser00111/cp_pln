import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { OperationalMetric } from '@/Types';
import { Activity, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  metrics: OperationalMetric[];
}

export default function PerformanceChart({ metrics }: Props) {
  const [activeTab, setActiveTab] = useState<'production' | 'reliability' | 'heatrate'>('production');

  const chartData = metrics.map((m) => ({
    name: m.period_label,
    Produksi: m.energy_production_gwh,
    Availability: m.availability_factor,
    Reliability: m.reliability_index,
    HeatRate: m.heat_rate_kcal,
  }));

  return (
    <div className="bg-white/90 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Top Controller Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <span>Dashboard Performa Pembangkitan 2025</span>
          </h3>
          <p className="text-xs text-slate-600 mt-1">Data real-time produksi energi, keandalan jaringan, dan efisiensi sistem PLTU Barru</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('production')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'production' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Produksi (GWh)
          </button>
          <button
            onClick={() => setActiveTab('reliability')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'reliability' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Keandalan (EAF %)
          </button>
          <button
            onClick={() => setActiveTab('heatrate')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'heatrate' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Heat Rate (kcal)
          </button>
        </div>
      </div>

      {/* Recharts Render Area */}
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'production' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProduksi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A3E0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00A3E0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[50, 90]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="Produksi" name="Produksi Listrik (GWh)" stroke="#00A3E0" strokeWidth={3} fillOpacity={1} fill="url(#colorProduksi)" />
            </AreaChart>
          ) : activeTab === 'reliability' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAvailability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[95, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="Availability" name="Availability Factor (%)" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorAvailability)" />
              <Area type="monotone" dataKey="Reliability" name="Reliability Index (%)" stroke="#00A3E0" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[2300, 2400]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="HeatRate" name="Specific Heat Rate (kcal/kWh)" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
