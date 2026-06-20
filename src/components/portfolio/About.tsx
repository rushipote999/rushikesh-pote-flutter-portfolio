import { motion } from "motion/react";
import { Section } from "./Section";
import { Smartphone, Cpu, Layers, Rocket } from "lucide-react";

const highlights = [
  { icon: Smartphone, title: "Cross-Platform", desc: "iOS & Android from one codebase" },
  { icon: Cpu, title: "Performance", desc: "Optimized, fluid 60fps experiences" },
  { icon: Layers, title: "Architecture", desc: "Clean code with GetX & BLoC" },
  { icon: Rocket, title: "Shipping", desc: "Production apps end-to-end" },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title={
        <>
          Building apps that <span className="gradient-text">people love</span>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-muted-foreground"
        >
          <p>
            I'm a Flutter Developer with 2+ years of professional experience crafting high-quality
            mobile applications. From CRM platforms to citizen service apps, I've shipped production
            software trusted by real users.
          </p>
          <p>
            My focus is on clean architecture, beautiful UI, and rock-solid integrations with
            Firebase, REST APIs, and modern state management patterns. I care deeply about the small
            details that make an app feel premium.
          </p>
          <p>
            When I'm not building, I'm exploring new frameworks, contributing to side projects, and
            pushing the boundaries of what's possible on mobile.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass gradient-border rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary">
                <h.icon className="h-5 w-5 text-background" />
              </div>
              <h3 className="mt-4 font-semibold">{h.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
