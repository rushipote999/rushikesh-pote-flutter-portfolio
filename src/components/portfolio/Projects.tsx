import { motion } from "motion/react";
import { Section } from "./Section";
import { ExternalLink, Github, Briefcase, GraduationCap, Landmark, Sparkles } from "lucide-react";

const projects = [
  {
    title: "CRM Application",
    description: "Business lead and task management platform powering daily sales operations.",
    features: ["Lead Management", "Call Logs", "Appointment Scheduling", "Task Management", "Analytics Dashboard"],
    tech: ["Flutter", "GetX", "REST APIs"],
    icon: Briefcase,
    accent: "from-[oklch(0.68_0.25_300)] to-[oklch(0.7_0.22_250)]",
  },
  {
    title: "SchoolBook",
    description: "School management application connecting students, parents, and teachers.",
    features: ["Attendance Tracking", "Timetable Management", "Student Profiles", "Parent-Teacher Communication"],
    tech: ["Flutter", "Firebase"],
    icon: GraduationCap,
    accent: "from-[oklch(0.7_0.22_250)] to-[oklch(0.85_0.18_200)]",
  },
  {
    title: "Janhit Application",
    description: "Citizen-to-Government service platform that simplifies civic engagement.",
    features: ["Complaint Management", "Government Schemes", "Public Notices", "AI Chat Support"],
    tech: ["Flutter", "Firebase"],
    icon: Landmark,
    accent: "from-[oklch(0.55_0.25_275)] to-[oklch(0.68_0.25_300)]",
  },
  {
    title: "MoodVerse",
    description: "AI-powered mood recommendation app that personalizes content to your emotions.",
    features: ["Face Detection", "Mood Recognition", "Content Suggestions", "Firebase Authentication"],
    tech: ["Flutter", "Firebase", "ML Kit"],
    icon: Sparkles,
    accent: "from-[oklch(0.85_0.18_200)] to-[oklch(0.55_0.25_275)]",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title={<>Selected <span className="gradient-text">work</span></>}
      description="A few production apps I've architected and shipped."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.015 }}
            className="group glass gradient-border relative overflow-hidden rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_oklch(0.7_0.22_295/0.55)]"
          >
            <div className={`absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-60`} />
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]`} />
            <div className="relative">
              <div className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${p.accent}`}>
                <p.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

              <ul className="mt-5 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full gradient-primary" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </a>
                <a
                  href="#"
                  className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold hover:bg-white/10"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}