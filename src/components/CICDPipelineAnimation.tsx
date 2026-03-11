import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GitBranch, Package, TestTube, Rocket, CheckCircle2, Loader2 } from "lucide-react";

const stages = [
  { icon: GitBranch, label: "Source", cmd: "git push origin main" },
  { icon: Package, label: "Build", cmd: "docker build -t app:latest ." },
  { icon: TestTube, label: "Test", cmd: "kubectl apply --dry-run=client" },
  { icon: Rocket, label: "Deploy", cmd: "argocd app sync production" },
  { icon: CheckCircle2, label: "Live", cmd: "STATUS: All pods running ✓" },
];

const CICDPipelineAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    stages.forEach((_, i) => {
      setTimeout(() => setActiveStage(i), (i + 1) * 800);
    });
  }, [isInView]);

  return (
    <div ref={ref} className="w-full py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i <= activeStage;
          const isCurrent = i === activeStage && i < stages.length - 1;

          return (
            <div key={i} className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isActive ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`relative w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isActive
                      ? i === stages.length - 1
                        ? "border-primary bg-primary/10 glow-primary"
                        : "border-accent bg-accent/10 glow-accent"
                      : "border-border bg-secondary"
                  }`}
                >
                  {isCurrent ? (
                    <Loader2 size={24} className="text-accent animate-spin" />
                  ) : (
                    <Icon size={24} className={isActive ? (i === stages.length - 1 ? "text-primary" : "text-accent") : "text-muted-foreground"} />
                  )}
                </div>
                <span className={`text-xs font-mono font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{stage.label}</span>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-mono text-muted-foreground max-w-[120px] text-center hidden md:block"
                  >
                    {stage.cmd}
                  </motion.span>
                )}
              </motion.div>

              {i < stages.length - 1 && (
                <div className="hidden md:block w-12 h-0.5 mx-1">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={i < activeStage ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="h-full bg-accent origin-left"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CICDPipelineAnimation;
