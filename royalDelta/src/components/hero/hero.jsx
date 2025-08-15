import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Plane, UtensilsCrossed, Building, Store, Truck } from 'lucide-react';

const AnimatedHeroWithSection = () => {
  const containerRef = useRef(null);
  const missionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if Three.js is already loaded
    if (window.THREE) {
      initThree();
      return;
    }

    // Load Three.js only once
    if (!document.getElementById('three-js-script')) {
      const script = document.createElement('script');
      script.id = 'three-js-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js';
      script.async = true;

      script.onload = () => {
        initThree();
      };

      document.body.appendChild(script);
      return () => {
        if (document.getElementById('three-js-script')) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  const initThree = () => {
    if (!containerRef.current || !window.THREE) return;

    // Create scene, camera, and renderer
    const scene = new window.THREE.Scene();
    
    // Use OrthographicCamera instead of PerspectiveCamera for better performance
    const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const frustumSize = 20;
    const camera = new window.THREE.OrthographicCamera(
      frustumSize * aspect / -2, 
      frustumSize * aspect / 2, 
      frustumSize / 2, 
      frustumSize / -2, 
      0.1, 
      1000
    );
    
    const renderer = new window.THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true,
      powerPreference: 'low-power' 
    });
    
    // Set size and pixel ratio
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(1); // Force 1x pixel ratio for maximum performance
    containerRef.current.appendChild(renderer.domElement);

    // Create a much simpler sphere with very low polygon count
    const radius = dimensions.width < 768 ? 6 : 8;
    const sphereGeometry = new window.THREE.SphereGeometry(radius, 16, 12); // Greatly reduced segments
    const sphereMaterial = new window.THREE.MeshBasicMaterial({
      color: 0xD7BE68,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const sphere = new window.THREE.Mesh(sphereGeometry, sphereMaterial);
    
    // Single sphere instead of nested spheres
    scene.add(sphere);
    camera.position.z = 15;

    // Simple rotation animation with fixed framerate
    let lastTime = 0;
    const targetFPS = 30; // Limit to 30 FPS
    const interval = 1000 / targetFPS;
    let frameId;

    const animate = (currentTime) => {
      frameId = requestAnimationFrame(animate);
      
      // Only render if enough time has passed (frame limiting)
      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;
      
      // Update last time accounting for the interval
      lastTime = currentTime - (deltaTime % interval);
      
      // Simple constant rotation
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.005;
      
      renderer.render(scene, camera);
    };

    // Start animation
    frameId = requestAnimationFrame(animate);

    // Efficient resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      // Update orthographic camera on resize
      const aspect = width / height;
      camera.left = frustumSize * aspect / -2;
      camera.right = frustumSize * aspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Use Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && frameId) {
            cancelAnimationFrame(frameId);
            frameId = null;
          } else if (entry.isIntersecting && !frameId) {
            frameId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  };

  // Services data
  const services = [
    {
      icon: Monitor,
      title: "Technology Solutions",
      description: "Software development and IT consulting",
      path: "/technology-solutions"
    },
    {
      icon: Plane,
      title: "Travel & Tourism",
      description: "Comprehensive travel packages",
      path: "/services/travel"
    },
    {
      icon: UtensilsCrossed,
      title: "Food Services",
      description: "Culinary excellence and catering",
      path: "/services/food"
    },
    {
      icon: Store,
      title: "Retail",
      description: "Physical and online retail solutions",
      path: "/services/retail"
    },
    {
      icon: Truck,
      title: "Logistics Services",
      description: "Supply chain optimization",
      path: "/services/logistics"
    },
    {
      icon: Building,
      title: "Real Estate",
      description: "Property management and consulting",
      path: "/services/real-estate"
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-900">
      <div 
        ref={containerRef}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,190,104,0.15),transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`transform transition-all duration-1000 w-full ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16 mt-8">
            <span className="inline-block px-4 sm:px-6 py-2 rounded-full bg-[#D7BE68]/10 text-[#D7BE68] text-sm">
            INSPIRING EXCELLENCE
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Royal Delta <span className="text-[#D7BE68]">Group</span>
            </h1>
            
            <p className="text-lg sm:text-xl tracking-wide text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
             Royal Delta Group: A powerhouse of industries, driving innovation and excellence across Technology, Travel, Real Estate, Retail, Food Services, and Logistics. Together, we build the future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Link 
                  to={service.path}
                  className="block relative group cursor-pointer"
                  role="link"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#D7BE68]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative rounded-2xl p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30 transition-all duration-300">
                    <div className="text-[#D7BE68] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-400">
                      {service.description}
                    </p>
                    
                    <div className="mt-4 text-[#D7BE68] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                      <span>Learn more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <div className="text-gray-400 space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center">
              <span className="hidden sm:inline text-[#D7BE68]">|</span>
              <a href="mailto:info@royaldeltagroup.com" className="hover:text-[#D7BE68] transition-colors duration-300">
                Info@RoyalDeltaGroup.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroWithSection;