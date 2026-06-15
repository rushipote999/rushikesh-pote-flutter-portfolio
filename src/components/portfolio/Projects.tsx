import { motion } from "motion/react";
import { Section } from "./Section";
import { ExternalLink, Github, Briefcase, GraduationCap, Landmark, Sparkles, ShoppingBag, type LucideIcon } from "lucide-react";

interface Project {
  title: string;
  description: string;
  features: string[];
  tech: string[];
  icon: LucideIcon;
  accent: string;
  playStore?: string;
  appStore?: string;
  liveDemo?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "TreeCoin (Finance App)",
    description: "A comprehensive fintech mobile application designed to streamline bank loan workflows. Developed a hierarchical system featuring origination branches, agent organizations, agent onboarding, customer registration, and a multi-stage loan approval/rejection decision system.",
    features: [
      "Frontend Team Leadership",
      "BLoC State Management",
      "Org & Agent Onboarding Flows",
      "Loan Apply/Approve/Reject Flow",
      "Bank Loan & Financial Workflows",
      "Secure REST API Integrations",
    ],
    tech: ["Flutter", "Dart", "BLoC Pattern", "REST APIs", "Financial Workflows"],
    icon: Landmark,
    accent: "from-[oklch(0.6_0.25_140)] to-[oklch(0.75_0.18_180)]",
    playStore: "https://play.google.com/store/apps/details?id=com.treecoin.app&pcampaignid=web_share",
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
      "Push Alerts & Multi-Language Support",
    ],
    tech: ["Flutter", "Dart", "GetX", "GoRouter", "Dio (REST API)", "Google Maps SDK", "Firebase FCM"],
    icon: Briefcase,
    accent: "from-[oklch(0.68_0.25_300)] to-[oklch(0.7_0.22_250)]",
    playStore: "https://play.google.com/store/apps/details?id=com.baap.crm.app&pcampaignid=web_share",
    appStore: "https://apps.apple.com/us/app/baap-crm/id6746981287",
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
      "Push Notifications",
    ],
    tech: ["Flutter", "Firebase", "Firebase Auth", "Real-time Database", "Push Notifications"],
    icon: GraduationCap,
    accent: "from-[oklch(0.7_0.22_250)] to-[oklch(0.85_0.18_200)]",
    playStore: "https://play.google.com/store/apps/details?id=com.school.book.app&pcampaignid=web_share",
    appStore: "https://apps.apple.com/us/app/school-book-app/id6746955392",
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
      "Analytics & Reports",
    ],
    tech: ["Flutter", "Node.js", "Firebase", "REST APIs", "GPS Integration"],
    icon: Landmark,
    accent: "from-[oklch(0.55_0.25_275)] to-[oklch(0.68_0.25_300)]",
    playStore: "https://play.google.com/store/apps/details?id=com.government.janhit&pcampaignid=web_share",
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
      "Order Tracking",
    ],
    tech: ["Flutter", "Dart", "GetX", "REST APIs", "Dio", "Payment Gateway", "Inventory Management"],
    icon: ShoppingBag,
    accent: "from-[oklch(0.85_0.18_200)] to-[oklch(0.55_0.25_275)]",
    playStore: "https://play.google.com/store/apps/details?id=com.rmdrip.dealer&pcampaignid=web_share",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title={<>Selected <span className="gradient-text">work</span></>}
      description="A few production apps I've architected and shipped."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.015 }}
            className="group glass gradient-border relative overflow-hidden rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_oklch(0.7_0.22_295/0.55)]"
          >
            <div className={`absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-60`} />
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]`} />
            <div className="relative">
              <div className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${p.accent}`}>
                <p.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

              <ul className="mt-5 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full gradient-primary" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.playStore && (
                  <a
                    href={p.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Play Store
                  </a>
                )}
                {p.appStore && (
                  <a
                    href={p.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> App Store
                  </a>
                )}
                {p.liveDemo && (
                  <a
                    href={p.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                  </a>
                )}
                {!p.playStore && !p.appStore && !p.liveDemo && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground">
                    <ExternalLink className="h-3.5 w-3.5 opacity-50" /> Internal App
                  </span>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold hover:bg-white/10"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}