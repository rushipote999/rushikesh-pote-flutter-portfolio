import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import developerImg from "@/assets/developer.jpg";

const titles = [
  "Flutter Developer",
  "Mobile App Developer",
  "Firebase Developer",
  "Cross Platform Developer",
];

function useTyping() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = titles[idx];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % titles.length);
        return;
      }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);
  return text;
}

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "5+", label: "Technologies" },
];

function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "glass";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow";
  const styles =
    variant === "primary"
      ? "gradient-primary text-background shadow-[0_0_24px_-4px_oklch(0.7_0.22_295/0.6)] hover:shadow-[0_0_40px_-2px_oklch(0.7_0.22_295/0.9)]"
      : "glass hover:bg-white/10 hover:shadow-[0_0_30px_-6px_oklch(0.75_0.18_220/0.6)]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const typed = useTyping();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const psx = useSpring(mx, { stiffness: 60, damping: 20 });
  const psy = useSpring(my, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(psx, (v) => v * 20);
  const parallaxY = useTransform(psy, (v) => v * 20);
  const parallaxXNeg = useTransform(psx, (v) => v * -14);
  const parallaxYNeg = useTransform(psy, (v) => v * -14);

  const onSectionMove = (e: ReactMouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };

  return (
    <section
      id="home"
      onMouseMove={onSectionMove}
      className="relative flex min-h-screen items-center px-5 pt-28 pb-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ x: parallaxX, y: parallaxY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-[oklch(0.85_0.18_200)]" />
            <span>2+ Years Experience · Available for Work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-6xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]"
          >
            Hi, I'm <span className="gradient-text">Rushikesh Pote</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 flex h-12 items-center text-2xl text-muted-foreground sm:text-3xl"
          >
            <span>I build </span>
            <span className="ml-2 font-semibold text-foreground">{typed}</span>
            <span className="ml-1 inline-block h-7 w-[3px] bg-[oklch(0.75_0.18_220)] animate-blink" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Crafting beautiful, performant cross-platform mobile experiences with Flutter,
            Firebase, and modern state management. Turning ideas into production-ready apps
            that users love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#" variant="glass">
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-4 sm:max-w-md"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ x: parallaxXNeg, y: parallaxYNeg }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Glow halo */}
          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-6 rounded-[2.4rem] gradient-primary blur-3xl"
          />
          {/* Rotating gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-[2.2rem]"
            style={{
              background:
                "conic-gradient(from 0deg, oklch(0.7 0.22 295), oklch(0.7 0.22 250), oklch(0.85 0.18 200), oklch(0.7 0.22 295))",
              filter: "blur(2px)",
            }}
          />
          {/* Glass backdrop */}
          <div className="absolute -inset-1 rounded-[2.1rem] glass-strong" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2rem] glass-strong p-2"
          >
            {/* Neon inner border */}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[oklch(0.85_0.18_220/0.4)] [box-shadow:inset_0_0_30px_oklch(0.7_0.22_295/0.35)]" />
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <img
                src={developerImg}
                alt="Rushikesh Pote, Flutter Developer"
                width={768}
                height={896}
                className="h-auto w-full object-cover"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="glass-strong absolute -left-6 top-1/3 hidden rounded-2xl px-4 py-3 text-sm sm:block"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Building with Flutter</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="glass-strong absolute -right-6 bottom-10 hidden rounded-2xl px-4 py-3 text-sm sm:block"
            >
              <div className="font-semibold gradient-text">Dart · Firebase</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}