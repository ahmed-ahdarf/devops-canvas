import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const education = [
  { degree: "Master – Cloud & High Performance Computing", school: "ENSIAS", period: "2019 – 2021", location: "Rabat" },
  { degree: "Professional Degree – Information Systems & Big Data", school: "EST Salé", period: "2018 – 2019", location: "Salé" },
  { degree: "Technician – IT Systems Development", school: "BTS Kenitra", period: "2016 – 2018", location: "Kenitra" },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mt-16">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-xl font-bold text-center mb-8 font-mono text-primary"
      >
        // education
      </motion.h3>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-6">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 * i }}
            className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <GraduationCap size={18} className="text-primary mb-3" />
            <h4 className="font-semibold text-sm">{edu.degree}</h4>
            <p className="text-xs text-muted-foreground mt-1">{edu.school} • {edu.period}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
