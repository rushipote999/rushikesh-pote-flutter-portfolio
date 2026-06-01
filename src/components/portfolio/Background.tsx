import { useEffect, useState } from "react";
import { motion } from "motion/react";

const codeSymbols = ["</>", "{ }", "()", "=>", "[]", "&&", "||", "::", "#!", "/*", "*/", "++"];

export function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const particles = Array.from({ length: 18 });
  const symbols = Array.from({ length: 14 });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.2_0.08_290/0.45),transparent_60%)]" />

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
      <div className="absolute top-[30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[oklch(0.6_0.22_240/0.3)] blur-[140px] animate-blob" style={{ animationDelay: "-7s" }} />
      <div className="absolute bottom-[-10%] left-[20%] h-[550px] w-[550px] rounded-full bg-[oklch(0.75_0.18_200/0.25)] blur-[130px] animate-blob" style={{ animationDelay: "-14s" }} />

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

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,oklch(0.08_0.01_280)_95%)]" />
    </div>
  );
}