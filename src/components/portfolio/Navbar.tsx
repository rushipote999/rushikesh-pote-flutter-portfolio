import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between px-5 transition-all duration-300 ${
          scrolled
            ? "glass-strong rounded-2xl max-w-[calc(1152px-2rem)] w-[calc(100%-2rem)] shadow-lg"
            : "max-w-6xl w-full"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary glow">
            <Code2 className="h-5 w-5 text-background" />
          </div>
          <span className="font-semibold tracking-tight">
            Rushikesh<span className="gradient-text">.dev</span>
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 border border-white/5 dark:bg-white/5 dark:border-white/5 bg-black/5 border-black/5 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/10 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Toggle dark/light mode"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-full gradient-primary px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-105 md:inline-block"
          >
            Hire Me
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
