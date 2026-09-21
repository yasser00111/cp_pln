import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Zap, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Activity, Leaf } from 'lucide-react';
import { HeroSlider } from '@/Types';

interface Props {
  sliders?: HeroSlider[];
}

export default function Hero({ sliders = [] }: Props) {
  // Default fallback slides if none provided
  const defaultSlides: HeroSlider[] = [
    {
      id: '1',
      title: 'Memberikan Energi untuk Indonesia yang Lebih Baik',
      subtitle: 'PT PLN Indonesia Power UBP Barru berkomitmen menghadirkan pembangkitan listrik yang andal, aman, efisien, dan berkelanjutan.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80',
      cta_text: 'Tentang Kami',
      cta_url: '/profile/tentang',
      order_priority: 1,
      is_active: true,
    },
    {
      id: '2',
      title: 'Transisi Energi Bersih & Inovasi Biomassa Co-firing',
      subtitle: 'Mendukung program Net Zero Emission melalui substitusi batu bara dengan biomassa pelet kayu dan sekam padi lokal.',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=80',
      cta_text: 'Program ESG & Lingkungan',
      cta_url: '/sustainability/commitment',
      order_priority: 2,
      is_active: true,
    },
    {
      id: '3',
      title: 'Keandalan Operasional & Budaya K3 Zero Accident',
      subtitle: 'Lebih dari 1.480 hari kerja aman tanpa kecelakaan kerja melalui pengawasan SMK3 dan ISO 45001 terpadu.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80',
      cta_text: 'Lihat Dashboard Performance',
      cta_url: '/operasional/performance',
      order_priority: 3,
      is_active: true,
    },
  ];

  const slideList = sliders && sliders.length > 0 ? sliders : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    if (slideList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slideList.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideList.length);
  };

  const current = slideList[currentIndex];
  const prevItem = slideList[(currentIndex - 1 + slideList.length) % slideList.length];
  const nextItem = slideList[(currentIndex + 1) % slideList.length];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 py-20 lg:py-32 group">
      
      {/* Background Image Carousel with Fade Animation */}
      {slideList.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-100 transition-transform duration-10000"
          />
          {/* Deep Corporate Blue Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/50 to-sky-950/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
        </div>
      ))}

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-3 duration-500">
              {current.title}
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-lg text-slate-200 font-normal max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
              {current.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={current.cta_url || '/profile/tentang'}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs sm:text-sm tracking-wider shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span>{current.cta_text || 'Tentang Kami'}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/operasional/performance"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-sky-500/50 font-bold text-xs sm:text-sm tracking-wider backdrop-blur-md transition-all duration-200"
              >
                <Activity className="w-4 h-4 mr-2 text-sky-400" />
                <span>Lihat Profil Performance</span>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-700 max-w-xl">
              <div className="flex items-center gap-2 text-slate-200 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Accident</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 text-xs">
                <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Clean Coal Tech</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 text-xs">
                <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PROPER Hijau</span>
              </div>
            </div>

          </div>

          {/* Right Statistics Highlight Card (Dinonaktifkan sementara sesuai permintaan) */}
          <div className="hidden">
            <div className="bg-white/85 backdrop-blur-xl border border-sky-500/20 rounded-3xl p-6 shadow-2xl shadow-slate-950 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-semibold">Status Pembangkit</div>
                    <div className="text-sm font-bold text-slate-900">PLTU Barru 2x50 MW</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  OPERATIONAL
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1 flex justify-between">
                    <span>Tingkat Keandalan (EAF)</span>
                    <span className="text-sky-400 font-bold">99.45%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-500 to-emerald-400 h-2 rounded-full w-[99.45%]" />
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-600 mb-1 flex justify-between">
                    <span>Target Produksi Tahunan</span>
                    <span className="text-emerald-400 font-bold">845 GWh</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-[94%]" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-sky-300 flex items-center justify-between">
                  <span>Lokasi Pembangkit:</span>
                  <span className="text-[10px] text-slate-600 font-normal">Kab. Barru, Sulsel</span>
                </div>
                <p className="text-[11px] text-slate-600">Pilar utama pasokan energi baseload Sistem Kelistrikan Interkoneksi Sulbagsel.</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Pagination Dots */}
      {slideList.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slideList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-sky-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

    </section>
  );
}
