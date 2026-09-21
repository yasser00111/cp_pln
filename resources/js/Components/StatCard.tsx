import React, { useState, useEffect, useRef } from 'react';
import { Zap, Calendar, ShieldCheck, Activity, Users, Leaf } from 'lucide-react';
import { OperationalStatistic } from '@/Types';

interface Props {
  statistic: OperationalStatistic;
}

export default function StatCard({ statistic }: Props) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = statistic.numeric_value || 100;
    const duration = 2000; // 2 sec
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, statistic.numeric_value]);

  const getIcon = (key: string) => {
    switch (key) {
      case 'capacity':
        return Zap;
      case 'operating_year':
        return Calendar;
      case 'reliability':
        return ShieldCheck;
      case 'energy_production':
        return Activity;
      case 'employees':
        return Users;
      case 'csr_programs':
        return Leaf;
      default:
        return Zap;
    }
  };

  const IconComp = getIcon(statistic.metric_key);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/90 border border-slate-200 hover:border-sky-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-slate-900 text-sky-400 flex items-center justify-center transition-all duration-300">
          <IconComp className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase font-heading">UBP BARRU</span>
      </div>

      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight flex items-baseline gap-1">
          {statistic.metric_key === 'operating_year' ? (
            <span>{statistic.value}</span>
          ) : statistic.metric_key === 'reliability' ? (
            <span>{count.toFixed(2)}%</span>
          ) : (
            <span>{statistic.value}</span>
          )}
        </div>
        <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">{statistic.label}</div>
        {statistic.subtext && (
          <p className="text-[11px] text-slate-600 pt-1 leading-relaxed">{statistic.subtext}</p>
        )}
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
