import React from 'react';

interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ badge, title, subtitle, centered = true }: Props) {
  return (
    <div className={`space-y-3 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[11px] font-bold tracking-wider uppercase ${centered ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
