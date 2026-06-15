import { motion } from "motion/react";
import { Section } from "./Section";
import { Briefcase } from "lucide-react";

const items = [
  {
    role: "Mobile Application Developer",
    company: "BAAP Company, Sangamner",
    period: "Nov 2023 – Present",
    points: [
      "Developed and maintained enterprise Flutter applications for Android, iOS, and Web platforms.",
      "Implemented MVC Architecture with GetX and BLoC patterns, reducing codebase complexity.",
      "Integrated REST APIs, Firebase Services (FCM, Auth), payment gateways, and geolocation SDKs.",
      "Optimized performance and API responses to ensure standard 60fps rendering speeds.",
      "Led a team of developers for the Janhit civic application, managing project architecture and deployment.",
    ],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>A track record of <span className="gradient-text">shipping work</span></>}
    >
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[oklch(0.68_0.25_300)] via-[oklch(0.7_0.22_250)] to-transparent md:left-6" />
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-14 md:pl-20 mb-10 last:mb-0"
          >
            <div className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full gradient-primary glow md:h-12 md:w-12">
              <Briefcase className="h-4 w-4 text-background md:h-5 md:w-5" />
            </div>
            <div className="glass gradient-border rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="text-sm font-semibold gradient-text">{item.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full gradient-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}