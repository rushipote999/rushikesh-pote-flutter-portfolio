export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.2_0.08_290/0.4),transparent_60%)]" />
      <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[oklch(0.55_0.25_295/0.35)] blur-[120px] animate-blob" />
      <div className="absolute top-[30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[oklch(0.6_0.22_240/0.3)] blur-[140px] animate-blob" style={{ animationDelay: "-7s" }} />
      <div className="absolute bottom-[-10%] left-[20%] h-[550px] w-[550px] rounded-full bg-[oklch(0.75_0.18_200/0.25)] blur-[130px] animate-blob" style={{ animationDelay: "-14s" }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,oklch(0.08_0.01_280)_90%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1_0_0/1) 1px, transparent 1px), linear-gradient(90deg, oklch(1_0_0/1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}