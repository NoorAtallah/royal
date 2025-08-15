import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MdEmail,
  MdPhone, 
  MdLocationOn, 
  MdOutlineExitToApp,
  MdRestaurant
} from 'react-icons/md';
import { 
  FaLinkedin, 
  FaFacebook, 
  FaYoutube, 
  FaWhatsapp,
  FaServer,
  FaPlane,
  FaBuilding,
  FaShoppingBag,
  FaTruck
} from 'react-icons/fa';
import { FaMapMarker } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';
import { BsInstagram } from 'react-icons/bs';
import img from '../../assets/1.png'

const ContactFooterSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rising particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.amplitude = Math.random() * 30 + 20;
        this.offset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin((this.y * 0.02) + this.offset) * 0.5;

        if (this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 190, 104, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles = Array(40).fill().map(() => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connecting lines with wave effect
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(215, 190, 104, ${0.05 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            
            // Wave effect for connecting lines
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const wave = Math.sin(Date.now() * 0.001 + (p1.x + p1.y) * 0.01) * 15;
            
            ctx.quadraticCurveTo(midX + wave, midY, p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const services = [
    { icon: FaServer, name: "Technology Solutions", path: "/technology-solutions" },
    { icon: FaPlane, name: "Travel & Tourism", path: "/services/travel" },
    { icon: FaBuilding, name: "Real Estate ", path: "/services/real-estate" },
    { icon: FaShoppingBag, name: "Retail", path: "/services/retail" },
    { icon: MdRestaurant, name: "Food Services", path: "/services/food" },
    { icon: FaTruck, name: "Logistics Services", path: "/services/logistics" }
  ];

  const contactInfo = [
    { 
      icon: MdEmail, 
      title: "Email Us",
      info: "Info@RoyalDeltaGroup.com",
      description: "Available 24/7 for your inquiries",
      href: "mailto:Info@RoyalDeltaGroup.com"
    },

  
  ];

  const quickLinks = [
    {name: 'Code Lake Enterprise', path: 'https://www.codelakeenterprise.com/'},
    {name: 'Riverside Journeys', path: 'https://www.riversidejourneys.com/'}

  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/RDGHQ/#", label: "Facebook" }, 
    { icon: FaXTwitter, href: "https://x.com/RDG_HQ", label: "X (Twitter)" }, 
    { icon: BsInstagram, href: "https://www.instagram.com/rdg_hq/", label: "Instagram" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/rdghq", label: "LinkedIn" },
    { icon: SiTiktok, href: "https://www.tiktok.com/@rdg_hq", label: "TikTok" },
 
    { icon: FaYoutube, href: "https://www.youtube.com/@RDG_HQ", label: "YouTube" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gray-900 pt-20 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#D7BE68]/10 text-[#D7BE68] text-sm mb-4">
              Get In Touch
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">
              Let's <span className="text-[#D7BE68]">Connect</span>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg mb-20 text-gray-400">
              Ready to transform your business? Reach out to us and discover how Royal Delta Group can help you achieve your goals.
            </p>
          </div>
        </div>

        {/* Contact Cards Grid - Centered */}
        <div className="flex justify-center mb-20">
          <div className="max-w-md">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="group relative rounded-2xl p-8 transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30 text-center">
                  <div className="mx-auto w-16 h-16 mb-6 bg-[#D7BE68]/20 rounded-2xl flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-[#D7BE68]" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">{item.title}</h3>
                  <p className="text-[#D7BE68] font-medium mb-2">{item.info}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                  
                  <div className="mt-6">
                    <a 
                      href={item.href}
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-[#D7BE68] transition-colors"
                    >
                      <span>Contact Us</span>
                      <MdOutlineExitToApp className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-20">
          {socialLinks.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#D7BE68] hover:text-white transition-all duration-300"
            >
              <item.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3">
                <img 
                  src={img}
                  alt="Royal Delta Logo" 
                  className="w-10 h-10"
                />
                <span className="text-xl font-bold text-white">Royal Delta Group</span>
              </Link>
              <p className="text-gray-400">
                Empowering businesses with innovative solutions and exceptional service.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <div className="space-y-3">
                {quickLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className="block text-gray-400 hover:text-[#D7BE68] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
              <div className="grid grid-cols-2 gap-3">
                {services.map(service => (
                  <Link 
                    key={service.name} 
                    to={service.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#D7BE68] transition-colors"
                  >
                    <service.icon className="w-4 h-4" />
                    <span className="text-sm">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          Copyright © 2025 by Royal Delta Group Inc. Powered and secured by {" "}
            <a 
              href="https://www.codelakeenterprise.com/" 
              className="text-blue-500 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Code Lake Enterprise 
            </a>
            {" "}
            Technology Department
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContactFooterSection;