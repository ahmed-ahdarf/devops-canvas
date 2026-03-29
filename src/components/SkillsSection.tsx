import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CICDPipelineAnimation from "./CICDPipelineAnimation";
import { Cloud, Container, GitBranch, Monitor, Database, Code, Server, Workflow } from "lucide-react";

const skillCategories = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    tools: ["AWS (EC2, S3, VPC, RDS, Lambda, ECS)", "OpenStack", "IBM Cloud", "DigitalOcean"],
  },
  {
    title: "Containers & Orchestration",
    icon: Container,
    tools: ["Docker", "Kubernetes", "Rancher", "Portainer"],
  },
  {
    title: "CI/CD & GitOps",
    icon: GitBranch,
    tools: ["GitLab CI/CD", "ArgoCD", "Git", "GitHub", "GitLab"],
  },
  {
    title: "Infrastructure as Code",
    icon: Server,
    tools: ["Terraform", "Ansible", "AWX Tower"],
  },
  {
    title: "Monitoring & Observability",
    icon: Monitor,
    tools: ["Prometheus", "Grafana", "Loki", "ELK Stack"],
  },
  {
    title: "Networking & Proxy",
    icon: Workflow,
    tools: ["Nginx", "Traefik", "HAProxy"],
  },
  {
    title: "Big Data & Databases",
    icon: Database,
    tools: ["Kafka", "MongoDB", "Redis", "PostgreSQL", "MySQL", "MS SQL Server"],
  },
  {
    title: "Programming",
    icon: Code,
    tools: ["Java", "Python", "Shell / Bash"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-base font-semibold text-primary tracking-wide">// tech_stack</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Skills & Tools</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Building and managing cloud-native infrastructure with modern DevOps tooling
          </p>
        </motion.div>

        {/* CI/CD Pipeline Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-center text-sm font-mono text-muted-foreground mb-4">⚡ CI/CD Pipeline — Watch it deploy</p>
          <CICDPipelineAnimation />
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.4, duration: 0.5 }}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold text-sm">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tools.map((tool) => (
                    <span key={tool} className="text-xs font-mono px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
