import React, { useEffect, useRef, useState } from 'react';
import { 
  Truck,
  Container,
  Boxes,
  Timer,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Route
} from 'lucide-react';

const LogisticsServices = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // Removed activeFeature state since we want content to show always

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
      icon: Truck,
      value: "Transport",
      label: "Solutions",
      description: "Efficient delivery systems",
      highlights: [
        "Fleet management",
        "Route optimization",
        "Real-time tracking",
        "Delivery scheduling"
      ]
    },
    { 
      icon: Container,
      value: "Supply Chain",
      label: "Management",
      description: "End-to-end optimization",
      highlights: [
        "Inventory control",
        "Supplier management",
        "Process automation",
        "Cost optimization"
      ]
    },
    { 
      icon: Route,
      value: "Network",
      label: "Planning",
      description: "Strategic routing",
      highlights: [
        "Network design",
        "Distribution planning",
        "Location analysis",
        "Capacity planning"
      ]
    }
  ];

  const capabilities = [
    {
      title: "Fleet Management",
      description: "Comprehensive vehicle tracking and maintenance"
    },
    {
      title: "Warehouse Solutions",
      description: "Strategic storage and distribution"
    },
    {
      title: "Route Optimization",
      description: "Efficient delivery planning"
    },
    {
      title: "Supply Chain Analytics",
      description: "Data-driven logistics insights"
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
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#D7BE68]/10 text-[#D7BE68] text-sm mb-4">
              Logistics Services
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">
              Logistics <span className="text-[#D7BE68]">Services</span>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg mb-20 text-gray-400">
              At Royal Delta Group, we specialize in comprehensive logistics management solutions, 
              helping businesses optimize their supply chain and delivery operations.
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
              // Removed mouse enter and leave handlers
            >
              <div className="group relative rounded-2xl p-8 h-full transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30">
                <div className="absolute -top-4 left-8 p-4 bg-[#D7BE68] rounded-xl shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                <div className="mt-8 space-y-4">
                  <div className="text-3xl font-bold text-gray-200 mb-2">{service.value}</div>
                  <div className="text-lg font-semibold text-gray-200 mb-1">{service.label}</div>
                  <p className="text-gray-400">{service.description}</p>

                  {/* Modified to always show highlights */}
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

        {/* Capabilities Section */}
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <h2 className="text-4xl font-bold text-white mb-6">Supply Chain Excellence</h2>
              <div className="space-y-6 text-gray-400">
                <p className="text-lg">
                  Our team of highly skilled professionals is dedicated to simplifying the logistics 
                  process and equipping you with the knowledge and tools necessary for success. We provide 
                  expert guidance and personalized strategies to ensure seamless operations.
                </p>
                <div className="space-y-4">
                  {[
                    'Real-time Tracking',
                    'Cost Optimization',
                    'Performance Analytics',
                    'Sustainable Solutions'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D7BE68]" />
                      <span className="font-medium text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 text-[#D7BE68] hover:text-white transition-colors">
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-4 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              {capabilities.map((capability, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#D7BE68]/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">{capability.title}</h3>
                  <p className="text-gray-400 text-sm">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsServices;