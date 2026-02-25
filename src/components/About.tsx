import { useEffect, useRef, useState } from "react";

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

const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Done", value: "10+" },
  { label: "Certifications", value: "5+" },
  { label: "Happy Clients", value: "15+" },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(https://mgx-backend-cdn.metadl.com/generate/images/977523/2026-02-24/cd6bb98c-27a1-46b9-934c-f0de9640dfc7.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#ffae00] text-sm font-semibold uppercase tracking-widest">Get to know me</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            About <span className="bg-gradient-to-r from-[#ffae00] to-[#ff6b00] bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ffae00] to-[#ff6b00] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ffae00]/20 to-[#ff6b00]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/assets/profile.png"
                  alt="About Yongki"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div
            className={`transition-all duration-700 delay-400 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Junior Network Engineer & IT Enthusiast
            </h3>
            <p className="text-white/60 leading-relaxed mb-4">
              Hello! I'm Yongki Wahyu Prabowo, a passionate IT professional with a strong interest 
              in Networking and Programming. Currently working at a Telecommunication company as 
              Network Operation Center (NOC) staff.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              I love exploring new technologies, building solutions, and continuously improving my 
              skills in network infrastructure, system administration, and software development. 
              My goal is to become a well-rounded IT professional who can bridge the gap between 
              networking and development.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#ffae00]/30 transition-all duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#ffae00] to-[#ff6b00] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}