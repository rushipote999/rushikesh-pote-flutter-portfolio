import { motion } from "motion/react";
import { Section } from "./Section";

const groups = [
  {
    title: "Mobile Development",
    skills: [
      { name: "Flutter", level: 95 },
      { name: "Dart", level: 92 },
      { name: "GetX", level: 88 },
      { name: "BLoC", level: 85 },
      { name: "Firebase", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Java", level: 80 },
      { name: "Spring Boot", level: 75 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "Firebase Firestore", level: 90 },
      { name: "MySQL", level: 82 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 88 },
      { name: "Android Studio", level: 92 },
      { name: "VS Code", level: 95 },
    ],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>The <span className="gradient-text">tech stack</span> I work with</>}
      description="A toolkit refined across multiple production applications."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="glass gradient-border rounded-3xl p-7"
          >
            <h3 className="text-lg font-semibold">{g.title}</h3>
            <div className="mt-6 space-y-4">
              {g.skills.map((s, i) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                      className="h-full gradient-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}