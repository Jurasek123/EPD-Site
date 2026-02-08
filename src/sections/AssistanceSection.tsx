import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Pill, 
  Accessibility, 
  Utensils, 
  Calendar, 
  Shield, 
  FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface AssistanceSectionProps {
  className?: string;
}

const radialItems = [
  { icon: Pill, label: 'Pripomínanie liekov', description: 'Automatické pripomienky dávkovania liekov s vizuálnymi a zvukovými upozorneniami.' },
  { icon: Accessibility, label: 'Podpora mobility', description: 'Asistencia pri chôdzi, presunoch a cvičeniach na zlepšenie stability.' },
  { icon: Utensils, label: 'Pomoc pri jedle', description: 'Podpora pri príprave jedla a stravovaní s ohľadom na individuálne potreby.' },
  { icon: Calendar, label: 'Plánovanie', description: 'Organizácia denného rozvrhu, termínov a aktivít.' },
  { icon: Shield, label: 'Bezpečnostné kontroly', description: 'Pravidelné kontroly stavu a bezpenosti klientov.' },
  { icon: FileText, label: 'Dokumentácia', description: 'Automatický záznam aktivít a zdravotných údajov.' },
];

export default function AssistanceSection({ className = '' }: AssistanceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const androidRef = useRef<HTMLImageElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const radialRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<typeof radialItems[0] | null>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  // Mouse following effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (mouseGlowRef.current) {
        gsap.to(mouseGlowRef.current, {
          x: clientX - 100,
          y: clientY - 100,
          duration: 1,
          ease: 'power2.out',
        });
      }

      // Parallax on photo
      if (photoRef.current) {
        const x = (clientX / window.innerWidth - 0.5) * 2;
        const y = (clientY / window.innerHeight - 0.5) * 2;
        gsap.to(photoRef.current, {
          x: x * -8,
          y: y * -5,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Increased from 130% to 200%
          pin: true,
          scrub: 0.8,
        },
      });

      // ENTRANCE (0% - 20%)
      // Photo card from right
      scrollTl.fromTo(
        photoRef.current,
        { x: '55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Radial menu from left
      scrollTl.fromTo(
        radialRef.current,
        { x: '-40vw', opacity: 0, rotate: -12 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0
      );

      // Android from bottom
      scrollTl.fromTo(
        androidRef.current,
        { y: '22vh', opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Title from left
      scrollTl.fromTo(
        titleRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // SETTLE (20% - 60%): Subtle movements
      scrollTl.fromTo(
        photoRef.current,
        { y: 0 },
        { y: '-2vh', ease: 'none' },
        0.2
      );

      scrollTl.fromTo(
        radialRef.current,
        { rotate: 0 },
        { rotate: 12, ease: 'none' },
        0.2
      );

      // EXIT (60% - 100%) - SLOWER
      scrollTl.fromTo(
        photoRef.current,
        { x: 0, opacity: 1, scale: 1 },
        { x: '45vw', opacity: 0, scale: 1.06, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        radialRef.current,
        { x: 0, opacity: 1, rotate: 12 },
        { x: '-40vw', opacity: 0, rotate: 22, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        androidRef.current,
        { y: 0, opacity: 1, scale: 1 },
        { y: '-22vh', opacity: 0, scale: 1.08, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="assistance"
      className={`section-pinned ${className}`}
    >
      {/* Mouse following glow */}
      <div
        ref={mouseGlowRef}
        className="fixed w-[200px] h-[200px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(59,108,255,0.12) 0%, rgba(59,108,255,0) 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Background light blob */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#3B6CFF]/5 rounded-full blur-3xl" />

      {/* Title (top-left) */}
      <div
        ref={titleRef}
        className="absolute left-[6vw] top-[10vh] max-w-[34vw] z-20 opacity-0"
      >
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-[#101114] leading-tight mb-4">
          Pomoc s každodennými úlohami.
        </h2>
        <p className="text-[clamp(14px,1.2vw,16px)] text-[#6B7280] leading-relaxed max-w-[28vw]">
          Od pripomínanie liekov po jemnú podporu mobility — CyberLife zvláda rutinné úlohy, 
          aby sa opatrovatelia mohli venovať ľuďom.
        </p>
        <button 
          onClick={() => {
            const el = document.getElementById('capabilities');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-6 text-[#3B6CFF] font-medium text-sm hover:underline flex items-center gap-1"
        >
          Pozrite si, ako asistencia funguje
        </button>
      </div>

      {/* Photo Card (right) */}
      <div
        ref={photoRef}
        className="absolute right-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-[26px] overflow-hidden shadow-xl z-10 opacity-0"
      >
        <img
          src="/photo_caregiver.jpg"
          alt="Opatrovateľka pomáha klientovi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Android (center) */}
      <img
        ref={androidRef}
        src="/hero_android.png"
        alt="CyberLife Android"
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 h-[65vh] w-auto object-contain z-10 opacity-0"
      />

      {/* Radial Menu (left) */}
      <div
        ref={radialRef}
        className="absolute left-[28vw] top-[52%] -translate-x-1/2 -translate-y-1/2 z-20 opacity-0"
      >
        <div className="relative w-[32vw] h-[32vw]">
          {radialItems.map((item, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            const radius = '16vw';
            const x = `calc(${Math.cos(angle)} * ${radius})`;
            const y = `calc(${Math.sin(angle)} * ${radius})`;
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={() => setSelectedItem(item)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
                }}
              >
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#3B6CFF]/10 shadow-lg transition-all duration-300 hover:scale-110 hover:border-[#3B6CFF] hover:shadow-xl hover:shadow-[#3B6CFF]/10">
                  <Icon className="w-6 h-6 text-[#3B6CFF] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#101114] whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dialog for radial items */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && (
                <>
                  <selectedItem.icon className="w-5 h-5 text-[#3B6CFF]" />
                  {selectedItem.label}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
