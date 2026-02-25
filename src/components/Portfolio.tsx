import { useEffect, useRef, useState, useCallback } from "react";
import { ExternalLink } from "lucide-react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const projects = [
  {
    title: "Network Infrastructure Setup",
    category: "Networking",
    description: "Designed and implemented enterprise network infrastructure with VLAN segmentation, VPN tunnels, and redundant routing protocols.",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/977523/2026-02-24/c1d9cf90-7838-4159-a1b2-3102e4f01851.png",
    tags: ["Cisco", "MikroTik", "VLAN", "VPN"],
  },
  {
    title: "NOC Monitoring Dashboard",
    category: "Development",
    description: "Built a real-time network monitoring dashboard for tracking uptime, bandwidth usage, and alert management across multiple sites.",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/977523/2026-02-24/cd6bb98c-27a1-46b9-934c-f0de9640dfc7.png",
    tags: ["JavaScript", "API", "Monitoring"],
  },
  {
    title: "Web Portfolio Project",
    category: "Development",
    description: "Personal portfolio website showcasing skills and projects, built with modern web technologies and responsive design.",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/977523/2026-02-24/ee1dfc1b-dc89-4d66-960c-ded3a74e6d50.png",
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle({ opacity: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer transition-all duration-300 ease-out"
      style={{
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transitionDelay: inView ? `${index * 150}ms` : "0ms",
        opacity: inView ? 1 : 0,
        translate: inView ? "0 0" : "0 40px",
        transitionProperty: "transform, opacity, translate",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#ffae00]/20 border border-[#ffae00]/30 text-[#ffae00] text-xs font-semibold">
            {project.category}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#ffae00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#ffae00] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
              <ExternalLink className="w-5 h-5 text-[#0a0a0f]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ffae00] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/50 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={glareStyle}
      />
    </div>
  );
}

export default function Portfolio() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="portfolio" className="relative py-24">
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#ffae00] text-sm font-semibold uppercase tracking-widest">My Work</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Recent{" "}
            <span className="bg-gradient-to-r from-[#ffae00] to-[#ff6b00] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ffae00] to-[#ff6b00] mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}