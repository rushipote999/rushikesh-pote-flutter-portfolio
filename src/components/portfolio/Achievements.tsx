import { motion } from "motion/react";
import { Section } from "./Section";
import { Award, Rocket, Layers, Database, Users } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "2+ Years Professional Experience",
    desc: "Consistent delivery across real production teams.",
  },
  {
    icon: Rocket,
    title: "Multiple Production Apps Delivered",
    desc: "Shipped apps used by real customers.",
  },
  {
    icon: Layers,
    title: "Expertise in Flutter Architecture",
    desc: "Clean, scalable patterns with GetX & BLoC.",
  },
  {
    icon: Database,
    title: "Firebase & REST API Integration",
    desc: "Secure, real-time, production-grade backends.",
  },
  {
    icon: Users,
    title: "Team Collaboration & Delivery",
    desc: "Cross-functional work with design, backend, QA.",
  },
];

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title={
        <>
          Milestones along the <span className="gradient-text">journey</span>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="glass gradient-border group relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary">
              <a.icon className="h-5 w-5 text-background" />
            </div>
            <h3 className="mt-4 font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
