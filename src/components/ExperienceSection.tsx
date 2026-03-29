import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "TangerMed / Cires Technologies",
    role: "DevOps Engineer",
    period: "Sep 2023 – Present",
    location: "Tanger, Morocco",
    highlights: [
      "Designed and deployed Kubernetes clusters using Kubeadm across UAT, STAGE, and PROD",
      "Implemented GitOps workflows with ArgoCD for automated K8s deployments",
      "Built CI/CD pipelines with GitLab CI for automated build, test, and deploy",
      "Created reusable Terraform modules for cloud infrastructure provisioning",
      "Centralized monitoring with Loki, Prometheus, and Grafana stack",
      "Managed infrastructure on OpenStack using Terraform and Ansible",
      "Deployed GitLab, SonarQube, and Nexus using Terraform, Ansible, and Docker on OpenStack with HCP Terraform for remote state management",
      "Deployed Alfresco GED on Kubernetes across multiple environments (Share, GED, SOLR, ActiveMQ, Transform Core)",
    ],
  },
  {
    company: "YouCan",
    role: "DevOps / SysOps Engineer",
    period: "Aug 2022 – Aug 2023",
    location: "Rabat, Morocco",
    highlights: [
      "Designed unified dev environment for Dev and Ops using Docker, Shell, and Ansible",
      "Centralized testing environment to optimize cloud resource consumption",
      "Provisioned scalable environments on IBM Cloud",
      "Developed AWX Tower templates for continuous delivery automation",
    ],
  },
  {
    company: "Capoffshore",
    role: "DevOps Engineer",
    period: "Nov 2021 – Jul 2022",
    location: "Casablanca, Morocco",
    highlights: [
      "Built web-scraping application with Spring Boot, Angular, Python & Playwright",
      "Deployed and managed application on Kubernetes cluster with zero-downtime updates",
    ],
  },
];

const projects = [
  {
    title: "Automated Infrastructure Provisioning – DigitalOcean",
    description: "Built automated cloud resource provisioning using Terraform (VPC, security groups, VMs) with GitLab for version control and secure state management.",
  },
  {
    title: "Infrastructure Automation on OpenStack",
    description: "Automated provisioning of compute, networking, and security components using Terraform and Ansible with reusable modules and GitLab pipelines.",
  },
  {
    title: "DevOps Toolchain Deployment – GitLab / SonarQube / Nexus",
    description: "Deployed a full DevOps toolchain (GitLab, SonarQube, Nexus) on OpenStack using Terraform, Ansible, and Docker, with HCP Terraform for centralized remote state management.",
  },
  {
    title: "Alfresco GED Deployment on Kubernetes",
    description: "Deployed and managed Alfresco GED across multi-environment Kubernetes clusters, covering all core services: Share, GED, SOLR, ActiveMQ, and Transform Core.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="experience" className="py-24 bg-secondary/30" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-base font-semibold text-primary tracking-wide">// career_path</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 * i, duration: 0.6 }}
              className={`relative flex flex-col md:flex-row mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background -translate-x-1.5 md:-translate-x-1.5 mt-6 z-10" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                  <div className={`flex items-center gap-2 text-primary mb-1 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    <Briefcase size={14} />
                    <span className="font-mono text-xs">{exp.role}</span>
                  </div>
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <div className={`flex items-center gap-4 text-xs text-muted-foreground mt-1 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    <span className="flex items-center gap-1"><Calendar size={12} />{exp.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                  </div>
                  <ul className={`mt-4 space-y-2 text-sm text-muted-foreground ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2">
                        {i % 2 !== 0 && <span className="text-primary mt-1 shrink-0">▸</span>}
                        <span>{h}</span>
                        {i % 2 === 0 && <span className="text-primary mt-1 shrink-0 hidden md:inline">◂</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold text-center mb-8 font-mono text-primary">// key_projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + i * 0.2 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-accent/40 transition-colors group"
              >
                <h4 className="font-semibold group-hover:text-accent transition-colors">{p.title}</h4>
                <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
