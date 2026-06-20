import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-5 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.22_295)]/60 to-transparent" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="gradient-text font-semibold">Rushikesh Pote</span>. Crafted with
            Flutter-grade care.
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: "https://github.com/rushikeshpote", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/rushikeshpote", label: "LinkedIn" },
              { icon: Mail, href: "mailto:rushikeshpote2005@gmail.com", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="glass grid h-10 w-10 place-items-center rounded-full transition-transform hover:-translate-y-0.5 hover:bg-white/10"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
