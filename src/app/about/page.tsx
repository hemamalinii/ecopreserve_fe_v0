"use client";

import SectionContainer from "@/components/landing/SectionContainer";
import SubCard from "@/components/landing/SubCard";
import Conclusion from "@/components/landing/Conclusion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-background">

      {/* SECTION 1 */}
      <SectionContainer title="A Simpler Way Forward">

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <SubCard delay={0.1}>
            Climate action shouldn’t feel complicated.  
            We remove confusion and replace it with clarity.
          </SubCard>

          <SubCard delay={0.2}>
            One clean interface.  
            One transparent system.  
            One mission.
          </SubCard>

          <SubCard delay={0.3}>
            We make understanding, buying, and using carbon credits effortless for everyone.
          </SubCard>

        </div>

        <Conclusion>
          Everything you see is exactly what matters—nothing else in your way.
        </Conclusion>

      </SectionContainer>



      {/* SECTION 2 */}
      <SectionContainer title="The Journey of a Carbon Credit">

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <SubCard delay={0.1}>
            Behind every credit is a story—tracked from project to verification.
          </SubCard>

          <SubCard delay={0.2}>
            Verified data becomes a secure, traceable digital asset on the blockchain.
          </SubCard>

          <SubCard delay={0.3}>
            Anyone can explore it, buy it, or retire it in just a few clicks.
          </SubCard>

        </div>

        <Conclusion>
          What used to take weeks now happens in one smooth, transparent workflow.
        </Conclusion>

      </SectionContainer>



      {/* SECTION 3 */}
      <SectionContainer title="Clarity Over Complexity">

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <SubCard delay={0.1}>
            Today’s markets are scattered and difficult to follow.
          </SubCard>

          <SubCard delay={0.2}>
            We bring verification, tokenization, purchase, and retirement together.
          </SubCard>

          <SubCard delay={0.3}>
            You see exactly where a credit came from—and the impact you create.
          </SubCard>

        </div>

        <Conclusion>
          Nothing hidden. Nothing confusing. Just clear, reliable climate action.
        </Conclusion>

      </SectionContainer>



      {/* SECTION 4 */}
      <SectionContainer title="Built for Everyone, Designed for You">

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <SubCard delay={0.1}>
            Individuals can offset footprints easily and confidently.
          </SubCard>

          <SubCard delay={0.2}>
            Companies get verified data, impact dashboards, and compliance reporting.
          </SubCard>

          <SubCard delay={0.3}>
            Developers get streamlined onboarding, MRV uploads, and minting tools.
          </SubCard>

        </div>

        <Conclusion>
          Every path is guided—so you can focus on making an impact, not navigating complexity.
        </Conclusion>

      </SectionContainer>



      {/* BACK */}
      <div className="text-center py-20">
        <Link
          href="/"
          className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>

    </div>
  );
}
