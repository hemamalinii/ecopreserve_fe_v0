'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coalRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const glassCubeRef = useRef<HTMLDivElement>(null);
  const plantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([coalRef.current, cubeRef.current, glassCubeRef.current, plantRef.current], {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        zIndex: 50
      });

      gsap.set(coalRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0
      });

      gsap.set([cubeRef.current, glassCubeRef.current, plantRef.current], {
        opacity: 0,
        scale: 0.5
      });

      // SECTION 1: Coal is visible and static
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-1',
          start: 'top top',
          end: 'bottom center',
          scrub: 1,
          onEnter: () => gsap.to(coalRef.current, { opacity: 1, duration: 0.5 }),
        }
      });

      // TRANSITION 1→2: Coal transforms to Cube
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.transition-1-2',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

      tl1
        .to(coalRef.current, {
          rotation: 360,
          scale: 1.3,
          ease: 'power2.in',
          duration: 0.3
        })
        .to(coalRef.current, {
          scale: 2.2,
          opacity: 0,
          filter: 'blur(20px)',
          duration: 0.2
        })
        .fromTo(cubeRef.current, {
          opacity: 0,
          scale: 2.2,
          rotation: -180,
          filter: 'blur(20px)'
        }, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.3,
          ease: 'power2.out'
        }, '-=0.1');

      // SECTION 2: Cube is visible and rotates gently
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-2',
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        }
      }).to(cubeRef.current, {
        rotation: 180,
        scale: 1.1,
        ease: 'none'
      });

      // TRANSITION 2→3: Cube transforms to Glass Cube
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.transition-2-3',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

      tl2
        .to(cubeRef.current, {
          rotation: 540,
          scale: 1.4,
          ease: 'power2.in',
          duration: 0.3
        })
        .to(cubeRef.current, {
          scale: 2.4,
          opacity: 0,
          filter: 'blur(25px)',
          duration: 0.2
        })
        .fromTo(glassCubeRef.current, {
          opacity: 0,
          scale: 2.4,
          rotation: -270,
          filter: 'blur(25px)'
        }, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.3,
          ease: 'power2.out'
        }, '-=0.1');

      // SECTION 3: Glass Cube is visible and shimmers
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-3',
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        }
      }).to(glassCubeRef.current, {
        rotation: 90,
        scale: 1.05,
        ease: 'none'
      });

      // TRANSITION 3→4: Glass Cube transforms to Plant
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: '.transition-3-4',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

      tl3
        .to(glassCubeRef.current, {
          rotation: 450,
          scale: 1.5,
          ease: 'power2.in',
          duration: 0.3
        })
        .to(glassCubeRef.current, {
          scale: 2.6,
          opacity: 0,
          filter: 'blur(30px)',
          duration: 0.2
        })
        .fromTo(plantRef.current, {
          opacity: 0,
          scale: 0.3,
          rotation: -30,
          filter: 'blur(15px)'
        }, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        }, '-=0.1');

      // SECTION 4: Plant gently sways
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-4',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 3,
        }
      }).to(plantRef.current, {
        rotation: 8,
        scale: 1.08,
        ease: 'sine.inOut'
      });

      // Text fade-in animations
      gsap.utils.toArray('.text-content').forEach((elem: any) => {
        gsap.fromTo(elem, {
          opacity: 0,
          y: 40
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@300;400;600;700&display=swap" rel="stylesheet" />
    
      {/* Fixed position containers for morphing images */}
      <div ref={coalRef} className="pointer-events-none">
        <img
          src="/coal.png"
          alt="Coal"
          className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
          style={{ filter: 'drop-shadow(0 30px 80px rgba(255, 255, 255, 0.4))' }}
        />
      </div>
      <div ref={cubeRef} className="pointer-events-none">
        <img
          src="/cube.png"
          alt="Carbon Credit Cube"
          className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
          style={{ filter: 'drop-shadow(0 35px 90px rgba(150, 150, 150, 0.5))' }}
        />
      </div>
      <div ref={glassCubeRef} className="pointer-events-none">
        <img
          src="/glass.png"
          alt="Glass Cube"
          className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
          style={{ filter: 'drop-shadow(0 40px 100px rgba(200, 200, 255, 0.6))' }}
        />
      </div>
      <div ref={plantRef} className="pointer-events-none">
        <img
          src="/plant.png"
          alt="Growing Plant"
          className="w-72 h-72 lg:w-96 lg:h-96 object-contain"
          style={{ filter: 'drop-shadow(0 35px 90px rgba(100, 255, 100, 0.5))' }}
        />
      </div>

      {/* Section 1: Hero with Coal */}
      <section className="section-1 min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-content max-w-xl mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-7xl mb-8 font-light" style={{ fontFamily: "'Josefin Slab', serif" }}>
              A Simpler Way Forward
            </h1>
            <p className="text-lg lg:text-xl mb-6 leading-relaxed" style={{ fontFamily: "'Josefin Slab', serif" }}>
              Climate action shouldn't feel <span className="font-semibold">complicated</span>.
            </p>
            <p className="text-lg lg:text-xl leading-relaxed" style={{ fontFamily: "'Josefin Slab', serif" }}>
              That's why we built a platform that takes the <span className="italic">confusion</span> out of carbon credits and replaces it with <span className="font-semibold">clarity</span>.
            </p>
          </div>
        
          {/* Placeholder for coal image */}
          <div className="w-96 h-96 lg:w-[32rem] lg:h-[32rem]"></div>
          
          <div className="text-content max-w-md text-right">
            <p className="text-xl lg:text-2xl mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
              One clean interface.
            </p>
            <p className="text-xl lg:text-2xl mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
              One transparent system.
            </p>
            <p className="text-xl lg:text-2xl font-semibold" style={{ fontFamily: "'Josefin Slab', serif" }}>
              One mission:
            </p>
          </div>
        </div>
        <div className="absolute bottom-12 left-8 lg:left-16 text-content max-w-md">
          <p className="text-lg lg:text-xl mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
            We make <span className="font-semibold">understanding, buying, and using carbon credits effortless for everyone</span>.
          </p>
          <p className="text-base lg:text-lg leading-relaxed" style={{ fontFamily: "'Josefin Slab', serif" }}>
            As you enter, you see exactly what matters—<span className="font-semibold">verified projects, transparent data</span>, and <span className="font-semibold">easy tools to take real action</span>. Everything else stays out of your way.
          </p>
        </div>
      </section>

      {/* Transition Section 1→2 */}
      <section className="transition-1-2 h-screen flex items-center justify-center">
        <div className="text-content text-center max-w-2xl px-8">
          <p className="text-3xl lg:text-4xl font-light italic" style={{ fontFamily: "'Josefin Slab', serif" }}>
            From carbon to credit...
          </p>
        </div>
      </section>

      {/* Section 2: Journey of a Carbon Credit with Cube */}
      <section className="section-2 min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-center text-5xl lg:text-6xl mb-16 font-light" style={{ fontFamily: "'Josefin Slab', serif" }}>
            The Journey of a Carbon Credit
          </h2>
        
          <div className="flex flex-col lg:flex-row items-center justify-around gap-12">
            <div className="text-content max-w-xs">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                Behind every credit is a <span className="font-semibold">story</span>—and we make it easy to follow.
              </p>
            </div>
            {/* Placeholder for cube */}
            <div className="w-96 h-96 lg:w-[32rem] lg:h-[32rem]"></div>
            <div className="text-content max-w-xs">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                A <span className="font-semibold">climate project</span> uploads its details and MRV documents.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-around gap-12 mt-16">
            <div className="text-content max-w-xs">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                <span className="font-semibold">Independent verifiers</span> step in to review the data.
              </p>
            </div>
            <div className="text-content max-w-xs">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                Once <span className="font-semibold">approved</span>, each credit is <span className="font-semibold">tokenized</span>, becoming a <span className="font-semibold">secure, traceable digital asset</span> on the blockchain.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-around gap-12 mt-16">
            <div className="text-content max-w-xs">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                From there, anyone can <span className="font-semibold">explore it, buy it, or retire it</span> in just a few clicks.
              </p>
            </div>
            <div className="text-content max-w-md text-right">
              <p className="text-lg italic" style={{ fontFamily: "'Josefin Slab', serif" }}>
                What used to take weeks of paperwork and searching across multiple registries now happens in <span className="font-semibold">one smooth workflow, right here</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section 2→3 */}
      <section className="transition-2-3 h-screen flex items-center justify-center">
        <div className="text-content text-center max-w-2xl px-8">
          <p className="text-3xl lg:text-4xl font-light italic" style={{ fontFamily: "'Josefin Slab', serif" }}>
            Crystallizing transparency...
          </p>
        </div>
      </section>

      {/* Section 3: Why This Matters with Glass Cube */}
      <section className="section-3 min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-center text-5xl lg:text-6xl mb-16 font-light" style={{ fontFamily: "'Josefin Slab', serif" }}>
            Why This Matters:<br />Clarity Over Complexity
          </h2>
        
          <div className="flex flex-col lg:flex-row items-center justify-around gap-12">
            <div className="text-content max-w-md">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                Today's carbon markets are scattered and <span className="italic">easy to misunderstand</span>.
              </p>
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                Data lives in different places. Verification is <span className="italic">slow</span>. Tracking your actual impact feels <span className="font-semibold">impossible</span>.
              </p>
            </div>
            {/* Placeholder for glass cube */}
            <div className="w-96 h-96 lg:w-[32rem] lg:h-[32rem]"></div>
            <div className="text-content max-w-md">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                We fix that by bringing <span className="font-semibold">every step</span>—upload, verification, tokenization, purchase, retirement—into <span className="font-semibold">one transparent system</span>.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-around gap-12 mt-16">
            <div className="text-content max-w-md">
              <p className="text-xl mb-4 font-semibold" style={{ fontFamily: "'Josefin Slab', serif" }}>
                The result?
              </p>
              <p className="text-lg leading-relaxed" style={{ fontFamily: "'Josefin Slab', serif" }}>
                You see exactly where a credit came from, how it was verified, and what impact it creates <span className="font-semibold">the moment you retire it</span>.
              </p>
            </div>
            <div className="text-content max-w-md text-right">
              <p className="text-lg mb-2" style={{ fontFamily: "'Josefin Slab', serif" }}>
                Nothing hidden. Nothing confusing.
              </p>
              <p className="text-xl font-semibold italic" style={{ fontFamily: "'Josefin Slab', serif" }}>
                Just clear, reliable climate action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section 3→4 */}
      <section className="transition-3-4 h-screen flex items-center justify-center">
        <div className="text-content text-center max-w-2xl px-8">
          <p className="text-3xl lg:text-4xl font-light italic" style={{ fontFamily: "'Josefin Slab', serif" }}>
            Growing real impact...
          </p>
        </div>
      </section>

      {/* Section 4: Built for Everyone with Plant */}
      <section className="section-4 min-h-screen flex items-center justify-center relative pb-20">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-center text-5xl lg:text-6xl mb-16 font-light" style={{ fontFamily: "'Josefin Slab', serif" }}>
            Built for Everyone,<br />Designed for You.
          </h2>
        
          <div className="flex flex-col lg:flex-row items-center justify-around gap-12">
            <div className="text-content max-w-md">
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                Whether you're an individual looking to <span className="font-semibold">offset your footprint</span>,
              </p>
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                a company working toward <span className="font-semibold">sustainability goals</span>,
              </p>
              <p className="text-lg mb-4" style={{ fontFamily: "'Josefin Slab', serif" }}>
                or a project developer bringing <span className="font-semibold">climate solutions</span> to life—
              </p>
              <p className="text-lg font-semibold" style={{ fontFamily: "'Josefin Slab', serif" }}>
                our platform adapts to you.
              </p>
            </div>
            {/* Placeholder for plant */}
            <div className="w-96 h-96 lg:w-[34rem] lg:h-[34rem]"></div>
            <div className="text-content max-w-md">
              <p className="text-lg mb-6" style={{ fontFamily: "'Josefin Slab', serif" }}>
                <span className="font-semibold">Individuals</span> get a simple way to <span className="italic">buy and retire credits</span>.
              </p>
              <p className="text-lg mb-6" style={{ fontFamily: "'Josefin Slab', serif" }}>
                <span className="font-semibold">Companies</span> get <span className="italic">verified data and impact reporting</span>.
              </p>
              <p className="text-lg" style={{ fontFamily: "'Josefin Slab', serif" }}>
                <span className="font-semibold">Developers</span> get <span className="italic">streamlined onboarding, MRV uploads, and minting tools</span>.
              </p>
            </div>
          </div>
          <div className="text-content text-center max-w-2xl mx-auto mt-16">
            <p className="text-xl mb-6 italic" style={{ fontFamily: "'Josefin Slab', serif" }}>
              Everything flows naturally, <span className="font-semibold">built to guide you</span> from start to finish—
            </p>
            <p className="text-xl font-semibold" style={{ fontFamily: "'Josefin Slab', serif" }}>
              so you can focus on making an impact, not figuring out the system.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}