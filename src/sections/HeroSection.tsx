import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const androidRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse following animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized position (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePos({ x: clientX, y: clientY });

      // Animate glow following mouse
      if (mouseGlowRef.current) {
        gsap.to(mouseGlowRef.current, {
          x: clientX - 150,
          y: clientY - 150,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Parallax effect on android
      if (androidRef.current) {
        gsap.to(androidRef.current, {
          x: x * 15,
          rotateY: x * 3,
          rotateX: -y * 2,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Parallax on ring
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: x * -10,
          y: y * -5,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-play entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Android entrance
      tl.fromTo(
        androidRef.current,
        { opacity: 0, scale: 0.92, y: '18vh' },
        { opacity: 1, scale: 1, y: 0, duration: 1.2 },
        0
      );

      // Orbital ring entrance
      tl.fromTo(
        ringRef.current,
        { opacity: 0, rotate: -25, scale: 0.85 },
        { opacity: 1, rotate: 0, scale: 1, duration: 1 },
        0.2
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: '-6vh' },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      );

      // Subheadline entrance
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: '4vh' },
        { opacity: 1, y: 0, duration: 0.8 },
        0.6
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: '6vh' },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );

      // Particles fade in
      tl.fromTo(
        particlesRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven animation - LONGER duration
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Increased from 130% to 200%
          pin: true,
          scrub: 0.8, // Slightly smoother scrub
          onLeaveBack: () => {
            gsap.set(androidRef.current, { opacity: 1, scale: 1, y: 0, x: 0, rotateY: 0, rotateX: 0 });
            gsap.set(ringRef.current, { opacity: 1, rotate: 0, scale: 1, x: 0, y: 0 });
            gsap.set(headlineRef.current, { opacity: 1, y: 0 });
            gsap.set(subheadlineRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0% - 20%): Hold visible

      // SETTLE (20% - 60%): Subtle ring rotation
      scrollTl.fromTo(
        ringRef.current,
        { rotate: 0 },
        { rotate: 12, ease: 'none' },
        0.2
      );

      // EXIT (60% - 100%): All elements exit - SLOWER
      scrollTl.fromTo(
        androidRef.current,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0, scale: 1.08, y: '-28vh', ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        ringRef.current,
        { opacity: 1, rotate: 12, scale: 1 },
        { opacity: 0, rotate: 28, scale: 1.18, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-14vh', scale: 0.96, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-10vh', ease: 'power2.in' },
        0.62
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '12vh', ease: 'power2.in' },
        0.64
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const element = document.getElementById('assistance');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned flex items-center justify-center ${className}`}
    >
      {/* Mouse following glow */}
      <div
        ref={mouseGlowRef}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(59,108,255,0.15) 0%, rgba(59,108,255,0) 70%)',
          filter: 'blur(40px)',
          transform: `translate(${mousePos.x - 150}px, ${mousePos.y - 150}px)`,
        }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 cyber-gradient" />
      
      {/* Light field blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B6CFF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2EE6FF]/5 rounded-full blur-3xl" />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Orbital Ring */}
      <div
        ref={ringRef}
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[78vw] h-[34vh] orbital-ring opacity-0"
        style={{ transform: 'translate(-50%, -50%) rotateX(60deg)' }}
      />

      {/* Android */}
      <img
        ref={androidRef}
        src="/hero_android.png"
        alt="CyberLife Android"
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 h-[72vh] w-auto object-contain z-10 opacity-0"
        style={{ perspective: '1000px' }}
      />

      {/* Content - CENTERED */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        {/* Headline - CENTERED */}
        <h1
          ref={headlineRef}
          className="text-center text-[clamp(32px,5vw,68px)] font-bold text-[#101114] leading-[0.95] opacity-0 px-4"
        >
          Humanoidná podpora,
          <br />
          <span className="text-gradient">navrhnutá pre skutočný život.</span>
        </h1>

        {/* Subheadline - CENTERED */}
        <p
          ref={subheadlineRef}
          className="mt-8 text-center w-[90vw] max-w-2xl text-[clamp(14px,1.4vw,18px)] text-[#6B7280] leading-relaxed opacity-0 px-4"
        >
          CyberLife pomáha s každodennými úlohami, podporuje opatrovateľov
          a pomáha ľuďom zostať v kontakte — bezpečne, jasne a s láskou.
        </p>

        {/* Micro label - CENTERED */}
        <span className="mt-6 text-xs text-[#3B6CFF] font-medium tracking-wide uppercase opacity-0">
          Teraz prijímame partnerov do pilotného programu
        </span>

        {/* CTA Buttons - CENTERED */}
        <div
          ref={ctaRef}
          className="mt-12 flex items-center gap-4 pointer-events-auto opacity-0"
        >
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-cyber flex items-center gap-2"
          >
            Požiadať o pilot
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('capabilities');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline"
          >
            Preskúmať schopnosti
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B7280] hover:text-[#3B6CFF] transition-colors z-20"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
