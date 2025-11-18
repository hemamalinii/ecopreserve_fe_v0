'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
        y: -50,
        duration: 0.5,
      })
      .fromTo(content2Ref.current, {
        opacity: 0,
        y: 50,
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
        y: -40,
        duration: 0.6,
      }, '-=0.7')
      .fromTo(content3Ref.current, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5')

      // STAGE 3 (70-100%): Smooth fade transition to full tree
      .to(content3Ref.current, {
        opacity: 0,
        y: -40,
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
        y: 70,
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
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/earth.jpeg"
          alt="Earth from space"
          fill
          className="object-cover brightness-75"
          priority
        />
      </motion.div>

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
        <h1 className="text-6xl md:text-8xl poiret-one-regular text-center mb-16">
          <span className="font-bold">A Simpler Way Forward</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-gray-200 text-xl leading-relaxed poiret-one-regular font-semibold">
              Climate action shouldn't feel <span className="font-bold text-blue-400">complicated</span>. We remove confusion and replace it with <span className="font-bold text-green-400">clarity</span>.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-gray-200 text-xl leading-relaxed poiret-one-regular font-semibold">
              <span className="font-bold text-blue-400">One clean interface</span>. <span className="font-bold text-green-400">One transparent system</span>. <span className="font-bold text-blue-400">One mission</span>.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-gray-200 text-xl leading-relaxed poiret-one-regular font-semibold">
              We make <span className="font-bold text-green-400">understanding, buying, and using carbon credits effortless</span> for everyone.
            </p>
          </div>
        </div>
        
        <p className="text-gray-400 text-center text-xl max-w-3xl poiret-one-regular font-bold">
          Everything you see is exactly what matters—<span className="text-blue-400 font-bold">nothing else in your way</span>.
        </p>
      </div>

      {/* CONTENT 2: The Journey of a Carbon Credit */}
      <div
        ref={content2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-8 opacity-0"
      >
        <h1 className="text-6xl md:text-8xl poiret-one-regular text-center mb-16">
          <span className="font-bold">The Journey of a Carbon Credit</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-xl leading-relaxed poiret-one-regular font-semibold">
              Behind every credit is a <span className="font-bold text-green-400">story</span>—tracked from <span className="font-bold text-blue-400">project to verification</span>.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-xl leading-relaxed poiret-one-regular font-semibold">
              Verified data becomes a <span className="font-bold text-green-400">secure, traceable digital asset</span> on the blockchain.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-xl leading-relaxed poiret-one-regular font-semibold">
              Anyone can <span className="font-bold text-blue-400">explore it, buy it, or retire it</span> in just a few clicks.
            </p>
          </div>
        </div>
        
        <p className="text-gray-300 text-center text-xl max-w-3xl poiret-one-regular font-bold">
          What used to take <span className="text-green-400 font-bold">weeks</span> now happens in <span className="text-blue-400 font-bold">one smooth, transparent workflow</span>.
        </p>
      </div>

      {/* CONTENT 3: Clarity Over Complexity */}
      <div
        ref={content3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-8 opacity-0"
      >
        <h1 className="text-6xl md:text-8xl poiret-one-regular text-center mb-16">
          <span className="font-bold">Clarity Over Complexity</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-xl leading-relaxed poiret-one-regular font-semibold">
              Today's markets are <span className="font-bold text-blue-400">scattered and difficult to follow</span>.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-xl leading-relaxed poiret-one-regular font-semibold">
              We bring <span className="font-bold text-green-400">verification, tokenization, purchase, and retirement together</span>.
            </p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-black/70 transition-all shadow-2xl">
            <p className="text-gray-100 text-xl leading-relaxed poiret-one-regular font-semibold">
              You see <span className="font-bold text-blue-400">exactly where a credit came from</span>—and the <span className="font-bold text-green-400">impact you create</span>.
            </p>
          </div>
        </div>
        
        <p className="text-gray-300 text-center text-xl max-w-3xl poiret-one-regular font-bold">
          <span className="text-blue-400 font-bold">Nothing hidden</span>. <span className="text-blue-400 font-bold">Nothing confusing</span>. Just <span className="text-green-400 font-bold">clear, reliable climate action</span>.
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
          <h1 className="text-6xl md:text-8xl poiret-one-regular text-center mb-16">
            <span className="font-bold">Built for Everyone, Designed for You</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
              <p className="text-gray-200 text-xl leading-relaxed poiret-one-regular font-semibold">
                Individuals can <span className="font-bold text-green-400">offset footprints easily and confidently</span>.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
              <p className="text-gray-200 text-xl leading-relaxed poiret-one-regular font-semibold">
                Companies get <span className="font-bold text-blue-400">verified data, impact dashboards, and compliance reporting</span>.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
              <p className="text-gray-200 text-xl leading-relaxed poiret-one-regular font-semibold">
                Developers get <span className="font-bold text-green-400">streamlined onboarding, MRV uploads, and minting tools</span>.
              </p>
            </div>
          </div>
          
          <p className="text-gray-400 text-center text-xl max-w-3xl mb-10 poiret-one-regular font-bold">
            Every path is <span className="text-blue-400 font-bold">guided</span>—so you can focus on <span className="text-green-400 font-bold">making an impact</span>, not navigating complexity.
          </p>

          <button
            onClick={() => window.location.href = '/auth/login'}
            className="inline-block px-12 py-6 bg-blue-500 text-white poiret-one-regular font-bold text-xl rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}