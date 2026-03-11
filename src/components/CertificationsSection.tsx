import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  {
    name: "Terraform Associate (004)",
    issuer: "HashiCorp",
    color: "from-[hsl(270,60%,50%)] to-[hsl(280,70%,60%)]",
    borderHover: "hover:border-[hsl(270,60%,50%)]/50",
    icon: "🏗️",
    credentialId: "HashiCorp Certified",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF / Linux Foundation",
    color: "from-[hsl(210,90%,50%)] to-[hsl(200,80%,60%)]",
    borderHover: "hover:border-[hsl(210,90%,50%)]/50",
    icon: "☸️",
    credentialId: "CKA Certified",
  },
  {
    name: "Big Data Engineer – Mastery Award",
    issuer: "IBM",
    color: "from-[hsl(210,80%,45%)] to-[hsl(220,70%,55%)]",
    borderHover: "hover:border-[hsl(210,80%,45%)]/50",
    icon: "📊",
    credentialId: "IBM Mastery Award",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="certifications" className="py-24" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-primary">// certifications</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Professional Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i + 0.3 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative group p-6 rounded-xl bg-card border border-border ${cert.borderHover} transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <Award size={14} className="text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">{cert.issuer}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight">{cert.name}</h3>

                {/* Credential reveal on hover */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={hoveredIdx === i ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink size={14} className="text-accent" />
                      <span className="font-mono text-muted-foreground">{cert.credentialId}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
