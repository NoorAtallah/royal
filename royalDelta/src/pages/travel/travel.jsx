import React, { useEffect, useRef, useState } from 'react';
import { 
  Map,
  Plane,
  Hotel,
  Compass,
  CheckCircle2,
  ArrowRight,
  Globe,
  Landmark,
  ExternalLink
} from 'lucide-react';
import img from '../../assets/3.png'

const TravelTourism = () => {
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
      icon: Globe,
      value: "Global",
      label: "Travel Packages",
      description: "Comprehensive travel planning",
      highlights: [
        "Customized itineraries",
        "Group packages",
        "Special events",
        "Seasonal deals"
      ]
    },
    { 
      icon: Hotel,
      value: "Luxury",
      label: "Accommodations",
      description: "Hand-picked destinations",
      highlights: [
        "Premium hotels",
        "Private villas",
        "Boutique resorts",
        "Exclusive properties"
      ]
    },
    { 
      icon: Compass,
      value: "Expert",
      label: "Tour Guidance",
      description: "Personalized experiences",
      highlights: [
        "Local expertise",
        "Cultural insights",
        "Hidden gems",
        "Flexible scheduling"
      ]
    }
  ];

  const experiences = [
    {
      title: "Beach Getaways",
      description: "Relaxing coastal escapes and seaside adventures"
    },
    {
      title: "Cultural Tours",
      description: "Immersive historical and cultural experiences"
    },
    {
      title: "Adventure Travel",
      description: "Thrilling expeditions and outdoor activities"
    },
    {
      title: "Luxury Escapes",
      description: "Premium travel experiences and accommodations"
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
              Travel & Tourism
            </span>
            <h2 className="text-5xl font-bold text-white mb-4">
              Travel & <span className="text-[#D7BE68]">Tourism</span>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg mb-20 text-gray-400">
              At Riverside, we understand that travel is not just about reaching a destination; 
              it's about creating unforgettable experiences and memories that last a lifetime.
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

        {/* Riverside Logo and Introduction */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="p-6 rounded-xl border border-[#D7BE68]/20 mb-8 flex items-center justify-center">
              <div className="mr-4">
                <img 
                  src={img}
                  alt="Riverside Travel & Tours Logo" 
                  className="h-16"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">RIVERSIDE</h3>
                <p className="text-[#D7BE68]">TRAVEL & TOURS</p>
              </div>
            </div>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-gray-300 mb-6">
                At Riverside, we are dedicated to crafting exceptional travel experiences that go beyond the ordinary. 
                With our expert team of travel consultants and local guides, we have successfully organized over 500 trips, 
                providing personalized itineraries and unforgettable journeys with a 98% customer satisfaction rate.
              </p>
              <a href="https://www.riversidejourneys.com/" className="inline-flex items-center px-6 py-3 bg-[#D7BE68] text-black font-medium rounded-lg hover:bg-[#D7BE68]/90 transition-colors">
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Experiences Section */}
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <h2 className="text-4xl font-bold text-white mb-6">Your Journey Begins Here</h2>
              <div className="space-y-6 text-gray-400">
                <p className="text-lg">
                  Whether you're seeking a relaxing beach getaway, an adventurous trek through mountains, 
                  a cultural exploration of historical sites, or a luxurious escape, we have the expertise 
                  and resources to craft your dream itinerary.
                </p>
                <div className="space-y-4">
                  {[
                    'Personalized Itineraries',
                    'Expert Local Guides',
                    'Premium Accommodations',
                    'Seamless Travel Planning'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D7BE68]" />
                      <span className="font-medium text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
                <a href="https://www.riversidejourneys.com/">
                  <button className="inline-flex items-center gap-2 text-[#D7BE68] hover:text-white transition-colors">
                    <span>Explore Our Destinations</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </a>
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-4 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              {experiences.map((experience, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#D7BE68]/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">{experience.title}</h3>
                  <p className="text-gray-400 text-sm">{experience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTourism;