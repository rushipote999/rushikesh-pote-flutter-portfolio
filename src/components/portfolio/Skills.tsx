import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import {
  Smartphone,
  Code2,
  Layers,
  GitBranch,
  Flame,
  Server,
  Database,
  Wrench,
  Coffee,
  Leaf,
  Globe,
  Boxes,
  Cylinder,
  TerminalSquare,
  Github,
  Send,
  MonitorSmartphone,
  FileCode,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./Section";

type Skill = { name: string; icon: LucideIcon; color: string };
type Group = { title: string; tagline: string; accent: string; skills: Skill[] };

const groups: Group[] = [
  {
    title: "Mobile Development",
    tagline: "Cross-platform apps that feel native.",
    accent: "from-[oklch(0.68_0.25_300)] to-[oklch(0.7_0.22_250)]",
    skills: [
      { name: "Flutter", icon: Smartphone, color: "oklch(0.75 0.18 220)" },
      { name: "Dart", icon: Code2, color: "oklch(0.7 0.22 250)" },
      { name: "GetX", icon: Layers, color: "oklch(0.68 0.25 300)" },
      { name: "BLoC", icon: Boxes, color: "oklch(0.7 0.22 295)" },
      { name: "Firebase", icon: Flame, color: "oklch(0.78 0.18 60)" },
    ],
  },
  {
    title: "Backend",
    tagline: "Reliable services and clean APIs.",
    accent: "from-[oklch(0.7_0.22_250)] to-[oklch(0.85_0.18_200)]",
    skills: [
      { name: "Java", icon: Coffee, color: "oklch(0.7 0.18 60)" },
      { name: "Spring Boot", icon: Leaf, color: "oklch(0.78 0.18 145)" },
      { name: "REST APIs", icon: Globe, color: "oklch(0.75 0.18 220)" },
      { name: "Node.js", icon: Server, color: "oklch(0.72 0.18 145)" },
    ],
  },
  {
    title: "Database",
    tagline: "Structured and realtime data stores.",
    accent: "from-[oklch(0.55_0.25_275)] to-[oklch(0.68_0.25_300)]",
    skills: [
      { name: "Firestore", icon: Flame, color: "oklch(0.78 0.18 60)" },
      { name: "MySQL", icon: Database, color: "oklch(0.7 0.18 220)" },
      { name: "SQL", icon: Cylinder, color: "oklch(0.7 0.22 295)" },
    ],
  },
  {
    title: "Tools",
    tagline: "Daily drivers for shipping fast.",
    accent: "from-[oklch(0.85_0.18_200)] to-[oklch(0.55_0.25_275)]",
    skills: [
      { name: "Git", icon: GitBranch, color: "oklch(0.7 0.22 30)" },
      { name: "GitHub", icon: Github, color: "oklch(0.95 0.01 280)" },
      { name: "Postman", icon: Send, color: "oklch(0.7 0.22 40)" },
      { name: "Android Studio", icon: MonitorSmartphone, color: "oklch(0.78 0.18 145)" },
      { name: "VS Code", icon: FileCode, color: "oklch(0.75 0.18 220)" },
    ],
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(srx, (v) => v);
  const rotateY = useTransform(sry, (v) => v);

  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set((0.5 - py) * 16);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 800 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group relative aspect-square cursor-default"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + (index % 3), delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full w-full"
      >
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from var(--angle, 0deg), oklch(0.68 0.25 300), oklch(0.7 0.22 250), oklch(0.85 0.18 200), oklch(0.68 0.25 300))",
            padding: 1,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: "spin-slow 6s linear infinite",
          }}
        />
        <div className="absolute inset-0 rounded-2xl glass-strong" />
        {/* Hover spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [gx, gy],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, ${skill.color}33, transparent 60%)`,
            ),
          }}
        />
        {/* Glow on hover */}
        <div
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: skill.color }}
        />
        <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
          <div
            className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110"
            style={{ color: skill.color }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="text-sm font-semibold tracking-tight text-foreground">
            {skill.name}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>The <span className="gradient-text">tech stack</span> I work with</>}
      description="A modern toolkit refined across multiple production applications."
    >
      <div className="space-y-12">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.05 }}
          >
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${g.accent}`} />
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{g.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{g.tagline}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {g.skills.map((s, i) => (
                <SkillCard key={s.name} skill={s} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}