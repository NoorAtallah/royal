import React, { useEffect, useRef, useState } from 'react';
import { 
  Target, 
  Users, 
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const AboutUs = () => {
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

  // Enhanced particle animation
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
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Larger particles
        this.speedX = Math.random() * 1 - 0.5; // Faster movement
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.7 + 0.3; // Higher opacity
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
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
      particles = Array(100).fill().map(() => new Particle()); // More particles
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connecting lines between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // Increased connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(215, 190, 104, ${0.15 * (1 - distance / 150)})`; // More visible lines
            ctx.lineWidth = 0.8; // Thicker lines
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
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

  const stats = [
    { 
      icon: Target,
      value: "24/7",
      label: "Business Excellence",
      description: "Unwavering support and expertise to keep your ventures thriving around the clock."
    },
    { 
      icon: Users,
      value: "100+",
      label: "Successful Enterprises",
      description: "Expanding and managing diverse industries with a proven track record of success."
    },
    { 
      icon: Award,
      value: "95%",
      label: "Client Satisfaction",
      description: "Exceeding expectations through innovation, strategic leadership."
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge solutions and creative approaches"
    },
    {
      title: "Excellence",
      description: "Delivering exceptional quality in every project and service"
    },
    {
      title: "Integrity",
      description: "Building trust through transparent and ethical business practices"
    },
    {
      title: "Partnership",
      description: "Creating lasting relationships with clients and stakeholders"
    }
  ];

  return (
    <main className="bg-gray-900 overflow-hidden w-full">
      {/* Hero Section */}
      <section ref={sectionRef} className="relative min-h-screen py-16 px-4 w-full">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ pointerEvents: 'none' }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 mt-4">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="inline-block px-6 py-2 rounded-full bg-[#D7BE68]/10 text-[#D7BE68] text-sm mb-6 mx-auto">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-6 text-white">
              About <span className="text-[#D7BE68]">Royal Delta Group</span>
            </h1>
            <p className="text-gray-400 text-center max-w-3xl mx-auto text-base md:text-xl mb-12">
              At Royal Delta Group, we are dedicated to empowering businesses to succeed. We believe that every business 
              has the potential to achieve great things.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="rounded-2xl p-4 md:p-8 bg-gray-800/80 border border-gray-700 transition-all duration-300 hover:border-[#D7BE68]">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                    <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-[#D7BE68]" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-base md:text-lg font-semibold text-white mb-1">{stat.label}</div>
                  <div className="text-sm md:text-base text-gray-400">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 md:py-20 bg-gray-800/50 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <div className="space-y-4 md:space-y-6 text-gray-400">
                <p className="text-base md:text-lg">
                  Our mission is to provide comprehensive business development services that help you achieve your goals. 
                  With over 100 successful projects and a 95% satisfaction rate, we are committed to delivering excellence.
                </p>
                <div className="space-y-3 md:space-y-4">
                  {['Tailored Solutions', 'Expert Guidance', 'Innovative Approaches'].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <CheckCircle2 className="w-5 h-5 text-[#D7BE68] flex-shrink-0" />
                      <span className="group-hover:text-[#D7BE68] transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 text-[#D7BE68] hover:text-white transition-colors group">
                  <span>Learn More About Our Approach</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="rounded-2xl p-4 md:p-6 bg-gray-800/80 border border-gray-700 transition-all duration-300 hover:border-[#D7BE68]"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative py-16 md:py-20 bg-gray-900 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
              Making an <span className="text-[#D7BE68]">Impact</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              At Royal Delta Group, we understand that every business is unique. That's why our services are 
              tailored to meet your specific needs and goals. Whether you need help with market research, strategic 
              planning, or financial management, we will work with you to develop a customized solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Our Expertise",
                items: [
                  "Business Development",
                  "Strategic Planning",
                  "Market Analysis",
                  "Financial Management"
                ]
              },
              {
                title: "Our Commitment",
                items: [
                  "Client Success",
                  "Continuous Innovation",
                  "Professional Excellence",
                  "Long-term Partnership"
                ]
              }
            ].map((section, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="rounded-2xl p-6 md:p-8 bg-gray-800/80 border border-gray-700 transition-all duration-300 hover:border-[#D7BE68]">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">
                    {section.title}
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                        <div className="w-2 h-2 rounded-full bg-[#D7BE68] flex-shrink-0" />
                        <span className="text-gray-400 group-hover:text-white transition-colors duration-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;