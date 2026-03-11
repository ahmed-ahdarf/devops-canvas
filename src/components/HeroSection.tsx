import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const terminalLines = [
  { prefix: "~$", text: "whoami", delay: 0.5 },
  { prefix: ">", text: "Ahmed AHDARF — DevOps Engineer", delay: 1.2 },
  { prefix: "~$", text: "cat expertise.txt", delay: 2.0 },
  { prefix: ">", text: "Kubernetes | CI/CD | Cloud Infrastructure | IaC", delay: 2.8 },
  { prefix: "~$", text: "kubectl get pods --all-namespaces | grep running", delay: 3.6 },
  { prefix: ">", text: "All systems operational ✓", delay: 4.4 },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{ x: Math.random() * 1200, y: Math.random() * 800, opacity: 0 }}
          animate={{
            y: [Math.random() * 800, Math.random() * 800 - 200],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-card/90 backdrop-blur-md rounded-xl border border-border overflow-hidden shadow-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-pipeline-warning/70" />
            <div className="w-3 h-3 rounded-full bg-primary/70" />
            <span className="ml-3 text-xs font-mono text-muted-foreground">ahmed@devops-portfolio:~</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm space-y-2">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.4 }}
                className="flex gap-2"
              >
                <span className={line.prefix === "~$" ? "text-primary" : "text-accent"}>{line.prefix}</span>
                <span className={line.prefix === "~$" ? "text-foreground" : "text-muted-foreground"}>{line.text}</span>
              </motion.div>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
              className="inline-block w-2.5 h-5 bg-primary terminal-cursor mt-2"
            />
          </div>
        </motion.div>

        {/* CTA + socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <div className="flex items-center gap-3">
            <a href="https://github.com/ahmed-ahdarf" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:glow-primary transition-all text-muted-foreground hover:text-primary">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/ahdarf-ahmed" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-card border border-border hover:border-accent hover:glow-accent transition-all text-muted-foreground hover:text-accent">
              <Linkedin size={20} />
            </a>
            <a href="mailto:ah.ahdarf@gmail.com" className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:glow-primary transition-all text-muted-foreground hover:text-primary">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
