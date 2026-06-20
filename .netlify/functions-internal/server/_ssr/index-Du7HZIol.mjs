import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast, T as Toaster$1 } from "../_libs/sonner.mjs";
import { u as useMotionValue, a as useSpring, m as motion, b as useTransform } from "../_libs/framer-motion.mjs";
import { C as CodeXml, S as Sun, M as Moon, a as Sparkles, A as ArrowRight, D as Download, b as Smartphone, c as Cpu, L as Layers, R as Rocket, B as Boxes, F as Flame, d as FileCode, e as Coffee, f as Leaf, G as Globe, g as Server, h as Database, i as Cylinder, j as GitBranch, k as Github, l as Send, m as MonitorSmartphone, n as Briefcase, o as Landmark, p as GraduationCap, q as ShoppingBag, E as ExternalLink, r as Award, U as Users, s as Mail, P as Phone, t as Linkedin } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const codeSymbols = ["</>", "{ }", "()", "=>", "[]", "&&", "||", "::", "#!", "/*", "*/", "++"];
function AnimatedBackground() {
  const [mouse, setMouse] = reactExports.useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const canvasRef = reactExports.useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { stiffness: 320, damping: 26 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);
  reactExports.useEffect(() => {
    const onMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);
  reactExports.useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.getAttribute("role") === "button") {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let bubbles = [];
    let lastScrollY = window.scrollY;
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const bubbleColors = [
      "rgba(192, 132, 252, alpha)",
      // Purple
      "rgba(96, 165, 250, alpha)",
      // Blue
      "rgba(34, 211, 238, alpha)",
      // Cyan
      "rgba(129, 140, 248, alpha)",
      // Indigo
      "rgba(74, 222, 128, alpha)"
      // Green
    ];
    const createBubble = (x, y, isAmbient = false) => {
      const radius = isAmbient ? 2 + Math.random() * 8 : 4 + Math.random() * 14;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: isAmbient ? -0.4 - Math.random() * 0.8 : -0.8 - Math.random() * 1.5,
        radius,
        alpha: isAmbient ? 0.2 + Math.random() * 0.3 : 0.4 + Math.random() * 0.4,
        decay: isAmbient ? 1e-3 + Math.random() * 2e-3 : 2e-3 + Math.random() * 4e-3,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        wobbleSpeed: 0.01 + Math.random() * 0.03,
        wobbleRange: 0.4 + Math.random() * 1,
        wobbleVal: Math.random() * Math.PI * 2
      };
    };
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      bubbles.forEach((b) => {
        b.y -= deltaY;
      });
      if (Math.abs(deltaY) > 4 && Math.random() < 0.25) {
        const x = Math.random() * window.innerWidth;
        const y = deltaY > 0 ? window.innerHeight + 15 : -15;
        bubbles.push(createBubble(x, y, true));
      }
    };
    window.addEventListener("scroll", handleScroll);
    let animationId;
    const updateAndDraw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (Math.random() < 0.025 && bubbles.length < 60) {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 15;
        bubbles.push(createBubble(x, y, true));
      }
      bubbles = bubbles.filter((b) => {
        b.wobbleVal += b.wobbleSpeed;
        b.x += b.vx + Math.sin(b.wobbleVal) * b.wobbleRange * 0.15;
        b.y += b.vy;
        b.alpha -= b.decay;
        if (b.alpha <= 0 || b.y < -40 || b.x < -40 || b.x > window.innerWidth + 40) {
          return false;
        }
        const grad = ctx.createRadialGradient(
          b.x - b.radius * 0.25,
          b.y - b.radius * 0.25,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        grad.addColorStop(0, "rgba(255, 255, 255, 0.05)");
        grad.addColorStop(0.6, b.color.replace("alpha", String(b.alpha * 0.1)));
        grad.addColorStop(0.9, b.color.replace("alpha", String(b.alpha * 0.35)));
        grad.addColorStop(1, b.color.replace("alpha", String(b.alpha * 0.75)));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, " + b.alpha * 0.22 + ")";
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(255, 255, 255, " + b.alpha * 0.45 + ")";
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.12, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      animationId = requestAnimationFrame(updateAndDraw);
    };
    updateAndDraw();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);
  const particles = Array.from({ length: 18 });
  const symbols = Array.from({ length: 14 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.2_0.08_290/0.45),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 h-full w-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute inset-0 opacity-70",
        animate: {
          background: [
            "radial-gradient(at 20% 30%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 80% 20%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 60% 80%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)",
            "radial-gradient(at 70% 40%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 30% 70%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 80% 30%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)",
            "radial-gradient(at 40% 70%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 70% 30%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 20% 50%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)",
            "radial-gradient(at 20% 30%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 80% 20%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 60% 80%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)"
          ]
        },
        transition: { duration: 18, repeat: Infinity, ease: "linear" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[oklch(0.55_0.25_295/0.35)] blur-[120px] animate-blob" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-[30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[oklch(0.6_0.22_240/0.3)] blur-[140px] animate-blob",
        style: { animationDelay: "-7s" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute bottom-[-10%] left-[20%] h-[550px] w-[550px] rounded-full bg-[oklch(0.75_0.18_200/0.25)] blur-[130px] animate-blob",
        style: { animationDelay: "-14s" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute -inset-[20%] opacity-[0.18]",
        style: {
          background: "repeating-linear-gradient(115deg, transparent 0, transparent 180px, oklch(0.85 0.18 220 / 0.5) 180px, oklch(0.85 0.18 220 / 0.5) 181px, transparent 182px, transparent 360px)"
        },
        animate: { x: [0, 200, 0], y: [0, -100, 0] },
        transition: { duration: 30, repeat: Infinity, ease: "linear" }
      }
    ),
    particles.map((_, i) => {
      const left = i * 53 % 100;
      const top = i * 37 % 100;
      const duration = 18 + i % 7 * 3;
      const delay = i % 5 * -4;
      const size = 2 + i % 4;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          className: "absolute rounded-full",
          style: {
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            background: i % 3 === 0 ? "oklch(0.85 0.18 200 / 0.9)" : i % 3 === 1 ? "oklch(0.7 0.22 295 / 0.9)" : "oklch(0.7 0.22 250 / 0.9)",
            boxShadow: "0 0 12px currentColor"
          },
          animate: { y: [0, -80, 0], x: [0, 30, -20, 0], opacity: [0, 0.9, 0] },
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" }
        },
        `p-${i}`
      );
    }),
    symbols.map((_, i) => {
      const left = (i * 71 + 7) % 95;
      const top = (i * 43 + 11) % 90;
      const duration = 22 + i % 5 * 4;
      const delay = i % 6 * -3;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          className: "absolute select-none font-mono text-sm font-semibold",
          style: { left: `${left}%`, top: `${top}%`, color: "oklch(0.85 0.18 220 / 0.22)" },
          animate: { y: [0, -40, 0], opacity: [0, 0.6, 0], rotate: [0, 8, -8, 0] },
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
          children: codeSymbols[i % codeSymbols.length]
        },
        `s-${i}`
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute h-[420px] w-[420px] rounded-full",
        animate: { x: mouse.x - 210, y: mouse.y - 210 },
        transition: { type: "spring", damping: 30, stiffness: 80, mass: 0.8 },
        style: {
          background: "radial-gradient(circle, oklch(0.7 0.22 295 / 0.18) 0%, oklch(0.75 0.18 220 / 0.08) 40%, transparent 70%)",
          filter: "blur(20px)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.035]",
        style: {
          backgroundImage: "linear-gradient(oklch(1_0_0/1) 1px, transparent 1px), linear-gradient(90deg, oklch(1_0_0/1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background)_95%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "custom-cursor-ring",
        style: {
          x: cursorSpringX,
          y: cursorSpringY,
          opacity: mouse.x === -500 ? 0 : 0.85,
          boxShadow: isHovered ? "var(--shadow-glow)" : "none"
        },
        animate: {
          scale: isHovered ? 1.55 : 1
        },
        transition: { type: "spring", damping: 25, stiffness: 250 }
      }
    ) })
  ] });
}
function useTheme() {
  const [theme, setTheme] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) setTheme(storedTheme);
    }
  }, []);
  reactExports.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme((t) => t === "dark" ? "light" : "dark")
  };
}
const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { theme, toggleTheme } = useTheme();
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.header,
    {
      initial: { y: -40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6 },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: `mx-auto flex items-center justify-between px-5 transition-all duration-300 ${scrolled ? "glass-strong rounded-2xl max-w-[calc(1152px-2rem)] w-[calc(100%-2rem)] shadow-lg" : "max-w-6xl w-full"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#home", className: "flex items-center gap-2 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg gradient-primary glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-5 w-5 text-background" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold tracking-tight", children: [
                "Rushikesh",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: ".dev" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden items-center gap-8 md:flex", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: l.href,
                className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
                children: l.label
              }
            ) }, l.href)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: toggleTheme,
                  className: "grid h-9 w-9 place-items-center rounded-lg bg-white/5 border border-white/5 dark:bg-white/5 dark:border-white/5 bg-black/5 border-black/5 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/10 transition-colors text-muted-foreground hover:text-foreground cursor-pointer",
                  "aria-label": "Toggle dark/light mode",
                  children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4.5 w-4.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4.5 w-4.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#contact",
                  className: "hidden rounded-full gradient-primary px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-105 md:inline-block",
                  children: "Hire Me"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const developerImg = "/assets/developer-cACz5p7x.png";
const titles = [
  "Flutter Developer",
  "Mobile App Developer",
  "Firebase Developer",
  "Cross Platform Developer"
];
function useTyping() {
  const [idx, setIdx] = reactExports.useState(0);
  const [text, setText] = reactExports.useState("");
  const [deleting, setDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  { value: "5+", label: "Technologies" }
];
function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  target,
  rel
}) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e) => {
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
  const base = "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold cursor-pointer transition-shadow";
  const styles = variant === "primary" ? "gradient-primary text-background shadow-[0_0_24px_-4px_oklch(0.7_0.22_295/0.6)] hover:shadow-[0_0_40px_-2px_oklch(0.7_0.22_295/0.9)]" : "glass hover:bg-white/10 hover:shadow-[0_0_30px_-6px_oklch(0.75_0.18_220/0.6)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.a,
    {
      ref,
      href,
      onClick,
      target,
      rel,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      style: { x: sx, y: sy },
      whileHover: { scale: 1.06 },
      whileTap: { scale: 0.97 },
      className: `${base} ${styles}`,
      children
    }
  );
}
function Hero() {
  const typed = useTyping();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const psx = useSpring(mx, { stiffness: 60, damping: 20 });
  const psy = useSpring(my, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(psx, (v) => v * 20);
  const parallaxY = useTransform(psy, (v) => v * 20);
  const parallaxXNeg = useTransform(psx, (v) => v * -14);
  const parallaxYNeg = useTransform(psy, (v) => v * -14);
  const onSectionMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "home",
      onMouseMove: onSectionMove,
      className: "relative flex min-h-screen items-center px-5 pt-28 pb-20",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { x: parallaxX, y: parallaxY }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-[oklch(0.85_0.18_200)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2+ Years Experience · Available for Work" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.1 },
              className: "mt-6 text-6xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]",
              children: [
                "Hi, I'm ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Rushikesh Pote" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "mt-5 flex h-12 items-center text-2xl text-muted-foreground sm:text-3xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "I build " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 font-semibold text-foreground", children: typed }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-block h-7 w-[3px] bg-[oklch(0.75_0.18_220)] animate-blink" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
              children: "Crafting beautiful, performant cross-platform mobile experiences with Flutter, Firebase, and modern state management. Turning ideas into production-ready apps that users love."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              className: "mt-8 flex flex-wrap gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(MagneticButton, { href: "#projects", variant: "primary", children: [
                  "View Projects",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  MagneticButton,
                  {
                    href: "/Rushikesh_Pote_Resume.pdf",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    variant: "glass",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                      "Download Resume"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.6 },
              className: "mt-12 grid grid-cols-3 gap-4 sm:max-w-md",
              children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold gradient-text sm:text-3xl", children: s.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] uppercase tracking-wider text-muted-foreground", children: s.label })
              ] }, s.label))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.8, delay: 0.2 },
            style: { x: parallaxXNeg, y: parallaxYNeg },
            className: "relative mx-auto w-full max-w-sm aspect-square",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { opacity: [0.3, 0.55, 0.3] },
                  transition: { duration: 4, repeat: Infinity },
                  className: "absolute -inset-6 rounded-full gradient-primary blur-3xl"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: 360 },
                  transition: { duration: 14, repeat: Infinity, ease: "linear" },
                  className: "absolute -inset-3 rounded-full",
                  style: {
                    background: "conic-gradient(from 0deg, oklch(0.7 0.22 295), oklch(0.7 0.22 250), oklch(0.85 0.18 200), oklch(0.7 0.22 295))",
                    filter: "blur(2px)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1 rounded-full glass-strong" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  animate: { y: [0, -14, 0] },
                  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  className: "relative aspect-square overflow-hidden rounded-full glass-strong p-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-[oklch(0.85_0.18_220/0.4)] [box-shadow:inset_0_0_30px_oklch(0.7_0.22_295/0.35)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full w-full overflow-hidden rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: developerImg,
                        alt: "Rushikesh Pote, Flutter Developer",
                        className: "h-full w-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        animate: { y: [0, -10, 0] },
                        transition: { duration: 4, repeat: Infinity },
                        className: "glass-strong absolute -left-6 top-1/3 hidden rounded-2xl px-4 py-3 text-sm sm:block",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-emerald-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Building with Flutter" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        animate: { y: [0, 10, 0] },
                        transition: { duration: 5, repeat: Infinity },
                        className: "glass-strong absolute -right-6 bottom-10 hidden rounded-2xl px-4 py-3 text-sm sm:block",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold gradient-text", children: "Dart · Firebase" })
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function Section({
  id,
  eyebrow,
  title,
  description,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id, className: "relative px-5 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5 },
        className: "mb-12 max-w-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass inline-block rounded-full px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground", children: eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-4xl font-bold tracking-tight sm:text-5xl", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-muted-foreground sm:text-lg", children: description })
        ]
      }
    ),
    children
  ] }) });
}
const highlights = [
  { icon: Smartphone, title: "Cross-Platform", desc: "iOS & Android from one codebase" },
  { icon: Cpu, title: "Performance", desc: "Optimized, fluid 60fps experiences" },
  { icon: Layers, title: "Architecture", desc: "Clean code with GetX & BLoC" },
  { icon: Rocket, title: "Shipping", desc: "Production apps end-to-end" }
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "about",
      eyebrow: "About Me",
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Building apps that ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "people love" })
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-[1fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "space-y-5 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "I'm a Flutter Developer with 2+ years of professional experience crafting high-quality mobile applications. From CRM platforms to citizen service apps, I've shipped production software trusted by real users." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "My focus is on clean architecture, beautiful UI, and rock-solid integrations with Firebase, REST APIs, and modern state management patterns. I care deeply about the small details that make an app feel premium." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "When I'm not building, I'm exploring new frameworks, contributing to side projects, and pushing the boundaries of what's possible on mobile." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: highlights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: i * 0.08 },
            className: "glass gradient-border rounded-2xl p-5 transition-transform hover:-translate-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(h.icon, { className: "h-5 w-5 text-background" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-semibold", children: h.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: h.desc })
            ]
          },
          h.title
        )) })
      ] })
    }
  );
}
const groups = [
  {
    title: "Mobile Development",
    tagline: "Cross-platform apps that feel native.",
    accent: "from-[oklch(0.68_0.25_300)] to-[oklch(0.7_0.22_250)]",
    skills: [
      { name: "Flutter", icon: Smartphone, color: "oklch(0.75 0.18 220)" },
      { name: "Dart", icon: CodeXml, color: "oklch(0.7 0.22 250)" },
      { name: "GetX", icon: Layers, color: "oklch(0.68 0.25 300)" },
      { name: "BLoC", icon: Boxes, color: "oklch(0.7 0.22 295)" },
      { name: "Firebase", icon: Flame, color: "oklch(0.78 0.18 60)" }
    ]
  },
  {
    title: "Web Development",
    tagline: "Responsive and clean web layouts.",
    accent: "from-[oklch(0.75_0.18_220)] to-[oklch(0.7_0.22_250)]",
    skills: [
      { name: "HTML", icon: FileCode, color: "oklch(0.7 0.2 40)" },
      { name: "CSS", icon: Layers, color: "oklch(0.7 0.18 220)" },
      { name: "Bootstrap", icon: Boxes, color: "oklch(0.6 0.22 295)" },
      { name: "JavaScript", icon: CodeXml, color: "oklch(0.85 0.18 90)" }
    ]
  },
  {
    title: "Backend",
    tagline: "Reliable services and clean APIs.",
    accent: "from-[oklch(0.7_0.22_250)] to-[oklch(0.85_0.18_200)]",
    skills: [
      { name: "Java", icon: Coffee, color: "oklch(0.7 0.18 60)" },
      { name: "Spring Boot", icon: Leaf, color: "oklch(0.78 0.18 145)" },
      { name: "REST APIs", icon: Globe, color: "oklch(0.75 0.18 220)" },
      { name: "Node.js", icon: Server, color: "oklch(0.72 0.18 145)" }
    ]
  },
  {
    title: "Database",
    tagline: "Structured and realtime data stores.",
    accent: "from-[oklch(0.55_0.25_275)] to-[oklch(0.68_0.25_300)]",
    skills: [
      { name: "Firestore", icon: Flame, color: "oklch(0.78 0.18 60)" },
      { name: "MySQL", icon: Database, color: "oklch(0.7 0.18 220)" },
      { name: "SQL", icon: Cylinder, color: "oklch(0.7 0.22 295)" }
    ]
  },
  {
    title: "Tools",
    tagline: "Daily drivers for shipping fast.",
    accent: "from-[oklch(0.85_0.18_200)] to-[oklch(0.55_0.25_275)]",
    skills: [
      { name: "Git", icon: GitBranch, color: "oklch(0.7 0.22 30)" },
      { name: "Bitbucket", icon: GitBranch, color: "oklch(0.65 0.18 220)" },
      { name: "GitHub", icon: Github, color: "oklch(0.95 0.01 280)" },
      { name: "Postman", icon: Send, color: "oklch(0.7 0.22 40)" },
      { name: "Android Studio", icon: MonitorSmartphone, color: "oklch(0.78 0.18 145)" },
      { name: "VS Code", icon: FileCode, color: "oklch(0.75 0.18 220)" }
    ]
  }
];
function SkillCard({ skill, index }) {
  const ref = reactExports.useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(srx, (v) => v);
  const rotateY = useTransform(sry, (v) => v);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set((0.5 - py) * 16);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  const Icon = skill.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.45, delay: index * 0.05 },
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      style: { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 800 },
      whileHover: { scale: 1.05, y: -4 },
      className: "group relative aspect-square cursor-default",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          animate: { y: [0, -6, 0] },
          transition: {
            duration: 4 + index % 3,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          className: "relative h-full w-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100",
                style: {
                  background: "conic-gradient(from var(--angle, 0deg), oklch(0.68 0.25 300), oklch(0.7 0.22 250), oklch(0.85 0.18 200), oklch(0.68 0.25 300))",
                  padding: 1,
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "spin-slow 6s linear infinite"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl glass-strong" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col items-center justify-center gap-3 p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110",
                  style: { color: skill.color },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold tracking-tight text-foreground", children: skill.name })
            ] })
          ]
        }
      )
    }
  );
}
function Skills() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "skills",
      eyebrow: "Skills",
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "The ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "tech stack" }),
        " I work with"
      ] }),
      description: "A modern toolkit refined across multiple production applications.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: groups.map((g, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: gi * 0.05 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-end justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-12 rounded-full bg-gradient-to-r ${g.accent}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-2xl font-semibold tracking-tight", children: g.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: g.tagline })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", children: g.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillCard, { skill: s, index: i }, s.name)) })
          ]
        },
        g.title
      )) })
    }
  );
}
const items$1 = [
  {
    role: "Mobile Application Developer",
    company: "BAAP Company, Sangamner",
    period: "Nov 2023 – Present",
    points: [
      "Developed and maintained enterprise Flutter applications for Android, iOS, and Web platforms.",
      "Implemented MVC Architecture with GetX and BLoC patterns, reducing codebase complexity.",
      "Integrated REST APIs, Firebase Services (FCM, Auth), payment gateways, and geolocation SDKs.",
      "Optimized performance and API responses to ensure standard 60fps rendering speeds.",
      "Led a team of developers for the Janhit civic application, managing project architecture and deployment."
    ]
  }
];
function Experience() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "experience",
      eyebrow: "Experience",
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "A track record of ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "shipping work" })
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[oklch(0.68_0.25_300)] via-[oklch(0.7_0.22_250)] to-transparent md:left-6" }),
        items$1.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.1 },
            className: "relative pl-14 md:pl-20 mb-10 last:mb-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full gradient-primary glow md:h-12 md:w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-background md:h-5 md:w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: item.role }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold gradient-text", children: item.company })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: item.period })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: item.points.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full gradient-primary" }),
                  p
                ] }, p)) })
              ] })
            ]
          },
          i
        ))
      ] })
    }
  );
}
const projects = [
  {
    title: "TreeCoin (Finance App)",
    description: "A comprehensive fintech mobile application designed to streamline bank loan workflows. Developed a hierarchical system featuring origination branches, agent organizations, agent onboarding, customer registration, and a multi-stage loan approval/rejection decision system.",
    features: [
      "Frontend Team Leadership",
      "BLoC State Management",
      "Org & Agent Onboarding Flows",
      "Loan Apply/Approve/Reject Flow",
      "Bank Loan & Financial Workflows",
      "Secure REST API Integrations"
    ],
    tech: ["Flutter", "Dart", "BLoC Pattern", "REST APIs", "Financial Workflows"],
    icon: Landmark,
    accent: "from-[oklch(0.6_0.25_140)] to-[oklch(0.75_0.18_180)]",
    playStore: "https://play.google.com/store/apps/details?id=com.treecoin.app&pcampaignid=web_share"
  },
  {
    title: "CRM App",
    description: "A production-grade enterprise CRM mobile application optimizing sales pipelines, field force logistics, and warehouse operations. Features an offline-first sync engine, real-time GPS trip logs, Bluetooth thermal printing, and secure payment processing.",
    features: [
      "Lead & Campaign Pipelines",
      "GPS Geolocation & Trip Logs",
      "Billing & Easebuzz SDK Integration",
      "QR Code Inventory Scanning",
      "Bluetooth Thermal Printing",
      "Push Alerts & Multi-Language Support"
    ],
    tech: [
      "Flutter",
      "Dart",
      "GetX",
      "GoRouter",
      "Dio (REST API)",
      "Google Maps SDK",
      "Firebase FCM"
    ],
    icon: Briefcase,
    accent: "from-[oklch(0.68_0.25_300)] to-[oklch(0.7_0.22_250)]",
    playStore: "https://play.google.com/store/apps/details?id=com.baap.crm.app&pcampaignid=web_share",
    appStore: "https://apps.apple.com/us/app/baap-crm/id6746981287"
  },
  {
    title: "SchoolBook",
    description: "SchoolBook is a Flutter + Firebase-based school management application designed to digitize and simplify day-to-day school operations for administrators, teachers, and parents.",
    features: [
      "Student Registration",
      "Attendance Tracking",
      "Timetable Management",
      "Parent-Teacher Chat",
      "Firebase Auth & Sync",
      "Push Notifications"
    ],
    tech: ["Flutter", "Firebase", "Firebase Auth", "Real-time Database", "Push Notifications"],
    icon: GraduationCap,
    accent: "from-[oklch(0.7_0.22_250)] to-[oklch(0.85_0.18_200)]",
    playStore: "https://play.google.com/store/apps/details?id=com.school.book.app&pcampaignid=web_share",
    appStore: "https://apps.apple.com/us/app/school-book-app/id6746955392"
  },
  {
    title: "Janhit Application",
    description: "Janhit is a Flutter-based mobile application that digitizes the complete civic grievance lifecycle enabling citizens to report public issues like roads, water supply, electricity, and sanitation directly from their smartphones.",
    features: [
      "Role-Based Access Control",
      "GPS Location Capture",
      "Complaint Lifecycle Tracking",
      "Real-time Notifications",
      "Officer & Admin Dashboards",
      "Analytics & Reports"
    ],
    tech: ["Flutter", "Node.js", "Firebase", "REST APIs", "GPS Integration"],
    icon: Landmark,
    accent: "from-[oklch(0.55_0.25_275)] to-[oklch(0.68_0.25_300)]",
    playStore: "https://play.google.com/store/apps/details?id=com.government.janhit&pcampaignid=web_share"
  },
  {
    title: "Dealer App (e-commerce)",
    description: "Developed a comprehensive e-commerce and inventory management application that allows users to browse products, manage inventory, generate quotations, add products to the cart, place orders, make secure payments, track order status, and view order details. Integrated REST APIs and payment gateway services to deliver a seamless and efficient user experience.",
    features: [
      "Product Browsing",
      "Inventory Management",
      "Quotation Generation",
      "Cart & Checkout",
      "Secure Payments",
      "Order Tracking"
    ],
    tech: [
      "Flutter",
      "Dart",
      "GetX",
      "REST APIs",
      "Dio",
      "Payment Gateway",
      "Inventory Management"
    ],
    icon: ShoppingBag,
    accent: "from-[oklch(0.85_0.18_200)] to-[oklch(0.55_0.25_275)]",
    playStore: "https://play.google.com/store/apps/details?id=com.rmdrip.dealer&pcampaignid=web_share"
  }
];
function Projects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "projects",
      eyebrow: "Featured Projects",
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Selected ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "work" })
      ] }),
      description: "A few production apps I've architected and shipped.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.article,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: i * 0.08 },
          whileHover: { y: -8, scale: 1.015 },
          className: "group glass gradient-border relative overflow-hidden rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_oklch(0.7_0.22_295/0.55)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-60`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${p.accent}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-6 w-6 text-background" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-2xl font-semibold tracking-tight", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full gradient-primary" }),
                " ",
                f
              ] }, f)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: p.tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
                  children: t
                },
                t
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
                p.playStore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: p.playStore,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                      " Play Store"
                    ]
                  }
                ),
                p.appStore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: p.appStore,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                      " App Store"
                    ]
                  }
                ),
                p.liveDemo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: p.liveDemo,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                      " Live Demo"
                    ]
                  }
                ),
                !p.playStore && !p.appStore && !p.liveDemo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-50" }),
                  " Internal App"
                ] }),
                p.github && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: p.github,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold hover:bg-white/10",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-3.5 w-3.5" }),
                      " GitHub"
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        p.title
      )) })
    }
  );
}
const items = [
  {
    icon: Award,
    title: "2+ Years Professional Experience",
    desc: "Consistent delivery across real production teams."
  },
  {
    icon: Rocket,
    title: "Multiple Production Apps Delivered",
    desc: "Shipped apps used by real customers."
  },
  {
    icon: Layers,
    title: "Expertise in Flutter Architecture",
    desc: "Clean, scalable patterns with GetX & BLoC."
  },
  {
    icon: Database,
    title: "Firebase & REST API Integration",
    desc: "Secure, real-time, production-grade backends."
  },
  {
    icon: Users,
    title: "Team Collaboration & Delivery",
    desc: "Cross-functional work with design, backend, QA."
  }
];
function Achievements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "achievements",
      eyebrow: "Achievements",
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Milestones along the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "journey" })
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: items.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.07 },
          className: "glass gradient-border group relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(a.icon, { className: "h-5 w-5 text-background" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-semibold", children: a.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: a.desc })
          ]
        },
        a.title
      )) })
    }
  );
}
const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "rushikeshpote2005@gmail.com",
    href: "mailto:rushikeshpote2005@gmail.com"
  },
  { icon: Phone, label: "Phone", value: "+91 7020659533", href: "tel:+917020659533" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/rushikeshpote",
    href: "https://linkedin.com/in/rushikeshpote"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@rushikeshpote",
    href: "https://github.com/rushikeshpote"
  }
];
function Contact() {
  const [sending, setSending] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Section,
    {
      id: "contact",
      eyebrow: "Contact",
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Let's build ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "something great" })
      ] }),
      description: "Have a project in mind or just want to chat? Drop a message.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 content-start", children: contacts.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.a,
          {
            href: c.href,
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: i * 0.06 },
            className: "glass gradient-border flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-5 w-5 text-background" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: c.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: c.value })
              ] })
            ]
          },
          c.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.form,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            onSubmit: (e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => {
                setSending(false);
                toast.success("Message sent! I'll get back to you soon.");
                e.target.reset();
              }, 800);
            },
            className: "glass-strong rounded-3xl p-7",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    required: true,
                    type: "text",
                    placeholder: "Your name",
                    className: "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[oklch(0.7_0.22_295)]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    required: true,
                    type: "email",
                    placeholder: "you@example.com",
                    className: "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[oklch(0.7_0.22_295)]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    required: true,
                    rows: 5,
                    placeholder: "Tell me about your project...",
                    className: "mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[oklch(0.7_0.22_295)]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: sending,
                  className: "group inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-background glow transition-transform hover:scale-[1.02] disabled:opacity-70",
                  children: sending ? "Sending..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    "Send Message",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
                  ] })
                }
              )
            ] })
          }
        )
      ] })
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative px-5 pb-10 pt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.22_295)]/60 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text font-semibold", children: "Rushikesh Pote" }),
        ". Crafted with Flutter-grade care."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: [
        { icon: Github, href: "https://github.com/rushikeshpote", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/rushikeshpote", label: "LinkedIn" },
        { icon: Mail, href: "mailto:rushikeshpote2005@gmail.com", label: "Email" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: s.href,
          "aria-label": s.label,
          className: "glass grid h-10 w-10 place-items-center rounded-full transition-transform hover:-translate-y-0.5 hover:bg-white/10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" })
        },
        s.label
      )) })
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Achievements, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
export {
  Index as component
};
