export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Projects", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

export const WHAT_WE_DO = [
  {
    icon: "Cpu",
    title: "STEM Education",
    description:
      "Hands-on STEM programs that build real skills. From circuit design to software architecture, we teach by doing.",
    color: "from-orange-500/20 to-transparent",
  },
  {
    icon: "Wrench",
    title: "Maker Culture",
    description:
      "Build, break, iterate. Our maker labs are equipped for rapid prototyping, electronics, fabrication, and hardware hacking.",
    color: "from-blue-500/20 to-transparent",
  },
  {
    icon: "FlaskConical",
    title: "Innovation Labs",
    description:
      "Dedicated spaces for experimentation and R&D. Turn ideas into testable prototypes with access to tools, mentors, and community.",
    color: "from-purple-500/20 to-transparent",
  },
  {
    icon: "TrendingUp",
    title: "Entrepreneurship",
    description:
      "From side project to startup. We connect builders with resources, networks, and opportunities to commercialize their ideas.",
    color: "from-green-500/20 to-transparent",
  },
  {
    icon: "Bot",
    title: "Robotics",
    description:
      "Design, build, and program autonomous systems. Our robotics teams compete locally and internationally.",
    color: "from-cyan-500/20 to-transparent",
  },
  {
    icon: "Code2",
    title: "Software Engineering",
    description:
      "Full-stack development, open source contribution, and product engineering. We build real software for real problems.",
    color: "from-yellow-500/20 to-transparent",
  },
  {
    icon: "Users",
    title: "Community Events",
    description:
      "Hackathons, workshops, demo days, and tech talks. Regular gatherings that spark collaboration and knowledge sharing.",
    color: "from-pink-500/20 to-transparent",
  },
  {
    icon: "Microscope",
    title: "Research & Prototyping",
    description:
      "Applied research tackling real African challenges — from agri-tech sensors to health diagnostics and clean energy solutions.",
    color: "from-red-500/20 to-transparent",
  },
];

export const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "AgriSense",
    category: "IoT · Agriculture",
    description:
      "A low-cost soil moisture and nutrient monitoring system designed for smallholder farmers in rural Ghana. Wireless sensor nodes relay real-time data to a mobile dashboard.",
    tags: ["Arduino", "LoRa", "React Native", "Python"],
    team: "8 members",
    year: "2024",
    image: "/placeholder-project-1.jpg",
    accent: "#f97316",
  },
  {
    id: 2,
    title: "EduBot GH",
    category: "AI · Education",
    description:
      "An AI-powered tutoring assistant trained on the Ghanaian curriculum. Helps JHS and SHS students with math, science, and English via WhatsApp and web.",
    tags: ["LLM", "NLP", "WhatsApp API", "Next.js"],
    team: "5 members",
    year: "2024",
    image: "/placeholder-project-2.jpg",
    accent: "#3b82f6",
  },
  {
    id: 3,
    title: "ROVER-X",
    category: "Robotics · Engineering",
    description:
      "A semi-autonomous exploration rover built for the West Africa Robotics Championship. Features computer vision obstacle avoidance and remote telemetry.",
    tags: ["ROS", "OpenCV", "C++", "Raspberry Pi"],
    team: "12 members",
    year: "2023",
    image: "/placeholder-project-3.jpg",
    accent: "#8b5cf6",
  },
  {
    id: 4,
    title: "Paystream",
    category: "Fintech · Mobile",
    description:
      "A peer-to-peer micro-lending platform connecting university students with small financial needs to community lenders via mobile money.",
    tags: ["Flutter", "Firebase", "MTN MoMo API"],
    team: "4 members",
    year: "2024",
    image: "/placeholder-project-4.jpg",
    accent: "#10b981",
  },
  {
    id: 5,
    title: "MakerOS",
    category: "Platform · Community",
    description:
      "An open-source platform for managing maker community resources — lab bookings, equipment inventory, project tracking, and member profiles.",
    tags: ["Next.js", "PostgreSQL", "TypeScript", "Prisma"],
    team: "6 members",
    year: "2025",
    image: "/placeholder-project-5.jpg",
    accent: "#f59e0b",
  },
  {
    id: 6,
    title: "HealthTrack GH",
    category: "Healthtech · Data",
    description:
      "A community health monitoring system for rural clinics. Lightweight data entry on feature phones, synced to a central dashboard for health workers.",
    tags: ["USSD", "Django", "Postgres", "Chart.js"],
    team: "7 members",
    year: "2023",
    image: "/placeholder-project-6.jpg",
    accent: "#ef4444",
  },
];

export const COMMUNITY_STATS = [
  { value: 2400, label: "Community Members", suffix: "+" },
  { value: 180, label: "Projects Built", suffix: "+" },
  { value: 95, label: "Workshops Held", suffix: "+" },
  { value: 12, label: "Campuses", suffix: "" },
  { value: 40, label: "Startups Supported", suffix: "+" },
];

export const EVENTS = [
  {
    id: 1,
    date: "Jun 14–15, 2025",
    title: "CG Hackathon: Build for Africa",
    type: "Hackathon",
    location: "KNUST Innovation Hub, Kumasi",
    description:
      "48 hours to ideate, prototype, and pitch solutions to pressing challenges facing Ghanaian communities. Open to all skill levels.",
    spots: "200 spots",
    accent: "#f97316",
  },
  {
    id: 2,
    date: "Jul 5, 2025",
    title: "Maker Faire Ghana 2025",
    type: "Exhibition",
    location: "University of Ghana, Legon",
    description:
      "Ghana's biggest celebration of making and tinkering. Showcase your projects, see demos from top makers, and connect with the community.",
    spots: "Open to public",
    accent: "#3b82f6",
  },
  {
    id: 3,
    date: "Jul 19, 2025",
    title: "STEM Career Summit",
    type: "Conference",
    location: "Accra Digital Centre",
    description:
      "Connecting students with industry leaders, startup founders, and researchers to map career pathways in tech and engineering.",
    spots: "300 spots",
    accent: "#8b5cf6",
  },
  {
    id: 4,
    date: "Aug 2–30, 2025",
    title: "30-Day Build Challenge",
    type: "Online Challenge",
    location: "Online — Discord & GitHub",
    description:
      "Build one project a week for a month. Weekly themes, live reviews from mentors, and prizes for top submissions.",
    spots: "Unlimited",
    accent: "#10b981",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Abena Mensah",
    role: "Software Engineer, Hubtel",
    cohort: "CG Alumni, 2022",
    quote:
      "CG gave me something university couldn't — real projects, real feedback, and a community that pushed me to ship. I landed my first job because of a project I built at a CG hackathon.",
    avatar: "/placeholder-avatar-1.jpg",
  },
  {
    id: 2,
    name: "Kwame Asante",
    role: "Founder, AgriSense Technologies",
    cohort: "CG Alumni, 2021",
    quote:
      "The maker culture at CG is infectious. I walked in knowing nothing about hardware. Two years later I was building IoT sensors for farmers. Now it's a company with paying customers.",
    avatar: "/placeholder-avatar-2.jpg",
  },
  {
    id: 3,
    name: "Ama Darko",
    role: "Robotics Engineer, Voltic GH",
    cohort: "CG Alumni, 2023",
    quote:
      "Watching our ROVER-X navigate an obstacle course at the West Africa Robotics Championship was surreal. CG taught me that students in Ghana can build world-class systems.",
    avatar: "/placeholder-avatar-3.jpg",
  },
  {
    id: 4,
    name: "Emmanuel Ofori",
    role: "Product Manager, Zeepay",
    cohort: "CG Alumni, 2022",
    quote:
      "The entrepreneurship program didn't just teach business — it taught me how to think. How to find a real problem, validate it, and build something people actually want.",
    avatar: "/placeholder-avatar-4.jpg",
  },
];

export const FOOTER_LINKS = {
  explore: [
    { label: "About Us", href: "#about" },
    { label: "Our Programs", href: "#programs" },
    { label: "Projects", href: "#projects" },
    { label: "Events", href: "#events" },
    { label: "Blog", href: "#blog" },
  ],
  community: [
    { label: "Join CG", href: "/join" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Alumni Network", href: "#alumni" },
  ],
  resources: [
    { label: "Maker Labs", href: "#labs" },
    { label: "Open Projects", href: "https://github.com" },
    { label: "Workshops", href: "#workshops" },
    { label: "Mentorship", href: "/mentorship" },
    { label: "Sponsorship", href: "/sponsorship" },
  ],
};
