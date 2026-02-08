import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Database, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SafetySectionProps {
  className?: string;
}

const principles = [
  {
    icon: Users,
    title: 'Ľudský dohľad',
    description: 'Opatrovatelia stanovujú hranice. Systém podporuje; nenahradzuje úsudok človeka.',
  },
  {
    icon: Database,
    title: 'Transparentné dáta',
    description: 'Jasný súhlas, šifrované úložisko a auditovateľné záznamy.',
  },
  {
    icon: ShieldCheck,
    title: 'Zastavenie kedykoľvek',
    description: 'Klienti a rodiny môžu okamžite pozastaviť alebo ukončiť používanie.',
  },
];

export default function SafetySection({ className = '' }: SafetySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Cards stagger animation
      const cardItems = cardsRef.current?.children;
      if (cardItems) {
        gsap.fromTo(
          cardItems,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="safety"
      className={`relative min-h-screen py-20 ${className}`}
    >
      {/* Background light blob */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#B56CFF]/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold text-[#101114] leading-tight mb-6">
            Bezpečnosť a etika na prvom mieste.
          </h2>
          <p className="text-[clamp(14px,1.2vw,16px)] text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
            CyberLife je navrhnutý s jasnými hranicami: ľudský dohľad, transparentné 
            postupy práce s dátami a možnosť kedykoľvek zastaviť alebo pozastaviť.
          </p>
        </div>

        {/* Principle Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#3B6CFF]/10 hover:border-[#3B6CFF]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#3B6CFF]/5 text-center opacity-0"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B6CFF]/10 to-[#2EE6FF]/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-[#3B6CFF]" />
                </div>
                <h3 className="text-lg font-semibold text-[#101114] mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3B6CFF]" />
            <span className="text-sm text-[#6B7280]">GDPR compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#3B6CFF]" />
            <span className="text-sm text-[#6B7280]">ISO 27001</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#3B6CFF]" />
            <span className="text-sm text-[#6B7280]">Etická komisia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
