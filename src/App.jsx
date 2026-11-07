
import "./App.css";
import Chatbot from "./Chatbot";
import VisitorCounter from "./VisitorCounter";

function App() {
  return (
    <div className="portfolio">
      <nav className="navbar">
        <a href="#home" className="logo">CT<span>.</span></a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="#contact" className="nav-button">Let's Talk ↗</a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-top">
          <span className="availability">
            <span className="green-dot"></span>
            OPEN TO OPPORTUNITIES
          </span>
          <span className="location">INDIA · 2026</span>
        </div>

        <div className="photo-container">
          <div className="photo-glow"></div>
          <img
            src="/profile.jpeg"
            alt="Charan Teja"
            className="profile-photo"
          />
        </div>

        <p className="intro-text">HELLO, I'M</p>

        <h1>
          Charan Teja<span>.</span>
        </h1>

        <h2>
          Full-Stack Developer <span>|</span> AI/ML Enthusiast
        </h2>

        <p className="hero-description">
          Student at KL University, pursuing B.Tech in Computer Science
          and Information Technology (Honors), 2024–2028.
          Passionate about building modern web applications and
          exploring intelligent technologies.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="primary-button">
            Explore My Work ↗
          </a>
          <a href="#contact" className="secondary-button">
            Contact Me
          </a>
        </div>

        <div className="scroll-text">
          SCROLL TO EXPLORE <span>↓</span>
        </div>
      </section>

      <section className="content-section" id="about">
        <p className="section-label">01 / ABOUT ME</p>
        <h2>A little about me.</h2>
        <p>
          I'm Madeti Charan Teja, a B.Tech CSIT (H) student at
          KL University (2024–2028). I'm passionate about full-stack
          development, Java, React and web technologies. I enjoy
          learning new tools, building practical applications and
          exploring Artificial Intelligence and Machine Learning.
        </p>
      </section>
      

      <section className="content-section" id="skills">
        <p className="section-label">02 / MY SKILLS</p>
        <h2>Technologies I work with.</h2>

        <div className="skill-list">
          {[
            "Full-Stack Development",
            "Java",
            "React",
            "Web Development",
            "AI/ML",
            "JavaScript",
            "HTML",
            "CSS",
            "MySQL",
            "Spring Boot",
            "Git & GitHub",
            "C"
          ].map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="content-section" id="projects">
        <p className="section-label">03 / SELECTED WORK</p>
        <h2>Projects I've worked on.</h2>

        <div className="project-grid">
          <div className="project-card">
            <span>01 — WEB DEVELOPMENT</span>
            <h3>Handloom Fashion Platform</h3>
            <p>
              A platform designed to promote handloom fashion products
              and connect them with global buyers.
            </p>
          </div>

          <div className="project-card">
            <span>02 — BACKEND DEVELOPMENT</span>
            <h3>Multi-Restaurant Food Ordering</h3>
            <p>
              A food ordering and delivery system focused on managing
              restaurants, orders and delivery workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" id="contact">
        <p className="section-label">04 / CONTACT</p>
        <h2>Let's build something together.</h2>
        <p>Have an opportunity or project in mind? Let's connect.</p>

        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/madeti-charan-teja"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://github.com/Charanteja-madeti"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button"
          >
            GitHub ↗
          </a>
          <a
  href="mailto:your-madeticharanteja19@gmail.com?subject=Portfolio%20Contact"
  className="contact-button"
>
  Gmail✉
</a>
        </div>
      </section>

      <footer>
        <p>© 2026 Charan Teja. Built with React.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

      <Chatbot />
      <VisitorCounter />
    </div>
  );
}

export default App;
