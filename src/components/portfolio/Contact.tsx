import { motion } from "motion/react";
import { useState } from "react";
import { Section } from "./Section";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { toast } from "sonner";

const contacts = [
  { icon: Mail, label: "Email", value: "rushikeshpote2005@gmail.com", href: "mailto:rushikeshpote2005@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 7020659533", href: "tel:+917020659533" },
  { icon: Linkedin, label: "LinkedIn", value: "/in/rushikeshpote", href: "https://linkedin.com/in/rushikeshpote" },
  { icon: Github, label: "GitHub", value: "@rushikeshpote", href: "https://github.com/rushikeshpote" },
];

export function Contact() {
  const [sending, setSending] = useState(false);
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Let's build <span className="gradient-text">something great</span></>}
      description="Have a project in mind or just want to chat? Drop a message."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3 content-start">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass gradient-border flex items-center gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary">
                <c.icon className="h-5 w-5 text-background" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="text-sm font-medium">{c.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              toast.success("Message sent! I'll get back to you soon.");
              (e.target as HTMLFormElement).reset();
            }, 800);
          }}
          className="glass-strong rounded-3xl p-7"
        >
          <div className="grid gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
              <input
                required
                type="text"
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[oklch(0.7_0.22_295)]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[oklch(0.7_0.22_295)]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[oklch(0.7_0.22_295)]"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-background glow transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {sending ? "Sending..." : (<>Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>)}
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}