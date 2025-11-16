'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  
  // Content refs for each stage
  const content1Ref = useRef<HTMLDivElement>(null);
  const content2Ref = useRef<HTMLDivElement>(null);
  const content3Ref = useRef<HTMLDivElement>(null);
  const content4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // STAGE 1 (0-30%): Content 1 fades, Content 2 appears EARLY
      tl.to(content1Ref.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
      })
      .fromTo(content2Ref.current, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, '-=0.2')
      
      // Black overlay rises + Leaf starts emerging
      .fromTo(blackOverlayRef.current, {
        yPercent: 70,
      }, {
        yPercent: 0,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=0.4')
      .fromTo(leafRef.current, {
        scale: 0.2,
        yPercent: 100,
        opacity: 0,
      }, {
        scale: 0.8,
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
      }, '-=1.2')

      // STAGE 2 (40-60%): Leaf grows, Content 2 fades, Content 3 appears
      .to(leafRef.current, {
        scale: 1.3,
        duration: 1,
      })
      .to(content2Ref.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
      }, '-=0.7')
      .fromTo(content3Ref.current, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5')

      // STAGE 3 (70-100%): Smooth fade transition to full tree
      .to(content3Ref.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
      })
      .to(leafRef.current, {
        scale: 1.4,
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
      }, '-=0.3')
      .fromTo(treeRef.current, {
        scale: 1.02,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power1.out',
      }, '-=0.8')
      
      // Content 4 fades in with tree
      .fromTo(content4Ref.current, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.4');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black">

      {/* EARTH (Fixed, doesn't move) */}
      <div className="absolute inset-0">
        <Image
          src="/earth.jpeg"
          alt="Earth from space"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* BLACK CURVED OVERLAY (Rises from bottom) */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-x-0 bottom-0 h-full bg-black"
        style={{
          clipPath: 'polygon(0% 50%, 8% 42%, 20% 38%, 35% 35%, 50% 34%, 65% 35%, 80% 38%, 92% 42%, 100% 50%, 100% 100%, 0% 100%)',
          transform: 'translateY(70%)',
        }}
      />

      {/* CONTENT 1: A Simpler Way Forward */}
      <div
        ref={content1Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-8"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-center mb-16">
          A Simpler Way Forward
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-gray-200 text-lg leading-relaxed">
              Climate action shouldn't feel complicated. We remove confusion and replace it with clarity.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-gray-200 text-lg leading-relaxed">
              One clean interface. One transparent system. One mission.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-gray-200 text-lg leading-relaxed">
              We make understanding, buying, and using carbon credits effortless for everyone.
            </p>
          </div>
        </div>
        
        <p className="text-gray-400 text-center text-lg max-w-3xl">
          Everything you see is exactly what matters—nothing else in your way.
        </p>
      </div>

      {/* CONTENT 2: The Journey of a Carbon Credit */}
      <div
        ref={content2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-8 opacity-0"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-center mb-16">
          The Journey of a Carbon Credit
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-lg leading-relaxed">
              Behind every credit is a story—tracked from project to verification.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-lg leading-relaxed">
              Verified data becomes a secure, traceable digital asset on the blockchain.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-lg leading-relaxed">
              Anyone can explore it, buy it, or retire it in just a few clicks.
            </p>
          </div>
        </div>
        
        <p className="text-gray-300 text-center text-lg max-w-3xl">
          What used to take weeks now happens in one smooth, transparent workflow.
        </p>
      </div>

      {/* CONTENT 3: Clarity Over Complexity */}
      <div
        ref={content3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-8 opacity-0"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-center mb-16">
          Clarity Over Complexity
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-lg leading-relaxed">
              Today's markets are scattered and difficult to follow.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-lg leading-relaxed">
              We bring verification, tokenization, purchase, and retirement together.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-lg leading-relaxed">
              You see exactly where a credit came from—and the impact you create.
            </p>
          </div>
        </div>
        
        <p className="text-gray-300 text-center text-lg max-w-3xl">
          Nothing hidden. Nothing confusing. Just clear, reliable climate action.
        </p>
      </div>

      {/* LEAF MASK (Uses /public/leaf-mask.svg) */}
      <div
        ref={leafRef}
        className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center opacity-0"
        style={{ transformOrigin: 'center bottom' }}
      >
        <div className="w-full max-w-3xl">
          <svg
            viewBox="0 0 400 500"
            className="w-full h-full drop-shadow-2xl"
            style={{
              mask: 'url(/leaf-mask.svg) center/contain no-repeat',
              WebkitMask: 'url(/leaf-mask.svg) center/contain no-repeat',
              maskSize: 'contain',
            }}
          >
            <image
              href="/tree.jpg"
              width="400"
              height="500"
              preserveAspectRatio="xMidYMid slice"
            />
          </svg>
        </div>
      </div>

      {/* FINAL TREE POP */}
      <div ref={treeRef} className="absolute inset-0 opacity-0">
        <Image
          src="/tree.jpg"
          alt="Tree at sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* CONTENT 4: Built for Everyone, Designed for You */}
        <div ref={content4Ref} className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 opacity-0">
          <h1 className="text-5xl md:text-7xl font-serif text-center mb-16">
            Built for Everyone, Designed for You
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
              <p className="text-gray-200 text-lg leading-relaxed">
                Individuals can offset footprints easily and confidently.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
              <p className="text-gray-200 text-lg leading-relaxed">
                Companies get verified data, impact dashboards, and compliance reporting.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
              <p className="text-gray-200 text-lg leading-relaxed">
                Developers get streamlined onboarding, MRV uploads, and minting tools.
              </p>
            </div>
          </div>
          
          <p className="text-gray-400 text-center text-lg max-w-3xl mb-10">
            Every path is guided—so you can focus on making an impact, not navigating complexity.
          </p>

          <Link
            href="/"
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}