import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0, rotate: 1 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            end: 'top 80%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen bg-[#0B0C10] py-20 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B6CFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EE6FF]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Left: Headline */}
          <div ref={headlineRef} className="opacity-0">
            <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-white leading-tight mb-6">
              Prineste CyberLife
              <br />
              <span className="text-gradient">do vášho tímu.</span>
            </h2>
            <p className="text-[clamp(14px,1.2vw,16px)] text-gray-400 leading-relaxed max-w-md">
              Spolupracujeme s domovmi sociálnych služieb, klinikami a zdravotnými systémami. 
              Poďme sa porozprávať o pilotnom programe.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-[#3B6CFF]">100+</div>
                <div className="text-sm text-gray-500 mt-1">Pilotných zariadení</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#3B6CFF]">12</div>
                <div className="text-sm text-gray-500 mt-1">Mesačný pilot</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#3B6CFF]">24/7</div>
                <div className="text-sm text-gray-500 mt-1">Technická podpora</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={formRef}
            className="opacity-0"
          >
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#3B6CFF] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Ďakujeme za záujem!
                  </h3>
                  <p className="text-gray-400">
                    Budeme vás kontaktovať do 24 hodín.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Meno</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#3B6CFF] focus:outline-none transition-colors"
                      placeholder="Vaše meno"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Organizácia</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#3B6CFF] focus:outline-none transition-colors"
                      placeholder="Názov organizácie"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#3B6CFF] focus:outline-none transition-colors"
                      placeholder="vas@email.sk"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Rola</label>
                    <Select>
                      <SelectTrigger className="w-full px-4 py-3 rounded-xl bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Vyberte rolu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="caregiver">Opatrovateľ/ka</SelectItem>
                        <SelectItem value="manager">Manažér/ka</SelectItem>
                        <SelectItem value="clinician">Klinický pracovník</SelectItem>
                        <SelectItem value="other">Iné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Správa</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#3B6CFF] focus:outline-none transition-colors resize-none"
                      placeholder="Ako vám môžeme pomôcť?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-cyber flex items-center justify-center gap-2 mt-6"
                  >
                    Požiadať o hovor
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="mt-20 pt-8 border-t border-white/10 opacity-0"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B6CFF] to-[#2EE6FF] flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-lg text-white">CyberLife</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Súkromie
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Podmienky
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Compliance
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Tlačové materiály
              </button>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © 2026 CyberLife Robotics
            </div>
          </div>

          {/* Manifest */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-400 italic">
              „Budúcnosť starostlivosti je ľudská. My ju len podporujeme."
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
