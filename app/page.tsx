"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SkillBarProps { label: string; percent: number; color: string; }
interface ProjectCardProps { title: string; description: string; tags: string[]; icon: string; }
interface ImpactCardProps { stat: string; label: string; icon: string; color: string; }

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBar({ label, percent, color }: SkillBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-xs font-medium text-slate-400">{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${percent}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ title, description, tags, icon }: ProjectCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(148,163,184,0.22)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 p-6 shadow-md shadow-slate-100 flex flex-col gap-4"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((t) => (
          <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ImpactCard({ stat, label, icon, color }: ImpactCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 p-6 shadow-md shadow-slate-100 text-center flex flex-col items-center gap-2"
    >
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl font-black tracking-tight" style={{ color }}>{stat}</div>
      <div className="text-sm text-slate-500 font-medium leading-snug">{label}</div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-4">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight mb-3">
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-24">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="w-2 h-2 rounded-full bg-blue-200" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Page() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  const navLinks = ["About", "Experience", "AI & Automation", "Projects", "Skills", "Contact"];

  // ─── Skills data
  const skills = [
    { label: "Python", percent: 88, color: "linear-gradient(90deg,#60a5fa,#818cf8)" },
    { label: "Machine Learning", percent: 82, color: "linear-gradient(90deg,#a78bfa,#c084fc)" },
    { label: "NLP", percent: 78, color: "linear-gradient(90deg,#34d399,#6ee7b7)" },
    { label: "ServiceNow", percent: 85, color: "linear-gradient(90deg,#fb923c,#fbbf24)" },
    { label: "SAP", percent: 80, color: "linear-gradient(90deg,#f472b6,#fb7185)" },
    { label: "SQL", percent: 83, color: "linear-gradient(90deg,#38bdf8,#60a5fa)" },
    { label: "FastAPI", percent: 75, color: "linear-gradient(90deg,#34d399,#60a5fa)" },
    { label: "Automation", percent: 87, color: "linear-gradient(90deg,#818cf8,#a78bfa)" },
  ];

  // ─── Projects
  const projects = [
    {
      icon: "📧",
      title: "Email Spam Detection",
      description:
        "Developed a high-accuracy NLP pipeline to classify spam vs. legitimate email using TF-IDF vectorization and ensemble classifiers. Achieved 97%+ precision, significantly reducing noise in enterprise inboxes.",
      tags: ["Python", "NLP", "Scikit-learn", "TF-IDF"],
    },
    {
      icon: "🐦",
      title: "Twitter Sentiment Analysis",
      description:
        "Built a real-time sentiment analysis engine ingesting live Twitter streams, applying transformer-based classification to surface public opinion trends. Visualized insights through an interactive dashboard.",
      tags: ["NLP", "Transformers", "Pandas", "Streamlit"],
    },
    {
      icon: "🏗️",
      title: "Cement Strength Prediction",
      description:
        "Engineered a regression model to predict compressive strength of cement based on mix composition, enabling data-driven quality control and reducing material waste in manufacturing operations.",
      tags: ["ML", "Feature Engineering", "XGBoost", "Python"],
    },
  ];

  // ─── Impact
  const impacts = [
    { stat: "40%", label: "Reduction in manual incident triage time", icon: "⚡", color: "#6366f1" },
    { stat: "98%", label: "SLA compliance maintained across AU/NZ clients", icon: "✅", color: "#10b981" },
    { stat: "3×", label: "Faster candidate screening via AI Resume Matcher", icon: "🤖", color: "#8b5cf6" },
    { stat: "60%", label: "Operational workload reduced via AI Voice Bot", icon: "🎙️", color: "#f59e0b" },
  ];

  return (
    <>
      {/* ── Global styles injected inline ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #f8fafc; font-family: 'DM Sans', sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased; }
        h1,h2,h3,h4 { font-family: 'Sora', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
      `}</style>

      {/* ── Floating background blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle,#bfdbfe 0%,transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,#c4b5fd 0%,transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 25, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,#99f6e4 0%,transparent 70%)" }}
        />
      </div>

      {/* ─────────────────────────── NAVBAR ─────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 border-b border-white/60 shadow-sm shadow-slate-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 sm:px-12 h-16 flex items-center justify-between">
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            className="font-black text-lg tracking-tight text-slate-800"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            <span className="text-blue-500">{"<"}</span>
            Piyush Patel
            <span className="text-blue-500">{" />"}</span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/[^a-z]/g, "-")}`}
                whileHover={{ color: "#3b82f6" }}
                className="text-sm font-medium text-slate-500 transition-colors duration-200"
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-semibold px-5 py-2 rounded-xl text-white shadow-md shadow-blue-200"
              style={{ background: "linear-gradient(135deg,#60a5fa,#818cf8)" }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-600 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-slate-600 mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-slate-600 mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-slate-600 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/60 px-6 py-4 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-slate-600"
                >
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-8 sm:px-12 overflow-hidden">
        <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative inline-block mb-8"
          >
            <div
              className="w-28 h-28 rounded-3xl mx-auto overflow-hidden shadow-xl shadow-blue-100"
              style={{ background: "linear-gradient(135deg,#bfdbfe,#ddd6fe,#99f6e4)" }}
            >
              <img
                src="/avatar.png"
                alt="Piyush Patel"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-3 rounded-[28px] border-2 border-blue-200/40"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-blue-100 rounded-full px-4 py-1.5 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-600">Open to opportunities</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-5xl sm:text-7xl font-black tracking-tight text-slate-800 leading-[1.05] mb-4"
          >
            Associate Engineer
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)" }}
            >
              AI/Automation
            </span>
            {" "}Specialist
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Building intelligent systems, managing enterprise-grade production environments,
            and engineering AI-powered automation that reduces operational overhead at scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(96,165,250,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg shadow-blue-200 transition-shadow"
              style={{ background: "linear-gradient(135deg,#60a5fa,#818cf8)" }}
            >
              Let's Connect →
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-2xl text-slate-700 font-bold text-sm bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:border-blue-200 transition-colors"
            >
              ↓ Download Resume
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-slate-200 flex items-start justify-center pt-1"
            >
              <div className="w-1 h-2 rounded-full bg-blue-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">

        {/* ─────────────────────────── IMPACT ─────────────────────────── */}
        <section className="py-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {impacts.map((imp) => (
              <ImpactCard key={imp.label} {...imp} />
            ))}
          </motion.div>
        </section>

        <Divider />

        {/* ─────────────────────────── EXPERIENCE ─────────────────────────── */}
        <section id="experience" className="scroll-mt-20 py-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Experience</SectionLabel>
              <SectionHeading>Professional Background</SectionHeading>
              <p className="text-slate-500 max-w-xl mb-12">
                A track record of reliability, cross-functional impact, and operational excellence in high-stakes enterprise environments.
              </p>
            </motion.div>

            {/* Experience card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-md shadow-slate-100 p-8 mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#bfdbfe,#ddd6fe)" }}
                >
                  🖥️
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-lg font-bold text-slate-800">Associate Engineer</h3>
                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start">
                      Current Role
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">Rigved Info Tech · Client: Holcim Australia & New Zealand</p>
                  {/* company confirmed */}
                </div>
              </div>
            <ul className="space-y-4">
  {[
    "Owning critical production incident triage, root cause analysis, and resolution—consistently meeting and exceeding SLA targets in high-responsibility live environments.",
    "Performing deep diagnostic investigations on hardware, software, and network failures, driving permanent resolutions rather than temporary workarounds.",
    "Collaborating cross-functionally with infrastructure, application, and business teams to coordinate incident response and minimize business impact during outages.",
    "Administering and supporting ServiceNow and SAP platforms across enterprise workflows, ensuring system integrity and user productivity at scale.",
    "Maintaining detailed incident records, contributing to knowledge bases, and championing process improvements that increase operational reliability over time.",
  ].map((item, i) => (
    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
      <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
      {item}
    </li>
  ))}
</ul>
              <div className="flex flex-wrap gap-2 mt-6">
                {["ServiceNow", "SAP", "ITIL", "Incident Management", "SLA Compliance", "Root Cause Analysis"].map((t) => (
                  <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* HCL Internship */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-md shadow-slate-100 p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#d1fae5,#a7f3d0)" }}
                >
                  🤖
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-lg font-bold text-slate-800">Machine Learning Intern</h3>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 self-start">
                      Jul 2024 – Sep 2024
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">HCL Tech · Remote</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Performed exploratory data analysis (EDA), preprocessing, and feature engineering on large datasets to prepare clean, model-ready inputs.",
                  "Built and validated machine learning models for predictive analysis, evaluating performance using cross-validation and standard ML metrics.",
                  "Gained hands-on experience with the full ML pipeline — from raw data ingestion to model evaluation and iteration.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Python", "Pandas", "Scikit-learn", "EDA", "Feature Engineering", "NumPy"].map((t) => (
                  <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <Divider />

        {/* ─────────────────────────── AI & AUTOMATION ─────────────────────────── */}
        <section id="ai-&-automation" className="scroll-mt-20 py-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>AI & Automation</SectionLabel>
              <SectionHeading>Intelligent Systems Engineering</SectionHeading>
              <p className="text-slate-500 max-w-2xl mb-12">
                Building intelligent automation systems that reduce manual operations, accelerate workflows, and bring enterprise-grade AI capabilities to real business problems.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Voice Bot */}
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-white/80 shadow-md shadow-slate-100 p-8 overflow-hidden relative"
                style={{ background: "linear-gradient(135deg,rgba(219,234,254,0.6),rgba(237,233,254,0.5))" }}
              >
                <div className="text-4xl mb-4">🎙️</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">AI Voice Bot</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Engineered a fully autonomous AI Voice Bot that handles end-to-end customer interactions without human intervention. The system integrates real-time <strong>speech-to-text</strong> transcription, routes queries through an <strong>LLM-powered conversation engine</strong>, and delivers natural responses via <strong>text-to-speech synthesis</strong>—all in under two seconds.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Real-time STT/TTS pipeline with sub-2s response latency",
                    "LLM-driven context-aware dialogue management",
                    "Automated client interaction workflows — 60% workload reduction",
                    "Multi-service API integration (CRM, ticketing, knowledge base)",
                    "Graceful fallback escalation to human agents when needed",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-violet-400 flex-shrink-0">✦</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {["Python", "OpenAI", "FastAPI", "WebSockets", "Twilio", "NLP"].map((t) => (
                    <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-white/70 text-violet-600 border border-violet-100">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Resume Matcher */}
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-white/80 shadow-md shadow-slate-100 p-8 overflow-hidden relative"
                style={{ background: "linear-gradient(135deg,rgba(209,250,229,0.6),rgba(187,247,208,0.4))" }}
              >
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">AI Resume Matcher</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Developed an intelligent candidate screening system using <strong>NLP-based resume parsing</strong> and <strong>semantic similarity matching</strong> to automatically rank applicants against job descriptions. Replaced hours of manual review with an automated pipeline that surfaces the best-fit candidates in seconds.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "NLP resume parser extracting structured skills, experience & education",
                    "Semantic vector embedding for deep concept-level matching",
                    "Intelligent candidate ranking with explainable match scores",
                    "Automated screening workflow — 3× faster than manual review",
                    "Bias-mitigated matching based purely on skills and relevance",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-emerald-400 flex-shrink-0">✦</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {["Python", "spaCy", "Sentence Transformers", "FastAPI", "FAISS", "NLP"].map((t) => (
                    <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-white/70 text-emerald-600 border border-emerald-100">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ─────────────────────────── PROJECTS ─────────────────────────── */}
        <section id="projects" className="scroll-mt-20 py-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Projects</SectionLabel>
              <SectionHeading>ML & Data Science Work</SectionHeading>
              <p className="text-slate-500 max-w-xl mb-12">
                Applied machine learning projects spanning classification, NLP, and predictive modeling — from data ingestion to production-ready APIs.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ─────────────────────────── SKILLS ─────────────────────────── */}
        <section id="skills" className="scroll-mt-20 py-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Skills</SectionLabel>
              <SectionHeading>Technical Proficiency</SectionHeading>
              <p className="text-slate-500 max-w-xl mb-12">
                A blend of enterprise IT operations expertise and modern AI/ML engineering capabilities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-2 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-md shadow-slate-100 p-10">
              {skills.map((s) => (
                <SkillBar key={s.label} {...s} />
              ))}
            </div>

            {/* Tech badges */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 justify-center">
              {[
                "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn",
                "FastAPI", "Flask", "Django", "REST APIs", "JSON",
                "MySQL", "SAP NetWeaver", "Ozonetel", "GitHub", "VS Code",
                "TensorFlow", "ServiceNow", "C/C++"
              ].map((t) => (
                <span key={t} className="text-sm font-medium px-4 py-2 rounded-xl bg-white/70 backdrop-blur border border-slate-200 text-slate-600 shadow-sm">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <Divider />

        {/* ─────────────────────────── CONTACT ─────────────────────────── */}
        <section id="contact" className="scroll-mt-20 py-16 pb-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Contact</SectionLabel>
              <SectionHeading>Let's Connect</SectionHeading>
              <p className="text-slate-500 max-w-lg mx-auto mb-10">
                Open to full-time roles, contract work, and AI/automation consulting. Let's talk about how I can add value to your team.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.a
                href="mailto:pv9044056@gmail.com"
                whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(96,165,250,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-white font-bold shadow-lg shadow-blue-200"
                style={{ background: "linear-gradient(135deg,#60a5fa,#818cf8)" }}
              >
                ✉️ &nbsp; Email Me
              </motion.a>
              <motion.a
                href="tel:+919324884632"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-slate-700 font-bold bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:border-blue-200 transition-colors"
              >
                📱 &nbsp; +91 93248 84632
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ppiyush4232"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-slate-700 font-bold bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:border-blue-200 transition-colors"
              >
                🔗 &nbsp; LinkedIn
              </motion.a>
              <motion.a
                href="https://github.com/piyushpatel"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-slate-700 font-bold bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:border-blue-200 transition-colors"
              >
                🐙 &nbsp; GitHub
              </motion.a>
              <motion.a
                href="/Piyush.Patel_9324884632_Resume.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-slate-700 font-bold bg-white/70 backdrop-blur border border-slate-200 shadow-sm hover:border-blue-200 transition-colors"
              >
                ↓ &nbsp; Resume
              </motion.a>
            </motion.div>

            {/* CTA card */}
            <motion.div
              variants={fadeUp}
              className="inline-block rounded-3xl p-8 text-left max-w-lg mx-auto shadow-xl shadow-blue-100 border border-white/80"
              style={{ background: "linear-gradient(135deg,rgba(219,234,254,0.7),rgba(237,233,254,0.6))" }}
            >
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Currently Available</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                I'm actively looking for roles where I can combine enterprise IT operations experience with AI/automation engineering — ideally in a team that values both production stability and innovation.
              </p>
            </motion.div>
          </motion.div>
        </section>
        <Divider />

        {/* ─────────────────────────── EDUCATION ─────────────────────────── */}
        <section className="scroll-mt-20 py-16 pb-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Education & Certifications</SectionLabel>
              <SectionHeading>Academic Background</SectionHeading>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 p-6 shadow-md shadow-slate-100"
              >
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="font-bold text-slate-800 mb-1">B.Tech — Computer Science</h3>
                <p className="text-sm text-blue-500 font-semibold mb-1">ITS Engineering College, Greater Noida</p>
                <p className="text-xs text-slate-400">2021 – 2025 &nbsp;·&nbsp; First Class</p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 p-6 shadow-md shadow-slate-100"
              >
                <div className="text-3xl mb-3">📜</div>
                <h3 className="font-bold text-slate-800 mb-3">Certifications</h3>
                <ul className="space-y-2">
                  {[
                    "Machine Learning Development — iNeuron",
                    "Data Science Libraries — iNeuron",
                    "C Programming — Incapp",
                  ].map((cert) => (
                    <li key={cert} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-blue-400 flex-shrink-0">▸</span> {cert}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ─────────────────────────── FOOTER ─────────────────────────── */}
      <footer className="border-t border-slate-100 py-8 px-6 text-center">
        <p className="text-xs text-slate-400 font-medium">
          Built with Next.js · Tailwind CSS · Framer Motion &nbsp;·&nbsp; © {new Date().getFullYear()} Piyush Patel. All rights reserved.
        </p>
      </footer>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg,#60a5fa,#818cf8,#34d399)",
        }}
      />
    </>
  );
} 