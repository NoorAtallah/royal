import React, { useEffect, useRef, useState, useMemo } from 'react';
import { BadgeCheck, Gem, Target, Trophy } from 'lucide-react';

const MissionStats = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    professional: 0,
    solutions: 0,
    projects: 0,
    satisfaction: 0
  });
  
  const animationTimerRef = useRef(null);

  // Define target values outside of state to avoid unnecessary rerenders
  const targetValues = useMemo(() => ({
    professional: 24,
    solutions: 6,
    projects: 100,
    satisfaction: 95
  }), []);

  // Intersection Observer setup with cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px' // Start loading earlier
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  // Optimized stats counter animation
  useEffect(() => {
    if (isVisible) {
      // Clear any existing timers on visibility change
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
      
      // Use RAF for smoother animations
      let startTime = null;
      const duration = 2000; // 2 seconds for the entire animation
      
      const animateStats = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smoother animation
        const easeOutQuad = t => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        setStats({
          professional: Math.round(easedProgress * targetValues.professional),
          solutions: Math.round(easedProgress * targetValues.solutions),
          projects: Math.round(easedProgress * targetValues.projects),
          satisfaction: Math.round(easedProgress * targetValues.satisfaction)
        });
        
        if (progress < 1) {
          animationTimerRef.current = requestAnimationFrame(animateStats);
        }
      };
      
      animationTimerRef.current = requestAnimationFrame(animateStats);
      
      return () => {
        if (animationTimerRef.current) {
          cancelAnimationFrame(animationTimerRef.current);
        }
      };
    }
  }, [isVisible, targetValues]);

  // Memoize stat items to prevent unnecessary recreations
  const statItems = useMemo(() => [
    {
      icon: BadgeCheck,
      value: stats.professional,
      label: "Business Support",
      suffix: "/7",
      description: "Ensuring seamless operations across all industries, anytime, anywhere."
    },
    {
      icon: Gem,
      value: stats.solutions,
      label: "Specialized Industries",
      suffix: "+",
      description: "Diverse business sectors, unified under one vision for growth and success."
    },
    {
      icon: Target,
      value: stats.projects,
      label: "Ventures & Investments",
      suffix: "+",
      description: "Diverse business sectors, unified under one vision for growth and success."
    },
    {
      icon: Trophy,
      value: stats.satisfaction,
      label: "Partner Satisfaction",
      suffix: "%",
      description: "Building strong, lasting relationships with businesses worldwide."
    }
  ], [stats]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gray-900"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32">
        <div className={`transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#D7BE68]/10 text-[#D7BE68] text-sm mb-4">
              Our Purpose
            </span>
            <h2 className="text-6xl font-bold text-white mb-6">
              Inspiring <span className="text-[#D7BE68]">Excellence</span>
            </h2>
            <p className="text-center max-w-2xl mx-auto text-lg mb-20 text-gray-400 leading-relaxed">
              Royal Delta Group empowers businesses with tailored growth solutions. From strategy to execution, we help you navigate success with expertise and innovation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div
              key={item.label}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                willChange: isVisible ? 'transform, opacity' : 'auto'
              }}
            >
              <div className="relative group">
                <div className="relative rounded-2xl p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D7BE68]/30 transition-all duration-300">
                  <div className="text-[#D7BE68] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <div className="flex items-baseline mb-2">
                      <span className="text-5xl font-bold text-white">
                        {item.value}
                      </span>
                      <span className="text-xl ml-1 text-[#D7BE68]">
                        {item.suffix}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-200 mb-2">
                      {item.label}
                    </h3>
                    
                    <p className="text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionStats;