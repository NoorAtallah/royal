import React, { useEffect, useRef, useState } from 'react';
import { 
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Globe2
} from 'lucide-react';

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const animationFrameIdRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });

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

  // Optimized flowing particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Reduce number of particles
    const PARTICLE_COUNT = 30; // Reduced from 50
    const CONNECTION_DISTANCE = 100; // Reduced from 120
    const FRAME_THROTTLE = 2; // Only update every 2nd frame
    let frameCount = 0;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5; // Slightly smaller particles
        this.density = Math.random() * 10 + 5; // Reduced density range
        this.opacity = Math.random() * 0.2 + 0.1; // Slightly reduced opacity
      }

      update() {
        // Only apply mouse interaction when the mouse is actually moving
        const { x: mouseX, y: mouseY } = mousePositionRef.current;
        
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Skip complex calculations for particles far from the mouse
        if (distance < 100) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = 100;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Simplified return-to-base logic
          if (this.x !== this.baseX) {
            this.x += (this.baseX - this.x) / 20;
          }
          if (this.y !== this.baseY) {
            this.y += (this.baseY - this.y) / 20;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 190, 104, ${this.opacity})`;
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Regenerate particles on resize to avoid visual artifacts
      particlesRef.current = Array(PARTICLE_COUNT).fill().map(() => new Particle());
    };

    const initCanvas = () => {
      resizeCanvas();
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array(PARTICLE_COUNT).fill().map(() => new Particle());
      }
    };

    const animate = () => {
      frameCount++;
      
      // Throttle updates to every other frame
      if (frameCount % FRAME_THROTTLE === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        particlesRef.current.forEach(particle => {
          particle.update();
          particle.draw();
        });

        // Use fewer connections by only connecting nearby particles
        const particles = particlesRef.current;
        const sinValue = Math.sin(Date.now() / 2000) * 15; // Slower flow effect

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          
          // Only check a subset of other particles for connections
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = dx * dx + dy * dy; // Skip square root for performance
            
            if (distance < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
              const opacity = (CONNECTION_DISTANCE * CONNECTION_DISTANCE - distance) / (CONNECTION_DISTANCE * CONNECTION_DISTANCE * 10);
              
              ctx.beginPath();
              ctx.strokeStyle = `rgba(215, 190, 104, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y);
              
              // Simplify the curve calculation
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              
              ctx.quadraticCurveTo(midX + sinValue, midY - sinValue, p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Throttled mouse move handler
    let lastMoveTime = 0;
    const handleMouseMove = (event) => {
      const now = Date.now();
      if (now - lastMoveTime > 50) { // Only update every 50ms
        mousePositionRef.current = { x: event.clientX, y: event.clientY };
        lastMoveTime = now;
      }
    };

    initCanvas();
    animate();

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      author: "Sarah Chen",
      role: "CEO, TechVision Enterprises",
      content: "Royal Delta Group transformed our business operations with their innovative technology solutions. Their expertise and dedication to excellence are unmatched.",
      region: "Middle East",
      rating: 5
    },
    {
      author: "Marcus Reynolds",
      role: "Director of Operations, Global Logistics Co",
      content: "The logistics solutions provided by Royal Delta Group streamlined our supply chain and significantly improved our efficiency. Exceptional service!",
      region: "North America",
      rating: 5
    },
    {
      author: "Isabella Santos",
      role: "Head of Tourism, Sunset Resorts",
      content: "Working with Royal Delta Group has been transformative for our tourism business. Their attention to detail and customer-focused approach sets them apart.",
      region: "Australia",
      rating: 5
    }
  ];

  const regions = [
    {
      name: "Middle East",
      projects: 45,
      clients: 120,
      satisfaction: 98
    },
    {
      name: "North America",
      projects: 62,
      clients: 150,
      satisfaction: 96
    },
    {
      name: "Europe",
      projects: 38,
      clients: 95,
      satisfaction: 97
    },
    {
      name: "Australia",
      projects: 29,
      clients: 80,
      satisfaction: 95
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
              Client Success
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">
              Global <span className="text-[#D7BE68]">Impact</span>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg mb-20 text-gray-400">
              Delivering excellence across continents, transforming businesses worldwide
            </p>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-20">
          <div className="relative rounded-2xl p-8 max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="absolute -top-4 left-8 p-4 bg-[#D7BE68] rounded-xl shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="mt-8">
              <div className="relative overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === activeSlide 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-full absolute top-0'
                    }`}
                  >
                    <p className="text-gray-300 text-lg italic mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.author}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#D7BE68] text-[#D7BE68]" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'bg-[#D7BE68] w-8' : 'bg-white/20'
                  }`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Global Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, index) => (
            <div
              key={region.name}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredRegion(index)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <div className="group relative rounded-2xl p-6 transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30">
                <div className="absolute -top-4 left-6 p-3 bg-[#D7BE68] rounded-xl shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                  <Globe2 className="w-5 h-5 text-white" />
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-[#D7BE68]" />
                    <h3 className="text-xl font-semibold text-gray-200">{region.name}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Projects</span>
                      <span className="text-xl font-bold text-white">{region.projects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Clients</span>
                      <span className="text-xl font-bold text-white">{region.clients}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Satisfaction</span>
                      <span className="text-xl font-bold text-[#D7BE68]">{region.satisfaction}%</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6 h-0.5 bg-gradient-to-r from-[#D7BE68]/0 via-[#D7BE68] to-[#D7BE68]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;