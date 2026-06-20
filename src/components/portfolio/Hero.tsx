import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  Download,
  ArrowRight,
  Sparkles,
  Activity,
  Server,
  Terminal,
  Star,
  CheckCircle2,
} from "lucide-react";

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
  onClick,
  variant = "primary",
  target,
  rel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: "primary" | "glass";
  target?: string;
  rel?: string;
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
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold cursor-pointer transition-shadow";
  const styles =
    variant === "primary"
      ? "gradient-primary text-background shadow-[0_0_24px_-4px_oklch(0.7_0.22_295/0.6)] hover:shadow-[0_0_40px_-2px_oklch(0.7_0.22_295/0.9)]"
      : "glass hover:bg-white/10 hover:shadow-[0_0_30px_-6px_oklch(0.75_0.18_220/0.6)]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
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

function DashboardMockup() {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="relative w-full max-w-md mx-auto bg-black/45 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Window Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 block" />
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Terminal className="h-3 w-3 text-cyan-400" /> developer_console_v2
        </div>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
          {[
            { id: "analytics", label: "Analytics", icon: Activity },
            { id: "services", label: "Services", icon: Server },
            { id: "console", label: "Console", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 w-full justify-center rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/10 text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "analytics" && (
          <div className="space-y-4">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Active Installs
                </div>
                <div className="text-xl font-bold flex items-center justify-between">
                  <span>24.8k</span>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                    +15.2%
                  </span>
                </div>
              </div>
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  App Store Rating
                </div>
                <div className="text-xl font-bold flex items-center justify-between text-yellow-400">
                  <span className="flex items-center gap-1">
                    4.9 <Star className="h-3.5 w-3.5 fill-current" />
                  </span>
                  <span className="text-muted-foreground text-[10px]">1.2k reviews</span>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-foreground">App Performance (FPS)</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live (60 FPS)
                </span>
              </div>
              
              {/* Vertical bar chart */}
              <div className="flex items-end justify-between h-24 pt-2">
                {[55, 60, 58, 60, 59, 60, 60, 57, 59, 60, 60].map((val, idx) => {
                  const pct = (val / 60) * 100;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 w-full">
                      <div className="relative group w-[6px] sm:w-[8px] bg-white/5 rounded-t-full h-16 flex items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${pct}%` }}
                          transition={{ delay: idx * 0.04, duration: 0.8 }}
                          className={`w-full rounded-t-full bg-gradient-to-t ${
                            val < 58 
                              ? "from-orange-500 to-yellow-400" 
                              : "from-purple-500 to-cyan-400"
                          } group-hover:brightness-125`}
                        />
                      </div>
                      <span className="text-[8px] text-muted-foreground font-mono">
                        {idx + 1}h
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-2.5">
            {[
              { name: "Firebase Auth & Firestore", status: "Operational", ping: "12ms" },
              { name: "Push Notifications", status: "Operational", ping: "45ms" },
              { name: "REST API Gateways", status: "Operational", ping: "28ms" },
              { name: "Payment SDK (Easebuzz)", status: "Operational", ping: "34ms" },
            ].map((srv) => (
              <div key={srv.name} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </div>
                  <span className="text-xs font-semibold">{srv.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    {srv.status}
                  </span>
                  <span className="font-mono">{srv.ping}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "console" && (
          <div className="bg-black/60 rounded-xl p-3 border.5 border-white/5 font-mono text-[10px] leading-relaxed text-emerald-400 h-[174px] overflow-hidden space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-purple-400">$</span> flutter build apk --release
            </div>
            <div className="text-muted-foreground">Building bundle for Production deployment...</div>
            <div className="text-muted-foreground">✓ Compiled code assembly (4.2s)</div>
            <div className="flex items-center gap-1.5">
              <span className="text-purple-400">$</span> firebase deploy --only functions
            </div>
            <div className="text-muted-foreground">Updating Firestore triggers...</div>
            <div className="text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Deploy completed successfully!
            </div>
            <div className="animate-pulse flex items-center gap-0.5">
              <span className="text-purple-400">$</span> <span className="w-1.5 h-3 bg-emerald-400 inline-block" />
            </div>
          </div>
        )}
      </div>
    </div>
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
            Crafting beautiful, performant cross-platform mobile experiences with Flutter, Firebase,
            and modern state management. Turning ideas into production-ready apps that users love.
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
            <MagneticButton
              href="/Rushikesh_Pote_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="glass"
            >
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
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ x: parallaxXNeg, y: parallaxYNeg }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Glow halo */}
          <motion.div
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -inset-8 rounded-[2rem] gradient-primary blur-3xl opacity-60"
          />
          
          {/* Floating dashboard frame */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <DashboardMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
