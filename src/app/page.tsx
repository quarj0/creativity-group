import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatWeDo from "@/components/WhatWeDo";
import FeaturedProjects from "@/components/FeaturedProjects";
import CommunityStats from "@/components/CommunityStats";
import Events from "@/components/Events";
// import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="bg-background text-white overflow-x-hidden">
      <Hero />
      <About />
      <WhatWeDo />
      <FeaturedProjects />
      <CommunityStats />
      <Events />
      {/* <Testimonials /> */}
      <CTA />
    </main>
  );
}
