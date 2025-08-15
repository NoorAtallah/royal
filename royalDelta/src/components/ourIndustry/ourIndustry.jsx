import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, 
  Plane, 
  Building2, 
  ShoppingBag, 
  Utensils, 
  Truck 
} from 'lucide-react';

const IndustriesSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

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
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
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
      particles = Array(50).fill().map(() => new Particle());
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

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(215, 190, 104, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
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

  const industries = [
    {
      icon: Server,
      title: "Technology Solutions",
      description: "Software development and IT consulting services for digital transformation"
    },
    {
      icon: Plane,
      title: "Travel & Tourism",
      description: "Comprehensive travel packages and accommodation services"
    },
    {
      icon: Utensils,
      title: "Food Services",
      description: "Professional catering and restaurant management"
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      description: "Modern retail solutions for physical and online stores"
    },
   
    {
      icon: Truck,
      title: "Logistics Services",
      description: "Efficient transportation and supply chain solutions"
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Property management and real estate consulting services"
    },
   
   
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
              Our Expertise
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">
              Our <span className="text-[#D7BE68]">Industries</span>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg mb-20 text-gray-400">
              Explore our diverse range of services across multiple industries, 
              delivering excellence and innovation in every sector we serve.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div 
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative rounded-2xl p-8 h-full transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30"
              >
                <div 
                  className="text-[#D7BE68] mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <industry.icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-200">
                  {industry.title}
                </h3>
                
                <p className="text-gray-400">
                  {industry.description}
                </p>

                <div 
                  className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ 
                    background: 'radial-gradient(circle at center, rgba(215, 190, 104, 0.1) 0%, rgba(215, 190, 104, 0) 70%)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;