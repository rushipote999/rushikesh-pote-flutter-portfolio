import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const codeSymbols = ["</>", "{ }", "()", "=>", "[]", "&&", "||", "::", "#!", "/*", "*/", "++"];

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
  wobbleSpeed: number;
  wobbleRange: number;
  wobbleVal: number;
}

export function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 320, damping: 26 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bubbles: Bubble[] = [];
    const lastMousePos = { x: 0, y: 0 };
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
      "rgba(192, 132, 252, alpha)", // Purple
      "rgba(96, 165, 250, alpha)", // Blue
      "rgba(34, 211, 238, alpha)", // Cyan
      "rgba(129, 140, 248, alpha)", // Indigo
      "rgba(74, 222, 128, alpha)", // Green
    ];

    const createBubble = (x: number, y: number, isAmbient = false): Bubble => {
      const radius = isAmbient ? 2 + Math.random() * 8 : 4 + Math.random() * 14;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: isAmbient ? -0.4 - Math.random() * 0.8 : -0.8 - Math.random() * 1.5,
        radius,
        alpha: isAmbient ? 0.2 + Math.random() * 0.3 : 0.4 + Math.random() * 0.4,
        decay: isAmbient ? 0.001 + Math.random() * 0.002 : 0.002 + Math.random() * 0.004,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        wobbleSpeed: 0.01 + Math.random() * 0.03,
        wobbleRange: 0.4 + Math.random() * 1.0,
        wobbleVal: Math.random() * Math.PI * 2,
      };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      bubbles.forEach((b) => {
        b.y -= deltaY; // offset coordinates to match screen coordinates
      });

      if (Math.abs(deltaY) > 4 && Math.random() < 0.25) {
        const x = Math.random() * window.innerWidth;
        const y = deltaY > 0 ? window.innerHeight + 15 : -15;
        bubbles.push(createBubble(x, y, true));
      }
    };

    window.addEventListener("scroll", handleScroll);

    let animationId: number;
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
          b.radius,
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

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.2_0.08_290/0.45),transparent_60%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      <motion.div
        className="absolute inset-0 opacity-70"
        animate={{
          background: [
            "radial-gradient(at 20% 30%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 80% 20%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 60% 80%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)",
            "radial-gradient(at 70% 40%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 30% 70%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 80% 30%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)",
            "radial-gradient(at 40% 70%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 70% 30%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 20% 50%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)",
            "radial-gradient(at 20% 30%, oklch(0.55 0.25 295 / 0.35) 0px, transparent 50%), radial-gradient(at 80% 20%, oklch(0.6 0.22 240 / 0.3) 0px, transparent 50%), radial-gradient(at 60% 80%, oklch(0.75 0.18 200 / 0.25) 0px, transparent 50%)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[oklch(0.55_0.25_295/0.35)] blur-[120px] animate-blob" />
      <div
        className="absolute top-[30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[oklch(0.6_0.22_240/0.3)] blur-[140px] animate-blob"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] h-[550px] w-[550px] rounded-full bg-[oklch(0.75_0.18_200/0.25)] blur-[130px] animate-blob"
        style={{ animationDelay: "-14s" }}
      />

      <motion.div
        className="absolute -inset-[20%] opacity-[0.18]"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0, transparent 180px, oklch(0.85 0.18 220 / 0.5) 180px, oklch(0.85 0.18 220 / 0.5) 181px, transparent 182px, transparent 360px)",
        }}
        animate={{ x: [0, 200, 0], y: [0, -100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {particles.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const duration = 18 + (i % 7) * 3;
        const delay = (i % 5) * -4;
        const size = 2 + (i % 4);
        return (
          <motion.span
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background:
                i % 3 === 0
                  ? "oklch(0.85 0.18 200 / 0.9)"
                  : i % 3 === 1
                    ? "oklch(0.7 0.22 295 / 0.9)"
                    : "oklch(0.7 0.22 250 / 0.9)",
              boxShadow: "0 0 12px currentColor",
            }}
            animate={{ y: [0, -80, 0], x: [0, 30, -20, 0], opacity: [0, 0.9, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}

      {symbols.map((_, i) => {
        const left = (i * 71 + 7) % 95;
        const top = (i * 43 + 11) % 90;
        const duration = 22 + (i % 5) * 4;
        const delay = (i % 6) * -3;
        return (
          <motion.span
            key={`s-${i}`}
            className="absolute select-none font-mono text-sm font-semibold"
            style={{ left: `${left}%`, top: `${top}%`, color: "oklch(0.85 0.18 220 / 0.22)" }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {codeSymbols[i % codeSymbols.length]}
          </motion.span>
        );
      })}

      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full"
        animate={{ x: mouse.x - 210, y: mouse.y - 210 }}
        transition={{ type: "spring", damping: 30, stiffness: 80, mass: 0.8 }}
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.22 295 / 0.18) 0%, oklch(0.75 0.18 220 / 0.08) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1_0_0/1) 1px, transparent 1px), linear-gradient(90deg, oklch(1_0_0/1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background)_95%)]" />

      {/* Custom Cursor (Circle border gradient trailing system cursor) */}
      <div className="hidden lg:block">
        {/* Outer Ring with border gradient */}
        <motion.div
          className="custom-cursor-ring"
          style={{
            x: cursorSpringX,
            y: cursorSpringY,
            opacity: mouse.x === -500 ? 0 : 0.85,
            boxShadow: isHovered ? "var(--shadow-glow)" : "none",
          }}
          animate={{
            scale: isHovered ? 1.55 : 1,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
        />
      </div>
    </div>
  );
}
