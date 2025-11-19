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

      tl.to(content1Ref.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
      })
        .fromTo(
          content2Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.2'
        )

        .fromTo(
          blackOverlayRef.current,
          { yPercent: 70 },
          { yPercent: 0, duration: 1.5, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          leafRef.current,
          { scale: 0.2, yPercent: 100, opacity: 0 },
          { scale: 0.8, yPercent: 0, opacity: 1, duration: 1.2 },
          '-=1.2'
        )

        .to(leafRef.current, { scale: 1.3, duration: 1 })
        .to(
          content2Ref.current,
          { opacity: 0, y: -40, duration: 0.6 },
          '-=0.7'
        )
        .fromTo(
          content3Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )

        .to(content3Ref.current, { opacity: 0, y: -40, duration: 0.6 })
        .to(
          leafRef.current,
          {
            scale: 1.4,
            opacity: 0,
            duration: 1,
            ease: 'power1.inOut',
          },
          '-=0.3'
        )
        .fromTo(
          treeRef.current,
          { scale: 1.02, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power1.out' },
          '-=0.8'
        )

        .fromTo(
          content4Ref.current,
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black">

      {/* EARTH */}
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

      {/* BLACK OVERLAY */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-x-0 bottom-0 h-full bg-black"
        style={{
          clipPath:
            'polygon(0% 50%, 8% 42%, 20% 38%, 35% 35%, 50% 34%, 65% 35%, 80% 38%, 92% 42%, 100% 50%, 100% 100%, 0% 100%)',
          transform: 'translateY(70%)',
        }}
      />

      {/* CONTENT 1 */}
      <div
        ref={content1Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-8"
      >
        <h1 className="text-6xl md:text-8xl text-center mb-16 font-bold">
          A Simpler Way Forward
        </h1>
      </div>

      {/* CONTENT 2 */}
      <div
        ref={content2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-8 opacity-0"
      >
        <h1 className="text-6xl md:text-8xl text-center mb-16 font-bold">
          The Journey of a Carbon Credit
        </h1>
      </div>

      {/* CONTENT 3 */}
      <div
        ref={content3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-8 opacity-0"
      >
        <h1 className="text-6xl md:text-8xl text-center mb-16 font-bold">
          Clarity Over Complexity
        </h1>
      </div>

      {/* LEAF MASK */}
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

      {/* FINAL TREE */}
      <div ref={treeRef} className="absolute inset-0 opacity-0">
        <Image
          src="/tree.jpg"
          alt="Tree at sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div
          ref={content4Ref}
          className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 opacity-0"
        >
          <h1 className="text-6xl md:text-8xl text-center mb-16 font-bold">
            Built for Everyone, Designed for You
          </h1>

          <button
            onClick={() => (window.location.href = '/auth/login')}
            className="px-12 py-6 bg-blue-500 text-white font-bold text-xl rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* ✨ FINAL STATIC MESSAGE BLOCK (WITH TWO BUTTONS) */}
      <div className="absolute bottom-10 w-full flex flex-col items-center text-center z-[999] px-4">

        <p className="text-white text-3xl md:text-4xl font-bold drop-shadow-xl mb-6">
          here’s to building a carbon-ready earth.
        </p>

        <div className="flex flex-col md:flex-row gap-4">

          <button
            onClick={() => (window.location.href = '/about')}
            className="px-10 py-4 bg-white/10 border border-white/20 text-white text-lg font-semibold rounded-full backdrop-blur-md hover:bg-white/20 transition-all shadow-lg hover:shadow-xl"
          >
            About Us
          </button>

          <button
            onClick={() => (window.location.href = '/auth/login')}
            className="px-10 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>

        </div>

      </div>

    </div>
  );
}
