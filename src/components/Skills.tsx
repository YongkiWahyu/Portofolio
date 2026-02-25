import { useEffect, useRef, useState, useCallback } from "react";

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

const skills = [
  {
    title: "Network Engineering",
    description: "Cisco, MikroTik, routing & switching, VLAN, VPN, firewall configuration, and network monitoring.",
    icon: "🌐",
    color: "#ffae00",
  },
  {
    title: "Network Operation Center",
    description: "24/7 network monitoring, incident management, troubleshooting, and performance optimization.",
    icon: "📡",
    color: "#ff6b00",
  },
  {
    title: "System Administration",
    description: "Linux/Windows server management, virtualization, cloud services, and infrastructure maintenance.",
    icon: "🖥️",
    color: "#00d4ff",
  },
  {
    title: "Web Development",
    description: "HTML, CSS, JavaScript, responsive design, and modern web frameworks for building applications.",
    icon: "💻",
    color: "#a855f7",
  },
  {
    title: "Database Management",
    description: "MySQL, PostgreSQL, database design, optimization, backup strategies, and data management.",
    icon: "🗄️",
    color: "#22c55e",
  },
  {
    title: "IT Security",
    description: "Network security, penetration testing basics, security auditing, and best practices implementation.",
    icon: "🔒",
    color: "#ef4444",
  },
];

// 3D Tilt Card Component
function TiltCard({
  children,
  className = "",
  index,
  inView,
}: {
  children: React.ReactNode;
  className?: string;
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

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);

    // Glare effect
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
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
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transitionDelay: inView ? `${index * 100}ms` : "0ms",
        opacity: inView ? 1 : 0,
        translate: inView ? "0 0" : "0 30px",
        transitionProperty: "transform, opacity, translate",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={glareStyle}
      />
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d18] to-[#0a0a0f]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#ffae00] text-sm font-semibold uppercase tracking-widest">What I Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            My <span className="bg-gradient-to-r from-[#ffae00] to-[#ff6b00] bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ffae00] to-[#ff6b00] mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <TiltCard key={skill.title} index={i} inView={inView}>
              <div
                className="relative h-full p-6 rounded-2xl border border-white/[0.06] overflow-hidden group cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${skill.color}10 0%, transparent 70%)`,
                  }}
                />
                {/* Top border glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
                      border: `1px solid ${skill.color}20`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ffae00] transition-colors duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}