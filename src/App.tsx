/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { 
  Mail, 
  FileText, 
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  Cloud, 
  ChevronRight,
  MapPin,
  Menu, 
  X
} from "lucide-react";

const LINKS = {
  cv: "/johan-janers-cv-dotnet-developer.pdf",
  social: {
    github: "https://github.com/johanjaners",
    linkedin: "https://www.linkedin.com/in/johan-janers/",
    email: "mailto:johanjaners@gmail.com",
  },
  projects: {
    recipeSearchApiGithub: "https://github.com/johanjaners/recipe-search-api",
    recipeSearchApiLive: "https://recipe-search-api-a8cwexa9fag3fyg2.westeurope-01.azurewebsites.net/swagger",
    recipeSearchApiImage: "/recipe-search-api.png",
    note2QuizAiGithub: "https://github.com/johanjaners/Note2QuizAI",
    note2QuizAiLive: "https://main.d2tidw0fafhzdw.amplifyapp.com",
    note2QuizAiImage: "/Note2QuizAI.jpg",
    pulseCareGithub: "https://github.com/johanjaners/PulseCare-backend",
    pulseCareLive: "https://pulsecare.online/",
    pulseCareImage: "/pulsecare.png",
    kanbanBoardGithub: "https://github.com/johanjaners/kanban-board",
    kanbanBoardLive: "https://brave-cliff-0698b8403.3.azurestaticapps.net/",
    kanbanBoardImage: "/kanban-board.png",
  },
} as const;

// --- Components ---

const Section = ({ id, title, children, className = "" }: { id: string; title?: string; children: ReactNode; className?: string }) => (
  <section id={id} className={`py-24 px-6 max-w-5xl mx-auto ${className}`}>
    {title && (
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        {title}
      </motion.h2>
    )}
    {children}
  </section>
);

const ProjectCard = ({ 
  name, 
  image,
  summary, 
  whatIBuilt, 
  tech, 
  github, 
  live 
}: { 
  name: string; 
  image: string;
  summary: string; 
  whatIBuilt: string; 
  tech: string[]; 
  github: string; 
  live: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group overflow-hidden rounded-2xl border border-border bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
  >
    <a
      href={live}
      target="_blank"
      rel="noopener noreferrer"
      className="project-thumb-wrap block"
      aria-label={`Open live site for ${name}`}
    >
      <img
        src={image}
        alt={`${name} project preview`}
        className="project-thumb"
        loading="lazy"
      />
    </a>

    <div className="p-6 md:p-7">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <div className="flex gap-3">
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
            <FaGithub size={20} />
          </a>
          <a href={live} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
      <p className="text-muted text-sm mb-6 leading-relaxed">{summary}</p>
      
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">What I Built</h4>
        <p className="text-sm text-foreground/80 leading-relaxed">{whatIBuilt}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const TechGroup = ({ title, icon: Icon, items }: { title: string; icon: any; items: string[] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl border border-border bg-white/[0.02]"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-accent/10 text-accent">
        <Icon size={20} />
      </div>
      <h3 className="font-medium text-foreground">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="tech-tag">{item}</span>
      ))}
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen selection:bg-accent/30 selection:text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-sm font-bold tracking-tighter hover:opacity-80 transition-opacity">
            JJ<span className="text-accent">.</span>
          </a>

          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">{link.name}</a>
            ))}
            <a href={LINKS.cv} download className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity">
              <FileText size={14} />
              CV
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-b border-border bg-background overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={closeMenu}
                    className="text-lg font-medium text-muted hover:text-accent transition-colors py-2"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href={LINKS.cv} 
                  download
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-foreground text-background font-semibold mt-4"
                >
                  <FileText size={18} />
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center px-6 max-w-5xl mx-auto py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Johan Janérs
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-accent mb-8">
              Backend & .NET Developer with Applied AI Experience
            </h2>
            <p className="text-lg md:text-xl text-muted max-w-2xl mb-8 leading-relaxed">
              I build structured backend systems and AI‑powered web applications using C#, ASP.NET Core, SQL, Azure OpenAI, and modern cloud services.
            </p>
            
            <div className="flex items-center gap-3 text-sm text-muted mb-12">
              <MapPin size={16} className="text-accent" />
              <span>Based in Stockholm. Open to opportunities in Stockholm and Gothenburg.</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="#projects" 
                className="px-8 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-all flex items-center gap-2 group"
              >
                View Projects
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={LINKS.cv} 
                download
                className="px-8 py-3 rounded-full border border-border hover:bg-white/5 transition-all font-semibold flex items-center gap-2"
              >
                <FileText size={18} />
                Download CV
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a href={LINKS.social.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
                <FaGithub size={24} />
              </a>
              <a href={LINKS.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <Section id="about" title="About">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-muted leading-relaxed">
              <p>
                I recently completed SALT’s .NET program and focus primarily on backend development with C# and ASP.NET Core.
              </p>
              <p>
                I build structured APIs, work with relational data and SQL, and design maintainable systems with clear architecture. I also have experience building fullstack applications with React and TypeScript.
              </p>
              <p>
                My background in engineering gives me a practical, systems-oriented approach to development.
              </p>
            </div>
            <div className="hidden md:block">
               {/* Decorative element or secondary info */}
               <div className="h-full border-l border-border pl-12 flex flex-col justify-center">
                  <div className="text-xs uppercase tracking-widest text-accent font-bold mb-4">Philosophy</div>
                  <p className="text-xl font-medium text-foreground/80 italic">
                    "Create maintainable systems with clear architecture."
                  </p>
               </div>
            </div>
          </div>
        </Section>

        {/* Tech Stack Section */}
        <Section id="tech" title="Tech Stack">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TechGroup 
              title="Backend" 
              icon={Database} 
              items={[
                "C#", ".NET", "ASP.NET Core", "Web API", 
                "Entity Framework Core", "SQL Server", "PostgreSQL", 
                "JWT Authentication", "REST API Design", "Kafka", "Azure OpenAI"
              ]} 
            />
            <TechGroup 
              title="Frontend" 
              icon={Layout} 
              items={[
                "React", "TypeScript", "JavaScript", 
                "HTML", "CSS", "Tailwind", "Vite"
              ]} 
            />
            <TechGroup 
              title="Tools / Cloud" 
              icon={Cloud} 
              items={[
                "Azure (App Service, Blob Storage, OpenAI, Vision)",
                "AWS (Amplify, Elastic Beanstalk, CloudFront)",
                "Git", "GitHub", "Azure DevOps",
                "CI/CD with GitHub Actions", "Docker"
              ]} 
            />
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects">
          <div className="grid grid-cols-1 gap-8">
            <ProjectCard 
              name="Recipe Search API"
              image={LINKS.projects.recipeSearchApiImage}
              summary="AI-powered recipe search API with multilingual query understanding and deterministic ranking."
              whatIBuilt="Designed and implemented a backend-focused ASP.NET Core Web API integrating Azure OpenAI for natural language interpretation. Built a fast in-memory search engine with deterministic scoring, embeddings, and multilingual support. Created clean architecture, domain-driven structure, and comprehensive documentation. Deployed the API on Azure App Service with Blob Storage for data hosting."
              tech={["ASP.NET Core", "Azure OpenAI", "Embeddings", "C#", "In-memory search", "Clean Architecture", "Azure (App Service, Blob Storage)"]}
              github={LINKS.projects.recipeSearchApiGithub}
              live={LINKS.projects.recipeSearchApiLive}
            />
            <ProjectCard 
              name="Note2QuizAI"
              image={LINKS.projects.note2QuizAiImage}
              summary="AI powered quiz generator that creates questions from uploaded notes."
              whatIBuilt = "Designed and implemented a full-stack application with ASP.NET Core and React, integrating Azure AI Vision and Azure OpenAI for quiz generation. Built backend services for quiz creation, submission, and scoring using a structured API architecture. Deployed the application to AWS using Amplify, Elastic Beanstalk, and CloudFront."
              tech={["ASP.NET Core", "React", "Azure (Vision OCR, OpenAI)", "AWS (Amplify, Elastic Beanstalk, Cloudfront)"]}
              github={LINKS.projects.note2QuizAiGithub}
              live={LINKS.projects.note2QuizAiLive}
            />
            <ProjectCard 
              name="PulseCare"
              image={LINKS.projects.pulseCareImage}
              summary="Team built healthcare platform with appointment booking and authentication."
              whatIBuilt="Contributed to a multi developer project, focusing on appointment related functionality, API design, CRUD operations, and JWT based authentication. Worked across backend and frontend integration in a structured team environment."
              tech={["ASP.NET Core", "React", "SQL Server", "Docker", "JWT"]}
              github={LINKS.projects.pulseCareGithub}
              live={LINKS.projects.pulseCareLive}
            />
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact">
          <div className="max-w-2xl">
            <p className="text-xl text-muted mb-12 leading-relaxed">
              Open to .NET, backend, and fullstack opportunities. Feel free to reach out.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href={LINKS.social.email} 
                className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Email</div>
                  <div className="font-medium">johanjaners@gmail.com</div>
                </div>
              </a>
              
              <a 
                href={LINKS.social.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                  <FaLinkedinIn size={24} />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider font-bold mb-1">LinkedIn</div>
                  <div className="font-medium">Johan Janérs</div>
                </div>
              </a>

              <a 
                href={LINKS.social.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                  <FaGithub size={24} />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider font-bold mb-1">GitHub</div>
                  <div className="font-medium">johanjaners</div>
                </div>
              </a>

              <a 
                href={LINKS.cv} 
                download
                className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Resume</div>
                  <div className="font-medium">Download CV</div>
                </div>
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted">
            © {new Date().getFullYear()} Johan Janérs
          </div>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest font-bold">About</a>
            <a href="#tech" className="text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest font-bold">Stack</a>
            <a href="#projects" className="text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest font-bold">Projects</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
