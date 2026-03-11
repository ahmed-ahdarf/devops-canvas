import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowDown, Github, Linkedin, Mail, Server, Container, GitBranch, Shield, Zap, Bug, CheckCircle2 } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";

// Pipeline game types
type PipelineStage = "idle" | "source" | "build" | "test" | "security" | "deploy" | "success" | "failed";

interface Threat {
  id: number;
  x: number;
  y: number;
  type: "bug" | "vulnerability";
  alive: boolean;
}

const stageConfig: Record<string, { icon: typeof Server; label: string; color: string }> = {
  source: { icon: GitBranch, label: "Source", color: "text-accent" },
  build: { icon: Container, label: "Build", color: "text-pipeline-warning" },
  test: { icon: Zap, label: "Test", color: "text-primary" },
  security: { icon: Shield, label: "Security", color: "text-accent" },
  deploy: { icon: Server, label: "Deploy", color: "text-primary" },
};

const HeroSection = () => {
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [progress, setProgress] = useState(0);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [score, setScore] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [deploymentsCount, setDeploymentsCount] = useState(0);

  const addLog = useCallback((msg: string) => {
    setLogs((prev) => [...prev.slice(-4), msg]);
  }, []);

  const squashThreat = (id: number) => {
    setThreats((prev) => prev.map((t) => (t.id === id ? { ...t, alive: false } : t)));
    setScore((s) => s + 10);
    addLog("🛡️ Threat neutralized! +10pts");
  };

  const runPipeline = () => {
    if (stage !== "idle" && stage !== "success" && stage !== "failed") return;
    setStage("source");
    setProgress(0);
    setScore(0);
    setThreats([]);
    setLogs(["$ git push origin main", "> Pipeline triggered..."]);

    const stages: { name: PipelineStage; delay: number; log: string }[] = [
      { name: "source", delay: 0, log: "📦 Cloning repository..." },
      { name: "build", delay: 1500, log: "🐳 docker build -t app:v1.0 ." },
      { name: "test", delay: 3000, log: "🧪 Running 47 tests..." },
      { name: "security", delay: 4500, log: "🔒 Scanning for vulnerabilities..." },
      { name: "deploy", delay: 6500, log: "🚀 kubectl apply -f deployment.yaml" },
      { name: "success", delay: 8500, log: "✅ Deployment successful! All pods running." },
    ];

    stages.forEach(({ name, delay, log }) => {
      setTimeout(() => {
        setStage(name);
        addLog(log);
      }, delay);
    });

    // Spawn threats during security stage
    setTimeout(() => {
      const newThreats: Threat[] = Array.from({ length: 4 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 50,
        type: Math.random() > 0.5 ? "bug" : "vulnerability",
        alive: true,
      }));
      setThreats(newThreats);
      addLog("⚠️ Threats detected! Click to neutralize!");
    }, 4800);

    // Track progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 85);

    setTimeout(() => {
      setDeploymentsCount((d) => d + 1);
    }, 8500);
  };

  // Auto-run on mount
  useEffect(() => {
    const timer = setTimeout(runPipeline, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageIdx = ["source", "build", "test", "security", "deploy"].indexOf(stage as string);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          initial={{ x: Math.random() * 1200, y: Math.random() * 800, opacity: 0 }}
          animate={{ y: [null, Math.random() * -200], opacity: [0, 0.5, 0] }}
          transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-12">
        {/* Top: Profile + Intro */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/50 glow-primary">
              <img src={profileImg} alt="Ahmed AHDARF" className="w-full h-full object-cover" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-background"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Ahmed AHDARF</h1>
            <p className="text-gradient font-semibold text-lg mt-1">DevOps Engineer</p>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">
              Kubernetes & Cloud Infrastructure • CI/CD Automation • IaC
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
              <a href="https://github.com/ahmed-ahdarf" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-card/50 border border-border hover:border-primary transition-all text-muted-foreground hover:text-primary">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com/in/ahdarf-ahmed" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-card/50 border border-border hover:border-accent transition-all text-muted-foreground hover:text-accent">
                <Linkedin size={16} />
              </a>
              <a href="mailto:ah.ahdarf@gmail.com" className="p-2 rounded-lg bg-card/50 border border-border hover:border-primary transition-all text-muted-foreground hover:text-primary">
                <Mail size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* DevOps Game Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-card/90 backdrop-blur-md rounded-xl border border-border overflow-hidden shadow-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/50 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-pipeline-warning/70" />
              <div className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">pipeline-simulator v1.0</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-muted-foreground">Score: <span className="text-primary">{score}</span></span>
              <span className="text-muted-foreground">Deploys: <span className="text-accent">{deploymentsCount}</span></span>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Pipeline stages */}
            <div className="flex items-center justify-between mb-6 overflow-x-auto gap-1">
              {Object.entries(stageConfig).map(([key, cfg], i) => {
                const Icon = cfg.icon;
                const isActive = stageIdx >= i;
                const isCurrent = stage === key;
                return (
                  <div key={key} className="flex items-center flex-1 min-w-0">
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.6, repeat: isCurrent ? Infinity : 0 }}
                      className={`flex flex-col items-center gap-1.5 px-2`}
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border-2 transition-all duration-500 ${
                        isCurrent ? "border-accent bg-accent/15 glow-accent" : isActive ? "border-primary/50 bg-primary/10" : "border-border bg-secondary/50"
                      }`}>
                        <Icon size={18} className={isActive ? cfg.color : "text-muted-foreground"} />
                      </div>
                      <span className={`text-[10px] font-mono ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{cfg.label}</span>
                    </motion.div>
                    {i < 4 && (
                      <div className="flex-1 h-0.5 mx-1 bg-border rounded-full overflow-hidden min-w-[10px]">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: stageIdx > i ? 1 : 0 }}
                          transition={{ duration: 0.4 }}
                          className="h-full bg-primary origin-left"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full bg-secondary overflow-hidden mb-4">
              <motion.div
                className={`h-full rounded-full transition-colors duration-500 ${
                  stage === "success" ? "bg-primary" : stage === "failed" ? "bg-destructive" : "bg-accent"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Game area: threat zone during security stage */}
            <AnimatePresence>
              {stage === "security" && threats.some((t) => t.alive) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 120 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative rounded-lg bg-destructive/5 border border-destructive/20 mb-4 overflow-hidden"
                >
                  <div className="absolute top-2 left-3 text-[10px] font-mono text-destructive animate-pulse">
                    ⚠️ THREATS DETECTED — Click to neutralize!
                  </div>
                  {threats.filter((t) => t.alive).map((threat) => (
                    <motion.button
                      key={threat.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      onClick={() => squashThreat(threat.id)}
                      className="absolute cursor-pointer hover:scale-150 transition-transform"
                      style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                    >
                      {threat.type === "bug" ? (
                        <Bug size={22} className="text-destructive drop-shadow-lg" />
                      ) : (
                        <Shield size={22} className="text-pipeline-warning drop-shadow-lg" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logs */}
            <div className="bg-terminal-bg rounded-lg p-3 font-mono text-xs space-y-1 min-h-[80px]">
              {logs.map((log, i) => (
                <motion.div
                  key={`${log}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-primary/80"
                >
                  {log}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-4 bg-primary/70 terminal-cursor" />
            </div>

            {/* Run button */}
            <div className="flex items-center justify-between mt-4">
              <AnimatePresence mode="wait">
                {stage === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-sm font-mono text-primary"
                  >
                    <CheckCircle2 size={16} />
                    Pipeline passed! Score: {score}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runPipeline}
                disabled={!["idle", "success", "failed"].includes(stage)}
                className="ml-auto px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold font-mono disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Zap size={14} />
                {stage === "idle" ? "Deploy" : stage === "success" || stage === "failed" ? "Re-deploy" : "Running..."}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Scroll down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex justify-center mt-10"
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
