"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";
import Footer from "@/components/Footer";
import TechMarquee from "@/components/TechMarquee";
import Contact from "@/components/Contact";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [typedText, setTypedText] = useState("");
  const cursorGlowRef = useRef<HTMLDivElement>(null);

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
      <TechMarquee />

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

      {/* 7. Contact Section */}
      <Contact />

      <Footer />
    </>
  );
}
