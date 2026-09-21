import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Zap, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: 'admin@plnindonesiapower.co.id',
    password: 'password123',
    remember: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 p-0.5 shadow-xl shadow-sky-500/20 inline-flex items-center justify-center">
            <div className="w-full h-full bg-slate-50 rounded-[14px] flex items-center justify-center text-sky-400">
              <Zap className="w-7 h-7 fill-sky-400/20" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 font-heading tracking-wide uppercase">
              PT PLN INDONESIA POWER
            </h1>
            <p className="text-xs font-bold text-sky-400 uppercase tracking-widest mt-0.5">
              Portal Admin UBP Barru
            </p>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Login Administrator</span>
            </h2>
            <p className="text-xs text-slate-600">Masukkan email/username dan password resmi Anda untuk mengelola website.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Email / Username Admin</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="admin@plnindonesiapower.co.id"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[11px] mt-1 font-semibold">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-[11px] mt-1 font-semibold">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="rounded border-slate-200 bg-slate-50 text-sky-500 focus:ring-sky-500"
                />
                <span>Ingat Saya di Perangkat Ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
            >
              <span>{processing ? 'Memverifikasi...' : 'Masuk ke Dashboard Admin'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Preset Credentials Tip */}
          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-[11px] space-y-1">
            <div className="font-bold text-sky-300">Kredensial Default Admin:</div>
            <div className="text-slate-700 flex justify-between">
              <span>Username / Email:</span>
              <code className="text-sky-400 font-mono">admin@plnindonesiapower.co.id</code>
            </div>
            <div className="text-slate-700 flex justify-between">
              <span>Password:</span>
              <code className="text-sky-400 font-mono">password123</code>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-center text-slate-500">
          © {new Date().getFullYear()} PT PLN Indonesia Power UBP Barru. All rights reserved.
        </p>
      </div>
    </div>
  );
}
