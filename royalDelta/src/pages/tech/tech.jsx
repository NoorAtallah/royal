import React, { useEffect, useRef, useState } from 'react';
import { 
  Code,
  Laptop,
  Shield,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Server,
  Cloud,
  Layers,
  Database,
  Lock,
  Wifi,
  Activity,
  MonitorSmartphone,
  ExternalLink
} from 'lucide-react';
import img from '../../assets/2.png'
const TechnologySolutions = () => {
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

  // Particle animation setup
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
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.growing = true;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.growing) {
          this.size += 0.02;
          if (this.size > 4) this.growing = false;
        } else {
          this.size -= 0.02;
          if (this.size < 1) this.growing = true;
        }

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
      particles = Array(30).fill().map(() => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(215, 190, 104, ${0.05 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2 - 20;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
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
    { 
      icon: Code,
      value: "Custom",
      label: "Software Development",
      description: "Tailored solutions for your needs",
      highlights: [
        "Customized solutions",
        "Modern technologies",
        "Scalable architecture",
        "Agile development"
      ]
    },
    { 
      icon: Shield,
      value: "Secure",
      label: "IT Consulting",
      description: "Expert guidance and support",
      highlights: [
        "Security best practices",
        "Industry expertise",
        "Strategic planning",
        "Technology roadmap"
      ]
    },
    { 
      icon: Cpu,
      value: "Smart",
      label: "Digital Transformation",
      description: "Innovative tech solutions",
      highlights: [
        "Process automation",
        "Digital integration",
        "Data analytics",
        "Cloud solutions"
      ]
    }
  ];

  const features = [
    {
      title: "Expert Analysis",
      description: "In-depth evaluation of your business processes"
    },
    {
      title: "Custom Solutions",
      description: "Tailored technology implementations"
    },
    {
      title: "Ongoing Support",
      description: "Continuous technical assistance and maintenance"
    },
    {
      title: "Innovation Focus",
      description: "Cutting-edge technology integration"
    }
  ];

  // Additional offerings from PDF
  const additionalServices = [
    {
      icon: Database,
      title: "Data Analytics",
      description: "Turn your data into actionable insights that drive business growth and informed decision-making."
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Protect your business with comprehensive security solutions from threat detection to risk management."
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Optimize performance with tailored cloud solutions for infrastructure, migration, and security."
    },
    {
      icon: Wifi,
      title: "Networking Solutions",
      description: "Build robust network infrastructure with expert design and configuration services."
    },
    {
      icon: Lock,
      title: "Security Systems",
      description: "Comprehensive protection with access control, alarm systems, and surveillance technology."
    },
    {
      icon: MonitorSmartphone,
      title: "Smart Solutions",
      description: "Integrate cutting-edge IoT and automation technologies for enhanced efficiency and convenience."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gray-900 py-20 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Code Lake Logo and Introduction */}
      

        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#D7BE68]/10 text-[#D7BE68] text-sm mb-4">
              Technology Solutions
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">
              Technology <span className="text-[#D7BE68]">Solutions</span>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg mb-20 text-gray-400">
              At Code Lake Enterprise, we are your trusted partner for comprehensive business and technology solutions. 
              We empower organizations to harness the power of technology and achieve their strategic objectives.
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="group relative rounded-2xl p-8 h-full transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30">
                <div className="absolute -top-4 left-8 p-4 bg-[#D7BE68] rounded-xl shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                <div className="mt-8 space-y-4">
                  <div className="text-3xl font-bold text-gray-200 mb-2">{service.value}</div>
                  <div className="text-lg font-semibold text-gray-200 mb-1">{service.label}</div>
                  <p className="text-gray-400">{service.description}</p>

                  <div className="space-y-2 transition-all duration-300 opacity-100 translate-y-0">
                    {service.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D7BE68]" />
                        <span className="text-gray-400 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 left-8 right-8 h-0.5 bg-gradient-to-r from-[#D7BE68]/0 via-[#D7BE68] to-[#D7BE68]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex flex-col items-center justify-center mb-12">
            <div className=" p-6 rounded-xl border border-[#D7BE68]/20 mb-8 flex items-center justify-center">
              <div className="mr-4">
                <img 
                  src={img}
                  alt="Code Lake Enterprise Logo" 
                  className="h-16"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">CODE LAKE</h3>
                <p className="text-[#D7BE68]">ENTERPRISE</p>
              </div>
            </div>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-gray-300 mb-6">
                At Code Lake Enterprise, we are dedicated to empowering your business with professional services. 
                With 24/7 support, our team of experts has successfully completed over 100 projects, providing 
                customized solutions tailored to meet your specific needs with a 95% satisfaction rate.
              </p>
              <a href="https://www.codelakeenterprise.com/" className="inline-flex items-center px-6 py-3 bg-[#D7BE68] text-black font-medium rounded-lg hover:bg-[#D7BE68]/90 transition-colors">
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <h2 className="text-4xl font-bold text-white mb-6">Our Expertise</h2>
              <div className="space-y-6 text-gray-400">
                <p className="text-lg">
                  Our team of experienced professionals understands the unique challenges businesses face in today's 
                  fast-paced and competitive market. We provide tailored consulting services to drive growth and 
                  maximize efficiency.
                </p>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D7BE68]" />
                      <span className="font-medium text-gray-200">{feature.title}</span>
                    </div>
                  ))}
                </div>
                <a href='https://www.codelakeenterprise.com/'>
                <button className="inline-flex items-center gap-2 text-[#D7BE68] hover:text-white transition-colors">
                  <span>Learn More About Our Solutions</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                </a>
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-4 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#D7BE68]/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Services Section from PDF */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Comprehensive <span className="text-[#D7BE68]">Solutions</span>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-400">
              Our diverse range of services covers all aspects of technology needs for modern businesses,
              helping you stay ahead in today's dynamic digital landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group h-full rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-[#D7BE68]/10 mr-4">
                      <service.icon className="w-6 h-6 text-[#D7BE68]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{service.title}</h3>
                  </div>
                  <p className="text-gray-400">{service.description}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <a 
                      href="https://www.codelakeenterprise.com/" 
                      className="inline-flex items-center text-sm text-[#D7BE68] hover:text-white transition-colors"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySolutions;