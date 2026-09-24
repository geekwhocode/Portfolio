"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [typedText, setTypedText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  const technologies = [
    { name: "Next.js", icon: "devicon-nextjs-plain" },
    { name: "React", icon: "devicon-react-original" },
    { name: "TypeScript", icon: "devicon-typescript-plain" },
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "Python", icon: "devicon-python-plain" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
    { name: "MongoDB", icon: "devicon-mongodb-plain" },
    { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
    { name: "Docker", icon: "devicon-docker-plain" },
    { name: "Git", icon: "devicon-git-plain" },
  ];

  useEffect(() => {
    // 1. Cursor Glow Effect
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${glowX - 200}px, ${
          glowY - 200
        }px)`;
      }
      animationFrameId = requestAnimationFrame(animateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateGlow();

    // 2. Typing Effect
    let typingTimeoutId: NodeJS.Timeout;
    const textToType = "Software Development Engineer & AI\u00A0Specialist.";
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < textToType.length) {
        setTypedText(textToType.slice(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutId = setTimeout(typeWriter, 40);
      }
    };
    
    // Start typing after initial delay
    const initialDelayId = setTimeout(typeWriter, 1000);

    // 3. Navbar Scroll Effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 4. Vanilla Tilt
    const tiltElements = Array.from(
      document.querySelectorAll(".service-card, .project-card, .education-card, .cert-card, .skills-section")
    ) as HTMLElement[];
    
    if (tiltElements.length > 0) {
      VanillaTilt.init(tiltElements, {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
      });
    }

    // 5. Intersection Observer Reveal
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px",
      }
    );
    revealElements.forEach((el) => observer.observe(el));

    // 6. Active Section Observer
    const sections = document.querySelectorAll("section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-20% 0px -50% 0px",
      }
    );
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      sectionObserver.disconnect();
      clearTimeout(typingTimeoutId);
      clearTimeout(initialDelayId);
      tiltElements.forEach((el: any) => {
        if (el.vanillaTilt) el.vanillaTilt.destroy();
      });
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = new URLSearchParams();
    
    // Convert FormData to URLSearchParams
    formData.forEach((value, key) => {
      data.append(key, value.toString());
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="cursor-glow" ref={cursorGlowRef}></div>

      {/* 1. Navigation Bar */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-content">
          <Link href="#" className="logo">
            Aman<span>Virk</span>
          </Link>
          <ul className="nav-links">
            <li>
              <Link href="#home" className={activeSection === "home" ? "active-link" : ""}>Home</Link>
            </li>
            <li>
              <Link href="#expertise" className={activeSection === "expertise" ? "active-link" : ""}>Expertise</Link>
            </li>
            <li>
              <Link href="#experience" className={activeSection === "experience" ? "active-link" : ""}>Experience</Link>
            </li>
            <li>
              <Link href="#projects" className={activeSection === "projects" ? "active-link" : ""}>Projects</Link>
            </li>
            <li>
              <Link href="#skills" className={activeSection === "skills" ? "active-link" : ""}>Skills</Link>
            </li>
            <li>
              <Link href="#contact" className={activeSection === "contact" ? "active-link" : ""}>Contact</Link>
            </li>
          </ul>
          <Link href="#contact" className="cta-button">
            Hire Me
          </Link>
          <button className="mobile-menu-btn" aria-label="Toggle Menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="hero section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="badge-container">
              <span className="availability-badge">
                <span className="pulse-dot"></span> Seeking Full-Time Roles |
                Available for Freelance
              </span>
            </div>
            <h1 className="hero-title">
              Hi, I am Aman Virk. <br />
              <span style={{ display: "inline-grid", gridTemplateColumns: "1fr" }}>
                <span
                  style={{
                    gridArea: "1 / 1",
                    visibility: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  Software Development Engineer & AI&nbsp;Specialist.
                </span>
                <span style={{ gridArea: "1 / 1" }}>
                  <span className="gradient-text typing-text">
                    {typedText}
                  </span>
                </span>
              </span>
            </h1>
            <p className="hero-subtitle">
              Computer Science graduate with expertise in building
              production-grade full-stack systems and AI/LLM applications.
            </p>

            <div className="hero-actions">
              <Link href="#projects" className="btn btn-primary">
                View My Work
              </Link>
              <a
                href="https://docs.google.com/document/d/1LGgYmtB7UcOwWmwoPhyTcIC27L16U6vvyxmd2aAPpE8/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                View Resume
              </a>
              <Link href="#contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>

            <div className="hero-socials">
              <a
                href="https://github.com/geekwhocode"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/geekwhocode/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="hero-image reveal">
            <div className="image-wrapper-square">
              <img src="https://github.com/geekwhocode.png" alt="Aman Virk" />
            </div>
          </div>
        </div>
      </section>

      {/* Seamless Blended Marquee (Tech Stack) Full Width Separator */}
      <div className="marquee-glass-wrapper">
        <div className="marquee-container">
          <div className="marquee-track">
            {/* First Set */}
            {technologies.map((tech, i) => (
              <div key={`tech-1-${i}`} className="marquee-item">
                <i className={`${tech.icon} marquee-icon`}></i> {tech.name}
              </div>
            ))}
            {/* Second Set for seamless infinite loop */}
            {technologies.map((tech, i) => (
              <div key={`tech-2-${i}`} className="marquee-item">
                <i className={`${tech.icon} marquee-icon`}></i> {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Expertise & Services Section */}
      <section id="expertise" className="section">
        <div className="section-header reveal">
          <h2 className="section-title">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-desc">What I bring to the table.</p>
        </div>

        <div className="services-grid">
          <div className="service-card reveal">
            <div className="card-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3>01. AI & LLM Integration</h3>
            <p>
              Building advanced Agentic RAG pipelines. Designing multi-agent
              architectures using LangGraph and LangChain. Implementing semantic
              search using ChromaDB and pgvector.
            </p>
          </div>

          <div className="service-card reveal">
            <div className="card-icon">
              <i className="fas fa-layer-group"></i>
            </div>
            <h3>02. Full-Stack Development</h3>
            <p>
              Developing scalable microservices and full-stack applications.
              Designing robust RESTful APIs with Python, FastAPI, React.js, and
              TypeScript.
            </p>
          </div>

          <div className="service-card reveal">
            <div className="card-icon">
              <i className="fas fa-cloud"></i>
            </div>
            <h3>03. Cloud & DevOps</h3>
            <p>
              Offering technical architecture design. Managing AWS and Linux
              (Ubuntu) backend deployments. Setting up Dockerized CI/CD
              workflows for scalable production environments.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Experience Section */}
      <section id="experience" className="section">
        <div className="section-header reveal">
          <h2 className="section-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Software Development Engineer (SDE) Intern</h3>
                <span className="timeline-date">Jan 2026 – June 2026</span>
              </div>
              <h4 className="timeline-company">Rama Motor-CFE</h4>
              <ul className="timeline-details">
                <li>
                  Spearheaded the end-to-end technical architecture of "ReDrive"
                  (full-stack vehicle marketplace) as the sole developer using
                  FastAPI and PostgreSQL on Linux.
                </li>
                <li>
                  Designed an AI Virtual Assistant using Python and GenAI
                  embeddings, reducing customer query resolution time by 60%.
                </li>
                <li>
                  Architected production-ready backend systems on Linux
                  achieving 99.9% uptime at 200+ concurrent requests.
                </li>
                <li>
                  Bridged backend engineering and cloud deployment by
                  establishing CI/CD workflows and documenting AWS architecture.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Projects Section */}
      <section id="projects" className="section">
        <div className="section-header reveal">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-desc">Some of the things I've built recently.</p>
        </div>

        <div className="projects-grid">
          <div className="project-card reveal">
            <div className="project-content">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3 style={{ marginBottom: "0" }}>StateScout</h3>
                <a
                  href="https://github.com/geekwhocode/StateScout"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub repo"
                  style={{
                    color: "var(--accent-blue)",
                    fontSize: "1.5rem",
                    transition: "var(--transition)",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "var(--primary-blue)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "var(--accent-blue)")
                  }
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
              <div className="tags">
                <span>Python</span>
                <span>LangGraph</span>
                <span>LangChain</span>
                <span>Agentic RAG</span>
                <span>pgvector</span>
                <span>FastAPI</span>
                <span>Docker</span>
              </div>
              <p>
                Engineered an autonomous 4-agent research platform that cuts
                complex research time by 70%. Designed an advanced RAG pipeline
                with Markdown-header splitting and real-time SSE streaming to a
                React frontend with sub-200ms latency.
              </p>
            </div>
          </div>

          <div className="project-card reveal">
            <div className="project-content">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3 style={{ marginBottom: "0" }}>DocumentDoc</h3>
                <a
                  href="https://github.com/geekwhocode/DocumentDoc"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub repo"
                  style={{
                    color: "var(--accent-blue)",
                    fontSize: "1.5rem",
                    transition: "var(--transition)",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "var(--primary-blue)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "var(--accent-blue)")
                  }
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
              <div className="tags">
                <span>Python</span>
                <span>FastAPI</span>
                <span>RAG</span>
                <span>ChromaDB</span>
                <span>LiteLLM</span>
                <span>React</span>
              </div>
              <p>
                Built a production-grade full-stack RAG application supporting
                PDF, DOCX, and TXT ingestion. Engineered a hybrid retrieval
                pipeline with LLM-powered query rewriting and dual-query
                ensemble retrieval, improving top-K passage relevance by 25%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technical Skills & Education Section */}
      <section id="skills" className="section">
        <div className="section-header reveal">
          <h2 className="section-title">
            Skills & <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="skills-edu-container">
          <div className="skills-section reveal">
            <div className="skill-category">
              <h4>Languages</h4>
              <div className="tags">
                <span className="tag-outline">Python</span>
                <span className="tag-outline">JavaScript</span>
                <span className="tag-outline">TypeScript</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>AI/LLM</h4>
              <div className="tags">
                <span className="tag-outline">LangChain</span>
                <span className="tag-outline">LangGraph</span>
                <span className="tag-outline">QLoRA</span>
                <span className="tag-outline">LiteLLM</span>
                <span className="tag-outline">Transformers</span>
                <span className="tag-outline">RAGAS</span>
                <span className="tag-outline">DeepEval</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Databases / Vector Stores</h4>
              <div className="tags">
                <span className="tag-outline">ChromaDB</span>
                <span className="tag-outline">pgvector</span>
                <span className="tag-outline">PostgreSQL</span>
                <span className="tag-outline">MongoDB</span>
                <span className="tag-outline">Redis</span>
                <span className="tag-outline">Supabase</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Backend & Frontend</h4>
              <div className="tags">
                <span className="tag-outline">FastAPI</span>
                <span className="tag-outline">Django</span>
                <span className="tag-outline">Node.js</span>
                <span className="tag-outline">React.js</span>
                <span className="tag-outline">Next.js</span>
                <span className="tag-outline">Tailwind CSS</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>DevOps</h4>
              <div className="tags">
                <span className="tag-outline">AWS</span>
                <span className="tag-outline">Docker</span>
                <span className="tag-outline">Linux</span>
                <span className="tag-outline">CI/CD</span>
                <span className="tag-outline">Nginx</span>
              </div>
            </div>
          </div>

          <div className="right-cards-container">
            <div className="education-card reveal">
              <div className="card-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Bachelor of Technology in Computer Science and Engineering</h3>
              <p className="edu-gpa">8.20 CGPA</p>
              <p className="edu-university">
                Guru Nanak Dev University, Amritsar
              </p>
              <p className="edu-year">2022 – 2026</p>
            </div>

            <div className="cert-card reveal">
              <div className="card-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Certifications</h3>
              <ul className="cert-list">
                <li>
                  <span className="cert-name">
                    AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents
                  </span>
                  <span className="cert-issuer">Udemy</span>
                </li>
                <li>
                  <span className="cert-name">
                    Google Cloud Computing Foundations
                  </span>
                  <span className="cert-issuer">Google</span>
                </li>
                <li>
                  <span className="cert-name">
                    Postman API Fundamentals Student Expert
                  </span>
                  <span className="cert-issuer">Postman</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contact Section & Footer */}
      <section id="contact" className="section flex flex-col items-center">
        <div className="section-header reveal">
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Great</span>{" "}
            Together.
          </h2>
        </div>

        <div className="w-full max-w-5xl reveal mt-12 mb-20">
          <div className="bg-[#111827] border border-slate-800 rounded-xl shadow-2xl flex flex-col">
            
            {/* macOS Header Bar */}
            <div className="bg-[#1F2937] rounded-t-xl px-5 py-3 flex items-center border-b border-slate-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Left Column: Form */}
              <div className="w-full md:w-3/5" style={{ padding: '2.5rem 3rem' }}>
                <h3 className="text-3xl font-bold text-white" style={{ marginBottom: '1rem' }}>Let's Connect Over Coffee</h3>
                <p className="text-[#a0a0a0] text-sm md:text-base leading-relaxed" style={{ marginBottom: '2rem' }}>
                  Got a question or need some help? Drop me a message, and I'll get back to you within 2 hours. I'm here to ensure you get the support you need!
                </p>

                <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden" style={{ display: 'none' }}>
                    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                  </p>
                  
                  {/* Row 1: Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="firstName"
                        placeholder="First Name" 
                        required
                        className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                        style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="lastName"
                        placeholder="Last Name" 
                        required
                        className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                        style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Contact */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address" 
                        required
                        className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                        style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="Phone Number" 
                        required
                        className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                        style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="relative">
                    <input 
                      type="text" 
                      name="message"
                      placeholder="Share Your Thoughts" 
                      required
                      className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                      style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                    />
                  </div>

                  <div style={{ paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? "Sending..." : "Get in touch"}
                    </button>
                    {submitStatus === "success" && <span className="text-green-400 text-sm font-medium">Message sent successfully!</span>}
                    {submitStatus === "error" && <span className="text-red-400 text-sm font-medium">Oops, something went wrong.</span>}
                  </div>
                </form>
              </div>

              {/* Right Column: Contact Info */}
              <div className="w-full md:w-2/5 bg-[#0a0f1c] border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-center rounded-b-xl md:rounded-b-none md:rounded-br-xl" style={{ padding: '2.5rem 3rem' }}>
                <h3 className="text-2xl font-bold text-white text-center" style={{ marginBottom: '3.5rem' }}>Contact Details</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <a href="mailto:thegeekwhocode@gmail.com" className="flex items-center group" style={{ gap: '1.25rem' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                      <i className="fas fa-envelope text-lg text-blue-400 group-hover:text-white transition-colors" style={{ display: 'block' }}></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-white font-medium text-sm">thegeekwhocode@gmail.com</p>
                    </div>
                  </a>

                  <a href="tel:+917880000778" className="flex items-center group" style={{ gap: '1.25rem' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                      <i className="fas fa-phone-alt text-lg text-blue-400 group-hover:text-white transition-colors" style={{ display: 'block' }}></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-white font-medium text-sm">+91-7880000778</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center group cursor-default" style={{ gap: '1.25rem' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                      <i className="fas fa-map-marker-alt text-lg text-blue-400 group-hover:text-white transition-colors" style={{ display: 'block' }}></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Location</p>
                      <p className="text-white font-medium text-sm">Jalandhar, Punjab</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 Aman Virk. Designed and Built with ❤️.</p>
      </footer>
    </>
  );
}
