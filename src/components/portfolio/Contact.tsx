import { motion } from "motion/react";
import { useState } from "react";
import { Section } from "./Section";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "rushikeshpote2005@gmail.com",
    href: "mailto:rushikeshpote2005@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+91 7020659533", href: "tel:+917020659533" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/rushikeshpote",
    href: "https://linkedin.com/in/rushikeshpote",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@rushikeshpote",
    href: "https://github.com/rushikeshpote",
  },
];

export function Contact() {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      tempErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!publicKey || publicKey === "YOUR_PUBLIC_KEY") {
      toast.error(
        "EmailJS Public Key is not configured. Please set VITE_EMAILJS_PUBLIC_KEY in your Vercel/environment settings."
      );
      setSending(false);
      return;
    }

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Thank you for reaching out. I will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err: any) {
      console.error("EmailJS send error:", err);
      toast.error(
        err.text || "Failed to send message. Please check your credentials or try again later."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build <span className="gradient-text">something great</span>
        </>
      }
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
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>
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
          onSubmit={handleSubmit}
          className="glass-strong rounded-3xl p-7"
        >
          <div className="grid gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className={`mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground ${
                  errors.name
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-[oklch(0.7_0.22_295)]"
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className={`mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-[oklch(0.7_0.22_295)]"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject of your message"
                className={`mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground ${
                  errors.subject
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-[oklch(0.7_0.22_295)]"
                }`}
              />
              {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project (at least 10 characters)..."
                className={`mt-2 w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground ${
                  errors.message
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-[oklch(0.7_0.22_295)]"
                }`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-background glow transition-transform hover:scale-[1.02] disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  Send Message{" "}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}
