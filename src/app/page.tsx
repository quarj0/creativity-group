import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatWeDo from "@/components/WhatWeDo";
import FeaturedProjects from "@/components/FeaturedProjects";
import Events from "@/components/Events";
// import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { getHomepageData } from "@/lib/backend";

export default async function Home() {
  const { programs, projects, events } = await getHomepageData();

  return (
    <main className="bg-background text-white overflow-x-hidden">
      <Hero />
      <About />
      <WhatWeDo programs={programs} />
      <FeaturedProjects projects={projects} />
      <Events events={events} />
      {/* <Testimonials /> */}
      <CTA />
    </main>
  );
}
