import { useEffect, useState, useRef } from "react";

const titles = [
  "Junior Network Engineer",
  "Network Operation Center",
  "IT Enthusiast",
  "Programmer",
];

function useTypingEffect(texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentText.substring(0, displayText.length - 1)
              : currentText.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

// Particle background
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 174, 0, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 174, 0, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

export default function Hero() {
  const typedText = useTypingEffect(titles);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d0d15 50%, #0a0a0f 100%)",
      }}
    >
      <ParticleCanvas />

      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(https://mgx-backend-cdn.metadl.com/generate/images/977523/2026-02-24/9339cc4d-0d7b-4ab5-8f1c-ea8991405eda.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 pt-20">
        {/* Text Content */}
        <div
          className={`flex-1 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ffae00]/10 to-transparent border border-[#ffae00]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ffae00] animate-pulse" />
            <span className="text-[#ffae00] text-sm font-semibold uppercase tracking-wider">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Yongki Wahyu
            <br />
            <span className="bg-gradient-to-r from-[#ffae00] to-[#ff6b00] bg-clip-text text-transparent">
              Prabowo
            </span>
          </h1>

          <p className="text-white/60 text-lg max-w-lg mb-8 leading-relaxed">
            I'm interested all about IT, especially in Networking and Programming.
            I'm currently working at Telecommunication company as Network Operation Center.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://drive.google.com/file/d/1zbva69KFDz_zddVzJH6mPfiaLxruvpPH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#ffae00] to-[#ff8c00] text-[#0a0a0f] font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,174,0,0.4)] hover:scale-105"
            >
              <span className="relative z-10">Download CV</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c00] to-[#ffae00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=6281328813613&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl transition-all duration-300 hover:border-[#ffae00] hover:text-[#ffae00] hover:shadow-[0_0_20px_rgba(255,174,0,0.15)] hover:scale-105"
            >
              Hire Me Now
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-10">
            <span className="text-white/40 text-sm">Check out my:</span>
            {[
              { icon: "bxl-facebook-circle", url: "https://web.facebook.com/yongki.w.prabowo" },
              { icon: "bxl-linkedin-square", url: "https://www.linkedin.com/in/yongkiwahyu/" },
              { icon: "bxl-github", url: "https://github.com/YongkiWahyu" },
              { icon: "bxl-instagram", url: "https://www.instagram.com/yngkiwhyu_/" },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#ffae00] hover:border-[#ffae00]/40 hover:bg-[#ffae00]/10 hover:shadow-[0_0_15px_rgba(255,174,0,0.2)] transition-all duration-300 hover:-translate-y-1"
              >
                <i className={`bx ${social.icon} text-lg`} />
              </a>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div
          className={`flex-shrink-0 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#ffae00]/20 to-[#ff6b00]/20 blur-2xl animate-pulse" />
            {/* Rotating border */}
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#ffae00]/20 animate-[spin_20s_linear_infinite]" />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-[#ffae00]/30 animate-float">
              <img
                src="/assets/cat.png"
                alt="Yongki Wahyu Prabowo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#ffae00] animate-pulse" />
        </div>
      </div>
    </section>
  );
}