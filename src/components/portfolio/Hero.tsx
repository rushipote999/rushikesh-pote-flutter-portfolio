import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import developerImg from "@/assets/developer.jpg";

const titles = ["Flutter Developer", "Mobile App Developer", "Cross-Platform Engineer"];

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

export function Hero() {
  const typed = useTyping();
  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pt-28 pb-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
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
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <span className="gradient-text">Rushikesh Pote</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex h-10 items-center text-2xl text-muted-foreground sm:text-3xl"
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
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-background glow transition-transform hover:scale-105"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
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
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-[2rem] gradient-primary opacity-30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-2">
            <div className="overflow-hidden rounded-[1.6rem]">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}