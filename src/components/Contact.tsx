import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+62 858-726-914-35",
    href: "https://api.whatsapp.com/send/?phone=6285872691435",
  },
  {
    icon: Mail,
    label: "Email",
    value: "yongkiwahyu254@gmail.com",
    href: "mailto:yongkiwahyu254@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Indonesia",
    href: "#",
  },
];

export default function Contact() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d18] to-[#0a0a0f]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#ffae00] text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Contact{" "}
            <span className="bg-gradient-to-r from-[#ffae00] to-[#ff6b00] bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ffae00] to-[#ff6b00] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Let's work together</h3>
            <p className="text-white/50 leading-relaxed mb-8">
              Feel free to reach out if you have any questions, want to collaborate, or just want to say hello.
              I'm always open to new opportunities and connections.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#ffae00]/30 transition-all duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffae00]/10 to-[#ff6b00]/10 border border-[#ffae00]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-5 h-5 text-[#ffae00]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">{info.label}</div>
                    <div className="text-white font-medium group-hover:text-[#ffae00] transition-colors duration-300">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
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
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/50 hover:text-[#ffae00] hover:border-[#ffae00]/30 hover:bg-[#ffae00]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <i className={`bx ${social.icon} text-xl`} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-400 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <form
              className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#ffae00]/40 focus:bg-white/[0.06] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#ffae00]/40 focus:bg-white/[0.06] transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#ffae00]/40 focus:bg-white/[0.06] transition-all duration-300"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#ffae00]/40 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#ffae00] to-[#ff8c00] text-[#0a0a0f] font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,174,0,0.3)] hover:scale-[1.02]"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-white/30 text-sm">
            © 2024 Yongki Wahyu Prabowo. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
