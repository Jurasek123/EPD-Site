import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, MessageSquare, Lock, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesSectionProps {
  className?: string;
}

const features = [
  {
    icon: Navigation,
    title: 'Navigácia',
    description: 'Autonómna chôdza, vyhýbanie sa prekážkam, bezpečné zastavenie.',
  },
  {
    icon: MessageSquare,
    title: 'Interakcia',
    description: 'Reč, gestá, rozpoznávanie tváre, pokojné odpovede.',
  },
  {
    icon: Lock,
    title: 'Súkromie',
    description: 'Spracovanie na zariadení, šifrované dáta, jasný súhlas.',
  },
];

export default function CapabilitiesSection({ className = '' }: CapabilitiesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '-8vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: '-4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Features stagger animation
      const featureItems = featuresRef.current?.children;
      if (featureItems) {
        gsap.fromTo(
          featureItems,
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 85%',
              end: 'top 50%',
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
      id="capabilities"
      className={`relative min-h-screen py-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative rounded-[26px] overflow-hidden shadow-xl opacity-0"
            style={{ height: '52vh' }}
          >
            <img
              src="/photo_reading.jpg"
              alt="Senior pri čítaní"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B6CFF]/10 to-transparent" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="opacity-0">
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold text-[#101114] leading-tight mb-6">
              Vybavené pre skutočné prostredie starostlivosti.
            </h2>
            <p className="text-[clamp(14px,1.2vw,16px)] text-[#6B7280] leading-relaxed mb-8">
              CyberLife zvláda rutinné úlohy, komunikuje jasne a uchováva dáta v súkromí — 
              aby sa personál mohol venovať ľuďom, nie papierovačkám.
            </p>

            <button className="flex items-center gap-2 text-[#3B6CFF] font-medium hover:underline mb-12">
              <Download className="w-4 h-4" />
              Stiahnuť prehľad schopností (PDF)
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#3B6CFF]/10 hover:border-[#3B6CFF]/30 transition-all duration-300 hover:shadow-lg opacity-0"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3B6CFF]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#3B6CFF]" />
                </div>
                <h3 className="text-lg font-semibold text-[#101114] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
