import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_vfbnlrj",
        "template_gi30z2b",
        {
          from_name: form.name,
          to_name: "Aslam Khan",
          from_email: form.email,
          to_email: "aknankpuria@gmail.com",
          message: form.message,
        },
        "MHx6CORn4meS1yuVc",
      );

      setLoading(false);
      alert("Your message has been sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-form-container",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-container",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-social-links",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-social-links",
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="c-space my-20" id="contact" ref={sectionRef}>
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="/assets/terminal.png"
          alt="terminal background"
          className="absolute inset-0 min-h-screen"
        />

        <div className="contact-container contact-form-container">
          {/* Updated tagline from portfolio.md spec */}
          <p className="text-label-alt contact-heading mb-3">Get In Touch</p>
          <h3 className="head-text contact-heading">Let&apos;s build something real.</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you&apos;re looking to build a new product, scale your
            infrastructure, or bring a Web3/AI project to life — I&apos;m here
            to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Hi, I'm interested in..."
              />
            </label>

            <button className="field-btn group" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </form>

          {/* Social Links — from portfolio.md spec */}
          <div className="contact-social-links flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/5">
            <a
              href="mailto:aknankpuria@gmail.com"
              className="group flex items-center gap-2 text-white-500 hover:text-[#00E5CC] transition-colors duration-300"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="text-sm font-mono">Email</span>
            </a>
            <span className="text-white/10">|</span>
            <a
              href="https://github.com/aknankpuria"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white-500 hover:text-[#00E5CC] transition-colors duration-300"
              aria-label="GitHub"
            >
              <img src="/assets/github.svg" alt="github" className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-mono">GitHub</span>
            </a>
            <span className="text-white/10">|</span>
            <a
              href="https://linkedin.com/in/aslam-khan-88a353263"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white-500 hover:text-[#00E5CC] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <img src="/assets/linkedin.svg" alt="linkedin" className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-mono">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
